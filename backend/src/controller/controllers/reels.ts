import express, { Request, Response, NextFunction } from "express";
import { resController } from "../utils/utils";
import { handleDbQuery } from "./_defaultmethods";
import getStatus from "../../config/httpResponse";
import { methodsAllowed } from "../../config/allowedResources";
import Reel from "../../entity/Reel";

const reelController = (res: resController) => {
  const { request, restParams, response, router, connection, dbResource } = res;

  const db = connection.find((connection) => connection.name == "AX").manager;
  //const resourceName = restParams.decomposedPath;
  const reelId = restParams.paramId;
  const method = request.method;

  enum endpointMethodsAllowed {
    GET = "GET"
  }

  if (method in endpointMethodsAllowed == false) {
    const { code, name } = getStatus(405);
    return res.response.status(code).json(name);
  }

  switch (method) {
    case "GET":
       router.route(`/reels/${reelId}`).get((request: Request, response: Response) => {
          
            handleDbQuery(db.findOne(Reel, reelId), response, methodsAllowed[method]);
          })
    
      break;

  };
}

export { reelController };
