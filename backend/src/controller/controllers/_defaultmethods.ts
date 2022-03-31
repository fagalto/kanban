import express, { Request, Response, NextFunction } from "express";


import getStatus, {httpStatus } from "../../config/httpResponse";
import { methodsAllowed } from "../../config/allowedResources"
interface dbReply {
  succes: httpStatus
  error: httpStatus
}

async function handleDbQuery(
  promise: Promise<any>,
  response: Response,
  requestMethod: methodsAllowed
) {

  let reply: dbReply = {
    succes: getStatus(200),
    error:getStatus(404)
  }

  switch (requestMethod) {
    case methodsAllowed.GET:
      break;
    case methodsAllowed.PUT:
      (reply.succes = getStatus(202)), (reply.error = getStatus(400));
      break;
    case methodsAllowed.POST:
      (reply.succes = getStatus(201)), (reply.error = getStatus(400));
      break;
    case methodsAllowed.DELETE:
      (reply.succes = getStatus(202)), (reply.error = getStatus(400));
      break;
  }
  return promise
    .then((data) => {
      const returnedData = data != null ? data : {};
      response.status(reply.succes.code).json(returnedData);
    })
    .catch((err) => {
      response.status(reply.error.code).json(reply.error.name + "\n" + err);
    });
}



export { handleDbQuery };
  