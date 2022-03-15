import { combineReducers, createStore } from "redux";
import { KanbanState, RootState } from "./types";
import * as asyncactions from "./async-actions";
import { Dispatch } from "redux";
import { KanbanActions } from "./types";
import * as actions from "./actions";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import { inputUnstyledClasses } from "@mui/base";
import {
  kanbanReducer,
  slotsReducer,
  inputReducer,
  slotDialogReducer,
  fetchReelsReducer,
  filesReducer,
} from "./reducers";

import { slotData } from "../Interfaces/interfaces";

const store = createStore<RootState, any, any, any>(
  combineReducers({
    kanban: kanbanReducer,
    slots: slotsReducer,
    input: inputReducer,
    dialog: slotDialogReducer,
    reels: fetchReelsReducer,
    filesBuffer: filesReducer,
  })
);

export default store;

export const mapStateToProps = ({
  kanban,
  slots,
  input,
  dialog,
  reels,
  filesBuffer,
}: RootState) => {
  const { kanbanDetails, worker_no } = kanban;
  const slotData = slots.slotData;
  const slotsFetched = slots.slotsFetched;
  const messages = kanban.messages
    .concat(slots.messages, input.messages, reels.messages)
    .sort((a, b) => a.arrivalTime - b.arrivalTime);

  const isLoading = kanban.isLoading || slots.isLoading || input.isLoading;

  const reelIsLoading = reels.isLoading;
  return {
    slotData,
    slotsFetched,
    isLoading,
    reelIsLoading,
    kanbanDetails,
    dialog,
    reels,
    messages,
    worker_no,
    filesBuffer,
  };
};
export const mapSlotsToProps = ({ slots, kanban }: RootState) => {
  const { kanbanDetails, worker_no } = kanban;
  const slotData = slots.slotData;
  return { slotData, kanbanDetails };
};
export const mapReelsToProps = ({ reels }: RootState) => {
  const reelIsLoading = reels.isLoading;
  return { reels, reelIsLoading };
};
export const mapInputToProps = ({ kanban, input }: RootState) => {
  const messages = input.messages;
  const kanbanDetails = kanban.kanbanDetails;
  return { input, messages, kanbanDetails };
};
export const mapFilesToProps = ({ filesBuffer }: RootState) => {
  return { filesBuffer };
};

export const mapDispatcherToProps = (dispatch: Dispatch<KanbanActions>) => {
  return {
    fetchKanData: (id: number) => asyncactions.fetchKanbanData(dispatch, id),
    fetchAllSlotsData: (id: number) => asyncactions.fetchSlotsData(dispatch, id),
    putKanbanData: (data: any, id: number) => asyncactions.putKanbanData(dispatch, data, id),
    postKanbanData: (data: any) => asyncactions.postKanbanData(dispatch, data),
    putSlotData: (data: any, id: number) => asyncactions.putSlotData(dispatch, data, id),
    postSlotData: (data: any) => asyncactions.postSlotData(dispatch, data),
    fetchSlotData: (id: number) => asyncactions.fetchSlotData(dispatch, id),
    //inputText: (text: string) => actions.fetchTextAction(text),
    searchText: (text: string, kanbanId: number, worker_no: string) =>
      asyncactions.searchTextAction(dispatch, text, kanbanId, worker_no),
    moveSlot: (fromSlot: slotData, toSlot: slotData, kanbanId: number) =>
      asyncactions.moveSlot(dispatch, fromSlot, toSlot, kanbanId),
    openSlotDialog: (xy: string, elem: React.ReactElement, title: string) =>
      asyncactions.openDialog(dispatch, xy, elem, title),
    closeSlotDialog: () => asyncactions.closeDialog(dispatch),
    fetchReelsInSlot: (slotid: string) => asyncactions.fetchReelsInSlot(dispatch, slotid),
    dialogSetCallback: (callback: Function) => dispatch(actions.dialogSetCallbackFcn(callback)),
    filesUploaded: (files: File[]) => dispatch(actions.FilesUploadFinished(files)),
    //addItems2: (item: string) => asyncactions.addItemAsync(dispatch, item)
  };
};
export type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>;

export const connectToStore = (component: any, state: any = mapStateToProps) => {
  return connect(state, mapDispatcherToProps)(component);
};
