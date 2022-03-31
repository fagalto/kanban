import express, { Request, Response, NextFunction, Router } from "express";
import { Connection } from "typeorm";

import { dbResource } from "../../config/allowedResources";

type resController = {
  dbResource: dbResource;
  restParams: restParam;
  response: Response;
  request: Request;
  router: Router;
  connection: Connection[];
};

type restParam = {
  resourceName: string; //only first resource will be identified
  paramId: string; //only first param will be identified
  originalPath: string; // for complicatedPaths in api
  subResourceName: string;
  subParamId: string;
  decomposedPath: string[];
};

const pathDecomposer = (path: string): restParam => {
  const decomposed = path.split("/").filter((n) => n);
  const restParam: restParam = {
    resourceName: decomposed.length > 2 ? decomposed[0] + "/" + decomposed[2] : decomposed[0],
    paramId: decomposed.length > 1 ? decomposed[1] : null,
    subResourceName: decomposed.length > 2 ? decomposed[2] : null,
    subParamId: decomposed.length > 3 ? decomposed[3] : null,
    originalPath: path,
    decomposedPath:decomposed
  };
  return restParam;
};

export { pathDecomposer, restParam, resController };
