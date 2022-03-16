import express, { Request, Response, NextFunction } from "express";
import  { resourceControllersFactory} from "../controller/resourceControllersFactory";
import getStatus from "./httpResponse"
import { createConnection, Connection, SimpleConsoleLogger } from "typeorm";





function approuter  (connection: Connection[])  {
  let router = express.Router();
  router.use((request: Request, response: Response, next) => {
   
  
    resourceControllersFactory(request, response, router,  connection);
    next();
  });
  return router
}




export default approuter;
