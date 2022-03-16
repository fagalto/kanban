import config from "../config/dbConfigSelector";
import mssql from "mssql";
import express from "express";
import { dbResource } from "./allowedTypes";
import bodyParser from "body-parser";

async function getAllItems(resource: dbResource) {
  try {
    let pool = await mssql.connect(config(null));
    let result = await pool
      .request()
      .query(`SELECT * from ${resource.database}.${resource.dbSchema}.${resource.tableName}`);
    return  result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getItem(resource: dbResource, recordId: number) {
  try {
    let pool = await mssql.connect(config(null));

    let product = await pool
      .request()
      .query(
        `SELECT * from ${resource.database}.${resource.dbSchema}.${resource.tableName} where ${resource.identityName} = '${recordId}'`
      );
    return product.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function postItem(resource: dbResource, request: express.Request) {
  try {
    let pool = await mssql.connect(config(null));
    const query = `INSERT INTO ${resource.database}.${resource.dbSchema}.${
      resource.tableName
    } values (${JSON.stringify(request.query)
.replace(/[{}]/g, "").replace(/:/g, "=")}`;
console.log(query);
    let product = await pool.request().query(query);
    return product.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function putItem(query:string) {
  try {
    console.log("query send:",query)
    let pool = await mssql.connect(config(null));
    let product = await pool.request().query(query);
    const result = product.recordsets;
    return result
  } catch (error) {
    console.log("there was soem error", error.toString());
  }
}

export  {
  getAllItems,
  getItem,
  postItem,
  putItem
};
