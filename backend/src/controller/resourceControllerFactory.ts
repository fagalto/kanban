import express, { Request, Response, NextFunction } from "express";

import { allowedResources, methodsAllowed } from "../config/allowedResources";
import getStatus from "../config/httpResponse";
import { pathDecomposer } from "./utils/utils";
import { resourcesController } from "./index";
import { createConnection, Connection } from "typeorm";
import { getEndpoints,dirname } from "../endpoints/endpoints";


function resourceControllerFactory(request: Request, response: Response, router: express.Router, connection:Connection[]) {

    


  const restParams = pathDecomposer(request.path);
  const dbResource = allowedResources.find((res) =>
    res.restName ==restParams.resourceName
  );
  if (dbResource === undefined) {
    const { code, name } = getStatus(404);
 
    const res = response.writeHead(404, { 'Content-Type': 'text/plain' }).end('RESOURCE NOT FOUND\n'+getEndpoints());
    return res
    //return response.status(code).json(name + " resource" + restParams.resourceName + " not exsts" + getEndpoints());
  }
 
  const requestObject = { dbResource, restParams, response, request, router, connection };
 
  //now we're sure? path are identified.
  return resourcesController(requestObject);
}

export { resourceControllerFactory };


