import express, { Request, Response, NextFunction } from "express";
import { resController } from "../utils/utils";
import { handleDbQuery } from "./_defaultmethods";
import getStatus from "../../config/httpResponse";
import { methodsAllowed } from "../../config/allowedResources";
import Slot from "../../entity/Slot";
import { kanban } from "../../config/schemas";

const slotController = (res: resController) => {
  const { request, restParams, response, router, connection, dbResource } = res;

    const db = connection.find((connection) => connection.name == "huParts").manager;
  //const resourceName = restParams.decomposedPath;
  const kanbanId = restParams.resourceName == "kanban/slots" ? restParams.paramId : null;
  const slot_id = kanbanId !== null ? restParams.subParamId : restParams.paramId;
  const method = request.method;

  enum endpointMethodsAllowed {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE",
  }

  if (method in endpointMethodsAllowed == false) {
    const { code, name } = getStatus(405);
    return res.response.status(code).json(name);
  }

  switch (method) {
    case "GET":
      switch (kanbanId) {
        case null:
          slot_id !== null
            ? router.route(`/slots/${slot_id}`).get((request: Request, response: Response) => {
                handleDbQuery(db.findOne(Slot, slot_id), response, methodsAllowed[method]);
              })
            : router.route(`/slots`).get((request: Request, response: Response) => {
                handleDbQuery(db.find(Slot), response, methodsAllowed[method]);
            });
          router.route(`/item/${slot_id}`).get((request: Request, response: Response) => {
             
                handleDbQuery(
                  db.createQueryBuilder(Slot, "slots").where(`slots.itemid = '${slot_id}'`).getMany(),
                  response,
                  methodsAllowed[method]
                );
              });          
          break;
        default:
          slot_id !== null
            ? router
                .route(`/kanban/${kanbanId}/slots/${slot_id}`)
                .get((request: Request, response: Response) => {
                  handleDbQuery(db.findOne(Slot, slot_id), response, methodsAllowed[method]);
                })
            : router
                .route(`/kanban/${kanbanId}/slots`)
                .get((request: Request, response: Response) => {
                  handleDbQuery(
                    db
                      .createQueryBuilder(Slot, "slots")
                      .where(`slots.kanban_id = ${kanbanId}`)
                      .getMany(),
                    response,
                    methodsAllowed[method]
                  );
                });
          break;
      }
      break;
    case "PUT":
     // console.log("put data into ", slot_id, ":", request.body);
      router.route(`/slots/${slot_id}`).put((request: Request, response: Response) => {
        let newSlot = new Slot();
        Object.entries(request.body).forEach((elem) => {
          const keyName =
            dbResource.scheme.length > 0
              ? dbResource.scheme.find((col) => col.name == elem[0]).columnName || elem[0]
              : elem[0];

          newSlot[keyName] = elem[1];
        });
        handleDbQuery(db.save(newSlot), response, methodsAllowed[method]);
      });

      break;
    case "POST":
      router.route(`/slots`).post((request: Request, response: Response) => {
       // console.log("req:", request.body);
        const newSlot = new Slot();
        Object.entries(request.body).forEach((elem) => {
          const keyName =
            dbResource.scheme.length > 0
              ? dbResource.scheme.find((col) => col.name == elem[0]).columnName||elem[0]
              : elem[0];
          newSlot[keyName] = elem[1];
        });
        //db.save(newKanban).then((res) => console.log(res));
        handleDbQuery(db.save(newSlot), response, methodsAllowed[method]);

       // console.log("posting:", newSlot);
      });

      break;
    case "DELETE":
      router.route(`/slots/${slot_id}`).delete(async (request: Request, response: Response) => {
        const slot = new Slot();
        slot.slot_id = Number.parseInt(slot_id);
        handleDbQuery(db.remove(slot), response, methodsAllowed[method]);
      });

      break;
  }
};

export { slotController };
