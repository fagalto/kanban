import { Dispatch } from "redux";
import {
  kanDataFetchError,
  kanDataFetched,
  kanDataFetchStart,
  kanDataPut,
  kanDataPutError,
  kanDataPutStart,
  kanDataPostError,
  kanDataPostStart,
  kanDataPosted,
  slotsDataFetchEror,
  slotsDataFetchStart,
  slotsDataFetched,
  slotDataFetchEror,
  slotDataFetchStart,
  slotDataFetched,
  searchText,
  reelInfoFetched,
  reelInfoError,
  openSlotDialog,
  closeSlotDialog,
  slotDataPutStart,
  slotDataPutError,
  slotDataPut,
  slotDataMoveError,
  slotDataMoved,
  slotDataMoveStart,
  ReelsFetched,
  ReelsFetchStart,
  ReelsFetchError,
  fetchWhStockStart,
  WhStockFetched,
  WhStockFetchError
} from "./actions";
import endpoints from "../Backend/endpoints";
import { getData, postData, putData, deleteData } from "../Backend/methods";
import { KanbanActions, SlotPutActions } from "./types";
import { slotData } from "../Interfaces/interfaces";
import { keyboardOptions } from "@testing-library/user-event/dist/keyboard";
import * as BT from "../Backend/types";

export const fetchKanbanData = (dispatch: Dispatch<KanbanActions>, id: number) => {
  dispatch(kanDataFetchStart());
  getData(`${endpoints.KANBAN}/${id}`)
    .then((res) => res.json())
    .then((json) => dispatch(kanDataFetched(json)))
    .catch((err) => dispatch(kanDataFetchError(err)));
};

export const putKanbanData = (dispatch: Dispatch<KanbanActions>, data: BT.Kanban, id: number) => {
  dispatch(kanDataPutStart());
  putData(`${endpoints.KANBAN}/${id}`, data)
    .then((res) => res.json())
    .then((json) => dispatch(kanDataPut(json)))
    .catch((err) => dispatch(kanDataPutError(err)));
};
export const postKanbanData = (dispatch: Dispatch<KanbanActions>, data: BT.Kanban) => {
  dispatch(kanDataPostStart());
  postData(`${endpoints.KANBAN}`, data)
    .then((res) => res.json())
    .then((json) => dispatch(kanDataPosted(json)))
    .catch((err) => dispatch(kanDataPostError(err)));
};

export const fetchSlotsData = (dispatch: Dispatch<KanbanActions>, kanbanId: number) => {
  dispatch(slotsDataFetchStart());
  getData(`${endpoints.SLOT_KANBAN(kanbanId)}`)
    .then((res) => res.json())
    .then((json: BT.Slot[]) => dispatch(slotsDataFetched(json)))
    .catch((err) => dispatch(slotsDataFetchEror(err)));
};
export const fetchReelsInKanban = async (dispatch: Dispatch<KanbanActions>, kanbanId: number) => {
  dispatch(ReelsFetchStart());
  const resp = getData(`${endpoints.KANBAN_REELS(kanbanId)}`)
    .then((res) => res.json())
    .then((json: BT.SlotReel[]) => {
      dispatch(ReelsFetched(json));
    })
    .catch((err) => {
      dispatch(ReelsFetchError(err));
    });
};

export const fetchSlotData = (dispatch: Dispatch<KanbanActions>, slotId: number | string) => {
  dispatch(slotDataFetchStart());
  getData(`${endpoints.SLOT}/${slotId}`)
    .then((res) => res.json())
    .then((json: BT.Slot) => dispatch(slotDataFetched(json)))
    .catch((err) => dispatch(slotDataFetchEror(err)));
};
export const searchTextAction = (
  dispatch: Dispatch<KanbanActions>,
  text: string,
  kanbanId: number,
  worker_no: string
) => {
  dispatch(searchText(text));
  getData(`${endpoints.REELS}/${text}`)
    .then((res) => res.json())
    .then((reel: BT.Reel) => reelAction(dispatch, reel, kanbanId))
    .catch((err) => dispatch(reelInfoError(err)));
};
export const reelAction = async (
  dispatch: Dispatch<KanbanActions>,
  reelDetails: BT.Reel,
  kanbanId: number
) => {
  const { REELID, ITEMID, QTY } = reelDetails;
  console.log("have Reel:", reelDetails);
  //look for slot for such itemid.
  reelDetails.REELID == null
    ? dispatch(reelInfoError("reel not exists"))
    : await getData(`${endpoints.SLOT_FOT_ITEMID(ITEMID, kanbanId)}`)
        .then((res) => res.json())
        .then((slot: BT.Slot) => slotHasReels(dispatch, slot, reelDetails))
        .catch((err) => dispatch(reelInfoError("itemid reel info fetch error")));
};
export const slotHasReels = async (
  dispatch: Dispatch<KanbanActions>,
  slot: BT.Slot,
  reel: BT.Reel
) => {
  console.log("have Slot:", slot);
  getData(`${endpoints.SLOT_REELS(slot.slot_id)}`)
    .then((res) => res.json())
    .then((reels: BT.SlotReel[]) => {
      const slotReel = reels.find((elem) => elem.reel_id == reel.REELID);

      slotReel ? SlotTakeOut(dispatch, slot, slotReel) : SlotPutIn(dispatch, slot, reel);
    })
    .catch((err) => dispatch(reelInfoError("slot fetch reels error")));
};
export const SlotTakeOut = (
  dispatch: Dispatch<KanbanActions>,
  slot: BT.Slot,
  slotReel: BT.SlotReel
) => {
  console.log("take out :", slotReel);

  deleteData(`${endpoints.SLOT_REELS(slotReel.slot_id)}/${slotReel.id}`)
    .then((res) => {
      dispatch(reelInfoFetched("TAKEOUT"));
      fetchReelsInKanban(dispatch, slot.kanban_id);
    })
    .catch((err) => dispatch(reelInfoError("Reel Takeout Error")));
};
export const SlotPutIn = (dispatch: Dispatch<KanbanActions>, slot: BT.Slot, reel: BT.Reel) => {
  console.log("put in :", slot, reel);
  const slotReel = {
    reel_id: reel.REELID,
    slot_id: slot.slot_id,
  };
  postData(`${endpoints.SLOT_REELS(slot.slot_id)}`, slotReel)
    .then((res) => {
      dispatch(reelInfoFetched("PUT_IN"));
      fetchReelsInKanban(dispatch, slot.kanban_id);
    })
    .catch((err) => dispatch(reelInfoError("Reel Put Error")));
};
export const openDialog = (
  dispatch: Dispatch<KanbanActions>,
  xy: string,
  component: React.ReactElement,
  title: string
) => {
  dispatch(openSlotDialog(xy, component, title));
};
export const closeDialog = (dispatch: Dispatch<KanbanActions>) => {
  dispatch(closeSlotDialog());
};

export const putSlotData = (dispatch: Dispatch<KanbanActions>, data: any, id: number) => {
  dispatch(slotDataPutStart());

  putData(`${endpoints.SLOT}/${id}`, data)
    .then((res) => res.json())
    .then((json) => dispatch(slotDataPut(json)))
    .catch((err) => dispatch(slotDataPutError(err)));
  return id;
};
export const postSlotData = (dispatch: Dispatch<KanbanActions>, data: any) => {
  postData(`${endpoints.SLOT}`, data)
    .then((res) => res.json())
    .then((json) => dispatch(slotDataPut(json)))
    .catch((err) => dispatch(slotDataPutError(err)));
};
export async function moveSlot(
  dispatch: Dispatch<KanbanActions>,
  fromSlot: slotData,
  toSlot: slotData,
  kanbanId: number
) {
  const fromCoords = fromSlot.slot_coord;
  const toCoords = toSlot.slot_coord;

  const copyFromSlot = Object.assign({}, fromSlot);
  const copyToSlot = Object.assign({}, toSlot);

  copyFromSlot.slot_coord = toCoords;
  copyToSlot.slot_coord = fromCoords;
  copyToSlot.itemid = "";
  copyToSlot.req_capacity = 0;
  copyToSlot.balance = 0;

  dispatch(slotDataMoveStart());
  putData(`${endpoints.SLOT}/${fromSlot.slot_id}`, copyFromSlot)
    .then((json) => {
      putData(`${endpoints.SLOT}/${toSlot.slot_id}`, copyToSlot)
        .then((json) => {
          dispatch(slotDataMoved(json));
          fetchSlotsData(dispatch, kanbanId);
        })
        .catch((err) => {
          dispatch(slotDataMoveError(err));
        });
    })
    .catch((err) => {
      dispatch(slotDataMoveError(err));
    });
}
export const fetchWhStock = (dispatch: Dispatch<KanbanActions>) => {
  dispatch(fetchWhStockStart());
  getData(`${endpoints.WH_STOCK}`)
    .then((res) => res.json())
    .then((json: BT.WhStock[]) => dispatch(WhStockFetched(json)))
    .catch((err) => dispatch(WhStockFetchError(err)));
};
