import express, { Request, Response, NextFunction } from "express";
import { resController } from "../utils/utils";
import { handleDbQuery } from "./_defaultmethods";
import getStatus from "../../Router/httpResponse";
import { methodsAllowed } from "../../DbOperations/allowedTypes";

const whStockController = (res: resController) => {
  const { request, restParams, response, router, connection, dbResource } = res;

  const db = connection.find((connection) => connection.name == "huParts").manager;
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
      router.route(`/warehouse`).get((request: Request, response: Response) => {
  
          
        handleDbQuery(
          db.query(`SELECT [ITEMID]
      ,[Fizycznie dostępne]
      ,[Magazyn]
  FROM [SQL1\\DEV].[MsDaxOutDB].[dbo].[InventSumAVAILPHYSICAL] where Magazyn = '20'`),
          response,
          methodsAllowed[method]
        );
    
      })
        break;

      
    }
}

export { whStockController };
