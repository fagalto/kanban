const API_BASE = "localhost:5000";
const slotEndpoint = (kanban_id: number, slot_id?: number) => {
  return slot_id
    ? `http://${API_BASE}/api/kanban/${kanban_id}/slots/${slot_id}`
    : `http://${API_BASE}/api/kanban/${kanban_id}/slots/`;
};
const reelSlot = (reel_id: string | number) => {
  return `http://${API_BASE}/api/reels/${reel_id}/slot`;
};
const slotReels = (slot_id: string | number) => {
  return `http://${API_BASE}/api/slots/${slot_id}/reels`;
};
const kanbanReels = (kanban_id: number) => {
  return `http://${API_BASE}/api/kanban/${kanban_id}/reels`;
};
const slotForItemId = (itemId: number | string, kanbanId: number) => {
  return `http://${API_BASE}/api/kanban/${kanbanId}/item/${itemId}`;
};
const kanbanStatic = (kanban_id: number) => {
  return `http://${API_BASE}/api/kanban/${kanban_id}/static`;
};
const endpoints = {
  KANBAN: `http://${API_BASE}/api/kanban`,
  KANBAN_REELS: kanbanReels,
  KANBAN_STATIC: kanbanStatic,
  SLOT: `http://${API_BASE}/api/slots`,
  SLOT_KANBAN: slotEndpoint,
  SLOT_REELS: slotReels,
  SLOT_FOT_ITEMID: slotForItemId,
  REELS: `http://${API_BASE}/api/reels`,
  REELS_SLOT: reelSlot,
  WH_STOCK: `http://${API_BASE}/api/warehouse`,
};
export default endpoints;
