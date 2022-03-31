import express, { Request, Response, NextFunction } from "express";
import { resController } from "../utils/utils";
import { handleDbQuery } from "./_defaultmethods";
import getStatus from "../../config/httpResponse";
import { methodsAllowed } from "../../config/allowedResources";
import SlotReel from "../../entity/SlotReel";

const slotReelsController = (res: resController) => {
  const { request, restParams, response, router, connection, dbResource } = res;

  const db = connection.find((connection) => connection.name == "huParts").manager;
  //const resourceName = restParams.decomposedPath;
  const slotId = restParams.paramId;
  const reelId = restParams.paramId;
  const method = request.method;
 
  enum endpointMethodsAllowed {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE"
  }

  if (method in endpointMethodsAllowed == false) {
    const { code, name } = getStatus(405);
    return res.response.status(code).json(name);
  }

  switch (method) {
    case "GET":
      router.route(`/slots/${slotId}/reels`).get((request: Request, response: Response) => {
        handleDbQuery(db.createQueryBuilder(SlotReel, "slots")
                      .where(`slots.slot_id = ${slotId}`)
                      .getMany(), response, methodsAllowed[method]);
      });
      router.route(`/reels/${reelId}/slot`).get((request: Request, response: Response) => {
        handleDbQuery(
          db.createQueryBuilder(SlotReel, "slots").where(`slots.reel_id = '${reelId}'`).getOne(),
          response,
          methodsAllowed[method]
        );
      });

      break;
    case "POST":
      router.route(`/slots/${slotId}/reels`).post((request: Request, response: Response) => {
        const newSlot = new SlotReel();
        Object.entries(request.body).forEach((elem) => {
          const keyName =
            dbResource.scheme.length > 0
              ? dbResource.scheme.find((col) => col.name == elem[0]).columnName || elem[0]
              : elem[0];
          newSlot[keyName] = elem[1];
        });
        //db.save(newKanban).then((res) => console.log(res));
        handleDbQuery(db.save(newSlot), response, methodsAllowed[method]);
      });
    case "DELETE":
      const slotReelId = restParams.subParamId;
      router
        .route(`/slots/${slotId}/reels/${slotReelId}`)
        .delete(async (request: Request, response: Response) => {
          const slotReel = new SlotReel();
          slotReel.id = Number.parseInt(slotReelId);
          handleDbQuery(db.remove(slotReel), response, methodsAllowed[method]);
        });

      break;
      break;
  };
}

export { slotReelsController };
