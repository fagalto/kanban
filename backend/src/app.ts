import express from "express";
import router from "./Router/router";

import { createConnection, Connection } from "typeorm";

const app = express();
const port = 5000;

import bodyParser from "body-parser";
import cors from "cors";

async function connect() {
    const connections: Connection[]=[]
    const conn = await createConnection("huParts"); 
    const connAX = await createConnection("AX"); 
    connections.push(conn);
    connections.push(connAX);

    return connections;
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
connect().then(conn => {  app.use("/api/", router(conn))})

app.listen(port);
console.log("Process Advisor API is runnning at " + port);
