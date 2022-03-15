import configKeyChain from "../../backend/config/dbConfigs";
import * as schemas from "./schemas";

enum methodsAllowed {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}
type dbResource = {
  restName: string;
  scheme: schemas.tableField[];
};

const allowedResources: dbResource[] = [];


const kanban: dbResource = {
  restName: "kanban",
  scheme: schemas.kanban,
};
const kanbanSlots: dbResource = {
  restName: "kanban/slots",
  scheme: [], //schemas.slots,
};
const slots = Object.assign({}, kanbanSlots);
slots.restName = "slots"

//reels
const reels: dbResource = {
  restName: "reels",

  scheme: [],
};
const slotsReels: dbResource = {
  restName: "slots/reels",

  scheme: [], //schemas.slots,
};
const item: dbResource = {
  restName: "kanban/item",

  scheme: [], //schemas.slots,
};
const reelSlot: dbResource = {
  restName: "reels/slot",

  scheme: [], //schemas.slots,
};
allowedResources.push(kanban);
allowedResources.push(slots);
allowedResources.push(item);
allowedResources.push(reelSlot);
allowedResources.push(kanbanSlots);
allowedResources.push(reels);
allowedResources.push(slotsReels);
allowedResources.push(reelSlot);
export { allowedResources, methodsAllowed, dbResource };
