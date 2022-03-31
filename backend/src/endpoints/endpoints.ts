const API_BASE = "localhost:5000";

const staticEndpoints = {
  KANBAN: `http://${API_BASE}/api/kanban`,
  KANBAN_REELS: `http://${API_BASE}/api/kanban/$kanban_id/reels`,
  KANBAN_STATIC: `http://${API_BASE}/api/kanban/$kanban_id/static`,
  SLOT: `http://${API_BASE}/api/slots`,
  SLOTS_IN_KANBAN: `http://${API_BASE}/api/kanban/$kanban_id/slots`,
  SLOT_REELS: `http://${API_BASE}/api/slots/$slot_id/reels`,
  SLOT_FOT_ITEMID: `http://${API_BASE}/api/kanban/$kanbanId/item/$itemId`,
  REELS: `http://${API_BASE}/api/reels`,
  REELS_SLOT: `http://${API_BASE}/api/reels/$reel_id/slot`,
  WH_STOCK: `http://${API_BASE}/api/warehouse`,
};

const getEndpoints = () => {
  let endpointString = "AVAILABLE ENDPOINTS:\n"
  Object.entries(staticEndpoints).forEach(elem  => {
    endpointString = `${endpointString}\n${elem[0]} : ${elem[1]}`
  })
  return endpointString
}
const dirname = __dirname

export { getEndpoints, dirname }; 
//KANBAN_CREATE = "http://eng/control/backend/kanban/kanbanEdit.php", "http://localhost:3000/api"
//REEL_ACTION = "http://eng/control/backend/kanban/reelInfo.php",

