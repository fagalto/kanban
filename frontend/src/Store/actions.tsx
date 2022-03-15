import { action } from "typesafe-actions";
import { Dispatch } from "redux";
import {  kanBan, slotData,coordinates } from "../Interfaces/interfaces";
import {
  KanbanDetailsActions,
  KanbanPutActions,
  KanbanPostActions,
  SlotsDetailsActions,
  SlotDetailsActions,
  SlotDialogActions,
  SearchTextActions,
  SlotMoveActions,
  SlotPutActions,
  FetchReelActions,
  FilesUploadActions

} from "./types";
import { checkServerIdentity } from "tls";

export const kanDataFetched = (data: kanBan) => {
  console.log(data)
  return action(KanbanDetailsActions.FETCH_KANBAN_DATA_SUCCESS, data );
};
export const kanDataFetchStart = () => {
  return action(KanbanDetailsActions.FETCH_KANBAN_DATA_STARTED, {});
};
export const kanDataFetchError = (error: any) => {
  return action(KanbanDetailsActions.FETCH_KANBAN_DATA_ERROR, {
    error,
  });
};
export const kanDataPut = (data:any) => {
  return action(KanbanPutActions.KANBAN_PUT_SUCCESS);
};
export const kanDataPutStart = () => {
  return action(KanbanPutActions.KANBAN_PUT_START, {});
};
export const kanDataPutError = (error: any) => {
  return action(KanbanPutActions.KANBAN_PUT_ERROR, {
    error,
  });
};
export const kanDataPosted = (data: any) => {
  return action(KanbanPostActions.KANBAN_POST_SUCCESS);
};
export const kanDataPostStart = () => {
  return action(KanbanPostActions.KANBAN_POST_START, {});
};
export const kanDataPostError = (error: any) => {
  return action(KanbanPostActions.KANBAN_POST_ERROR, {
    error,
  });
};

export const slotsDataFetched = (data: any) => {
  console.log("kanban data refreshed");
  return action(SlotsDetailsActions.FETCH_SLOTS_DATA_SUCCESS, {
    slotData: data,
  });
};
export const slotsDataFetchStart = () => {
  return action(SlotsDetailsActions.FETCH_SLOTS_DATA_STARTED, {});
};

export const slotsDataFetchEror = (error: any) => {
  return action(SlotsDetailsActions.FETCH_SLOTS_DATA_ERROR, {
    error,
  });
};
export const slotDataFetched = (data: slotData) => {
  
  return action(SlotDetailsActions.FETCH_SLOT_DATA_SUCCESS, {
    slotData: data,
  });
};
export const slotDataFetchStart = () => {
  return action(SlotDetailsActions.FETCH_SLOT_DATA_STARTED, {});
};
export const slotDataFetchEror = (error: any) => {
  return action(SlotDetailsActions.FETCH_SLOT_DATA_ERROR, {
    error,
  });
};
export const openSlotDialog = (xy: string, elem: React.ReactElement, title: string) => {
  return action(SlotDialogActions.DIALOG_OPEN, {
    data: { coords: xy, component: elem, title: title },
  });
};
export const closeSlotDialog = () => {
  return action(SlotDialogActions.DIALOG_CLOSE, { data: "dialog close" });
};
export const dialogSetCallbackFcn = (callback: Function) => {
  return action(SlotDialogActions.DIALOG_SET_CALLBACK_FCN, {
    callback: callback,
  });
};
export const fetchTextAction = (text: string) => {
  return action(SearchTextActions.TEXT_CHANGE, { data: text });
};
export const searchText = (text: string) => {
  console.log("Text search:", text)
  return action(SearchTextActions.TEXT_ENTER, { data: text });
};
export const reelInfoFetched = (data: any) => {
  console.log(data);
  return action(SearchTextActions.REEL_INFO_FETCHED, { data: data, });
};
export const reelInfoError = (data: any) => {
  return action(SearchTextActions.TEXT_SEARCH_ERROR, { error: data });
};

export const slotDataPut = (data: any) => {
  return  action(SlotPutActions.SLOT_PUT_SUCCESS, { ...data })
  
};
export const slotDataPutStart = () => {
  return action(SlotPutActions.SLOT_PUT_START, {});
};
export const slotDataPutError = (error: any) => {
  return action(SlotPutActions.SLOT_PUT_ERROR, {
    error,
  });
};
export const slotDataMoved = (data: any) => {
  return action(SlotMoveActions.SLOT_MOVE_SUCCESS, { ...data });
};
export const slotDataMoveStart = () => {
  return action(SlotMoveActions.SLOT_MOVE_START, {});
};
export const slotDataMoveError = (error: any) => {
  return action(SlotMoveActions.SLOT_MOVE_ERROR, {
    error,
  });
};
export const ReelsFetched = (data: any) => {
  return action(FetchReelActions.FETCH_REELS_SUCCESS, { data: data });
};
export const ReelsFetchStart = (slotid:any) => {
  return action(FetchReelActions.FETCH_REELS_START, slotid);
};
export const ReelsFetchError = (error: any) => {
  return action(FetchReelActions.FETCH_REELS_ERROR, {
    error,
  })
};
export const FilesUploadStarted = () => {
  return action(FilesUploadActions.FILES_UPLOAD_START,{})
}
export const FilesUploadFinished = (files: File[]) => {
  return action (FilesUploadActions.FILES_UPLOAD_SUCCESS,{files:files})
};
export const FilesUploadError = () => {
  return action(FilesUploadActions.FILES_UPLOAD_ERROR,{})
};