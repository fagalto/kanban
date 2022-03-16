import express, { Request, Response, NextFunction } from "express";

import { pathDecomposer, restParam, resController } from "./utils/utils";
import { allowedResources, methodsAllowed } from "../DbOperations/allowedTypes";
import * as constollers from "./controllers/index";

const resourcesController = (res: resController) => {
  console.log(res.restParams.originalPath);
  console.log("serving endpoint nam:", res.dbResource.restName);

  switch (res.dbResource.restName) {
    case "kanban":
      constollers.kanbanController(res);
      break;
    case "kanban/reels":
      constollers.kanbanController(res);
      break;
    case "kanban/slots":
      constollers.slotController(res);
      break;
    case "slots":
      constollers.slotController(res);
      break;
    case "kanban/item":
      constollers.kanbanController(res);
      break;

    case "reels":
      constollers.reelController(res);
      break;
    case "slots/reels":
      constollers.slotReelsController(res);
      break;
    case "reels/slot":
      constollers.slotReelsController(res);
      break;
    case "kanban/static":
      constollers.slotStaticController(res);
      break;
  }
};

export { resourcesController };
