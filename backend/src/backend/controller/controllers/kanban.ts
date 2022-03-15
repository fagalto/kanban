import express, { Request, Response, NextFunction } from "express";
import { resController } from "../utils/utils";
import { handleDbQuery } from "./_defaultmethods";
import getStatus from "../../Router/httpResponse";
import { methodsAllowed } from "../../DbOperations/allowedTypes";
import Kanban from "../../../entity/Kanban";
import Slot from "../../../entity/Slot"

const kanbanController = (res: resController) => {

  const { request, restParams, response, router, connection, dbResource } = res;

  const db = connection.find((connection) => connection.name == "huParts").manager;
  const { resourceName,paramId,subParamId,subResourceName } = restParams
 
  const method = request.method;


  enum endpointMethodsAllowed {
  GET= "GET",
  PUT="PUT",
  POST="POST",
  DELETE="DELETE", 
}

  if (method in endpointMethodsAllowed == false) {
    const { code, name } = getStatus(405);
    return res.response.status(code).json(name);
  }

  switch (method) {
    case "GET":
    paramId!==null
      ? router.route(`/${resourceName}/${paramId}`).get((request: Request, response: Response) => {
          handleDbQuery(db.findOne(Kanban, paramId), response, methodsAllowed[method]);
        })
      : router.route(`/${resourceName}`).get((request: Request, response: Response) => {
          handleDbQuery(db.find(Kanban), response, methodsAllowed[method]);
      });
          router
            .route(`/kanban/${paramId}/item/${subParamId}`)
            .get((request: Request, response: Response) => {
              handleDbQuery(
                db
                  .createQueryBuilder(Slot, "slots")
                  .where(`slots.itemid = '${subParamId}' and slots.kanban_id = '${paramId}'`)
                  .getOne(),
                response,
                methodsAllowed[method]
              );
            }); 
            router.route(`/kanban/${paramId}/item`)
            .get((request: Request, response: Response) => {
              handleDbQuery(
                db
                  .createQueryBuilder(Slot, "slots")
                  .where(`slots.kanban_id = '${paramId}'`)
                  .getMany(),
                response,
                methodsAllowed[method]
              );
            }); 
      break;
    case "PUT":
      console.log(`/${resourceName}/${paramId}`);
      router.route(`/${resourceName}/${paramId}`).put((request: Request, response: Response) => {
        console.log("req:", request.body);
        const newKanban = new Kanban();
        Object.entries(request.body).forEach((elem) => {
          const keyName =
            dbResource.scheme.find((col) => col.name == elem[0]).columnName || elem[0];

          newKanban[keyName] = elem[1];
        });
        handleDbQuery(db.save(newKanban), response, methodsAllowed[method]);
      });

      break;
    case "POST":
      router.route(`/${resourceName}`).post((request: Request, response: Response) => {
        console.log("req:", request.body);
        const newKanban = new Kanban();
        Object.entries(request.body).forEach((elem) => {
          const keyName =
            dbResource.scheme.find((col) => col.name == elem[0]).columnName || elem[0];
          keyName != "kanban_id" && (newKanban[keyName] = elem[1]);
        });
        //db.save(newKanban).then((res) => console.log(res));
        handleDbQuery(db.save(newKanban), response, methodsAllowed[method]);

        console.log("posting:", newKanban);
      });

      break;
    case "DELETE":
      router
        .route(`/${resourceName}/${paramId}`)
        .delete(async (request: Request, response: Response) => {
          const kanban = new Kanban();
          kanban.kanban_id = Number.parseInt(paramId);
          handleDbQuery(db.remove(kanban), response, methodsAllowed[method]);
        });

      break;
  }
};

export { kanbanController };
