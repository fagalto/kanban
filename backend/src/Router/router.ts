import express, { Request, Response, NextFunction } from "express";
import  { resourceControllerFactory} from "../controller/resourceControllerFactory";
import getStatus from "../config/httpResponse"
import { createConnection, Connection, SimpleConsoleLogger } from "typeorm";





function appRouter  (connection: Connection[])  {
  let router = express.Router();
  router.use((request: Request, response: Response, next) => {
   
    resourceControllerFactory(request, response, router,  connection);
    next();
  });
  return router
}




export default appRouter;
