import express, { Request, Response, NextFunction } from "express";
import { resController } from "../utils/utils";
import { handleDbQuery } from "./_defaultmethods";
import getStatus from "../../config/httpResponse";
import { methodsAllowed } from "../../config/allowedResources";
import SlotStatic from "../../entity/SlotStatic";
import Slot from "../../entity/Slot";
import SlotReel from "../../entity/SlotReel";
const slotStaticController = (res: resController) => {
  const { request, restParams, response, router, connection, dbResource } = res;

  const db = connection.find((connection) => connection.name == "huParts").manager;
  //const resourceName = restParams.decomposedPath;
  const kanbanId = restParams.paramId;
  const method = request.method;

  enum endpointMethodsAllowed {
    GET = "GET",
  }

  if (method in endpointMethodsAllowed == false) {
    const { code, name } = getStatus(405);
    return res.response.status(code).json(name);
  }

  switch (method) {
    case "GET":
      router.route(`/kanban/${kanbanId}/static/`).get((request: Request, response: Response) => {
        const sql = db
          .createQueryBuilder()

          .addSelect("slot.itemid", "itemid")
          .addSelect("slot.req_capacity-static.balance", "lackingReelsNo")
          .addSelect("static.state_20", "wh20stock")
          .addSelect("static.del_date", "deliveryDate")
          .addSelect("static.req_date", "requiredDate")
          .innerJoin(Slot, "slot", "static.slot_id=slot.slot_id")
          .from(SlotStatic, "static")
          .where(`slot.kanban_id = '${kanbanId}'`)
          .andWhere(`len(slot.itemid)>1`)
          .andWhere(`slot.req_capacity-static.balance>0`);
        const sql2 = db
          .createQueryBuilder(SlotStatic, "static")
          .select([
            "slot.itemid as itemid",
            "slot.req_capacity-COUNT(slotreel.reel_id) as lackingReelsNo",
            "static.state_20 as wh20stock",
            "static.del_date as deliveryDate",
            "static.req_date as requiredDate"
          ])
          .innerJoin(Slot, "slot", "static.slot_id=slot.slot_id")
          .innerJoin(SlotReel, "slotreel", "slotreel.slot_id=slot.slot_id")
          .where(`slot.kanban_id = '${kanbanId}'`)
          .andWhere(`len(slot.itemid)>1`)
          .andWhere(`slot.req_capacity-static.balance>0`)
          .groupBy("slot.itemid")
          .addGroupBy("slot.req_capacity")
          .addGroupBy("static.state_20")
          .addGroupBy("static.del_date")
          .addGroupBy("static.req_date");
        //console.log("sql:", sql2.getSql());

        handleDbQuery(sql2.getRawMany(), response, methodsAllowed[method]);
      });

      break;
  }
};

export { slotStaticController };
