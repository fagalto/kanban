import express, { Request, Response, NextFunction } from "express";

import { allowedResources, methodsAllowed } from "../DbOperations/allowedTypes";
import getStatus from "../Router/httpResponse";
import { pathDecomposer } from "./utils/utils";
import { resourcesController } from "./index";
import { createConnection, Connection } from "typeorm";

function resourceControllersFactory(request: Request, response: Response, router: express.Router, connection:Connection[]) {

    


  const restParams = pathDecomposer(request.path);
  const dbResource = allowedResources.find((res) =>
    res.restName ==restParams.resourceName
  );
  if (dbResource === undefined) {
    const { code, name } = getStatus(404);
    return response.status(code).json(name+" resource"+ restParams.resourceName +" not exit");
  }
 
  const requestObject = { dbResource, restParams, response, request, router, connection };
 
  //now we're sure? path are identified.
  return resourcesController(requestObject);
}

export { resourceControllersFactory };


