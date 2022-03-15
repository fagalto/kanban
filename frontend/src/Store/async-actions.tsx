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
} from "./actions";
import endpoints  from "../Backend/endpoints";
import { getData, postData, putData, putData2, deleteData } from "../Backend/methods";
import { KanbanActions } from "./types";
import { slotData, reelDetails, slotReel } from "../Interfaces/interfaces";
import { keyboardOptions } from "@testing-library/user-event/dist/keyboard";

export const fetchKanbanData = (dispatch: Dispatch<KanbanActions>, id: number) => {
  dispatch(kanDataFetchStart());
  getData(`${endpoints.KANBAN}/${id}`)
    .then((res) => res.json())
    .then((json) => dispatch(kanDataFetched(json)))
    .catch((err) => dispatch(kanDataFetchError(err)));
};

export const putKanbanData = (dispatch: Dispatch<KanbanActions>, data: any, id: number) => {
  dispatch(kanDataPutStart());
  putData2(`${endpoints.KANBAN}/${id}`, data)
    .then((res) => res.json())
    .then((json) => dispatch(kanDataPut(json)))
    .catch((err) => dispatch(kanDataPutError(err)));
};
export const postKanbanData = (dispatch: Dispatch<KanbanActions>, data: any) => {
  dispatch(kanDataPostStart());
  postData(`${endpoints.KANBAN}`, data)
    .then((res) => res.json())
    .then((json) => dispatch(kanDataPosted(json)))
    .catch((err) => dispatch(kanDataPostError(err)));
};

export const fetchSlotsData = (dispatch: Dispatch<KanbanActions>, id: number) => {
  dispatch(slotsDataFetchStart());
  getData(`${endpoints.SLOT_KANBAN(id)}`)
    .then((res) => res.json())
    .then((json) => dispatch(slotsDataFetched(json)))
    .catch((err) => dispatch(slotsDataFetchEror(err)));
};
export const fetchReelsInSlot = (dispatch: Dispatch<KanbanActions>, slotId: string) => {
  dispatch(ReelsFetchStart({ slotId: slotId }));
  getData(`${endpoints.SLOT_REELS(slotId)}`)
    .then((res) => res.json())
    .then((json) => dispatch(ReelsFetched(json)))
    .catch((err) => dispatch(ReelsFetchError(err)));
};
export const fetchSlotData = (dispatch: Dispatch<KanbanActions>, id: number|string) => {
  dispatch(slotDataFetchStart());
  getData(`${endpoints.SLOT}/${id}`)
    .then((res) => res.json())
    .then((json) => dispatch(slotDataFetched(json)))
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
    .then((reel: reelDetails) => reelAction(dispatch, reel, kanbanId))
    /*
      dispatch(slotsDataFetchStart());
      getData(slotEndpoint(kanbanId), { kanbanid: kanbanId })
        .then((res) => res.json())
        .then((json) => dispatch(slotsDataFetched(json)))
        .catch((err) => dispatch(slotsDataFetchEror(err)));
        */
    .catch((err) => dispatch(reelInfoError(err)));
};
export const reelAction = async (
  dispatch: Dispatch<KanbanActions>,
  reelDetails: reelDetails,
  kanbanId:number
) => {
  const { REELID, ITEMID, QTY } = reelDetails
  //look for slot for such itemid.

  console.log("got:", reelDetails);

  const slotForReel = await getData(`${endpoints.SLOT_FOT_ITEMID(ITEMID,kanbanId)}`).then(res=>res.json()).catch(err=>dispatch(reelInfoError("itemid reel info fetch error")))
  console.log("slotforReel is:", slotForReel);
  //I have reeel and slot for the reel
  //now check if reel is in slot
  const reelsInSlot = await getData(`${endpoints.SLOT_REELS(slotForReel["slot_id"])}`)
    .then((res) => res.json())
    .catch((err) => dispatch(reelInfoError(err)));
  console.log(reelsInSlot)
  /*
  const slot: slotReel = await getData(`${endpoints.REELS_SLOT(REELID)}`)
    .then((res) => res.json())
    .catch((err) => dispatch(reelInfoError(err)));
  console.log(slot)
  reelDetails.ITEMID == null && dispatch(reelInfoError("no data"));

  if (reelDetails.ITEMID != null && slot.id != null) {
    console.log("delete")
    await deleteData(`${endpoints.SLOT_REELS(slot.id)}`)
      .then((res) => res.json())
      .then((json) => dispatch(reelInfoFetched("TAKE_OUT")))
      .catch((err) => dispatch(reelInfoError("err take out reel")));
  }

  if (reelDetails.ITEMID != null && slot.id == null) {
    console.log("post");
        await postData(`${endpoints.REELS_SLOT(REELID)}`)
          .then((res) => res.json())
          .then((json) => dispatch(reelInfoFetched("PUT_IN")))
          .catch((err) => dispatch(reelInfoError("err post reel")));
    // && dispatch(reelInfoFetched("TAKE_OUT"));
  }
  */
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

  putData2(`${endpoints.SLOT}/${id}`, data)
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
  const fromId = fromSlot.slot_id;
  const fromCoords = fromSlot.slot_coord;
  const toId = toSlot.slot_id;
  const toCoords = toSlot.slot_coord;

  const copyFromSlot = Object.assign({}, fromSlot);
  const copyToSlot = Object.assign({}, toSlot);

  copyFromSlot.slot_id = toId;
  copyFromSlot.slot_coord = toCoords;
  copyToSlot.slot_id = fromId;
  copyToSlot.slot_coord = fromCoords;
  copyToSlot.itemid = "";
  copyToSlot.req_capacity = 0;
  copyToSlot.balance = 0;

  dispatch(slotDataMoveStart());
  putData2(`${endpoints.SLOT}/${toId}`, copyFromSlot)
    .then((json) => {
      putData2(`${endpoints.SLOT}/${fromId}`, copyToSlot)
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
