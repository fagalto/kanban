
export type slotData = {
  slot_coord?: string;
  itemid?: string;
  req_capacity?: number | string;
  balance?: number | string;
  slot_id?: number | string;
  kanban_id?: number
};
export type reelDetails = { REELID: string; QTY: number; ITEMID: string };
export type slotReel = {
  id: number;
  slot_id: number;
  reel_id: string;
}

export interface kanBan {
  name: string;
  kanban_id: number;
  area_id?: number;
  location?: string;
  slot_x: number;
  slot_y: number;
}
export type identity = {
  id: number;
};
export type coordinates = {
  x: number;
  y: number;
}
