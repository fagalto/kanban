import express, { Request, Response, NextFunction } from "express";
import { resController } from "../utils/utils";
import { handleDbQuery } from "./_defaultmethods";
import getStatus from "../../Router/httpResponse";
import { methodsAllowed } from "../../DbOperations/allowedTypes";
import SlotStatic from "../../entity/SlotStatic";
import Slot from "../../entity/Slot";

const slotStaticController = (res: resController) => {
  const { request, restParams, response, router, connection, dbResource } = res;

  const db = connection.find((connection) => connection.name == "huParts").manager;
  //const resourceName = restParams.decomposedPath;
  const kanbanId = restParams.paramId;
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
      router.route(`/kanban/${kanbanId}/static/`).get((request: Request, response: Response) => {
         

         handleDbQuery(
           db
             .createQueryBuilder(SlotStatic, "static")
             .innerJoinAndSelect(Slot, "slot", "static.slot_id=slot.slot_id")
             .where(`slot.kanban_id = '${kanbanId}'`)
             .andWhere(`len(slot.itemid)>1`)
             .andWhere(`slot.req_capacity-static.balance>0`)
             .getMany(),
           response,
           methodsAllowed[method]
         );
       });
    
      break;

  };
}

export { slotStaticController };
