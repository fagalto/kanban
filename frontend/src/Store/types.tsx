import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { kanBan, slotData } from "../Interfaces/interfaces";

import * as BT from "../Backend/types";

export type severity = "error" | "warning" | "info" | "success";
export interface kanbanMessage {
  messageText: string;
  messageSeverity: severity;
  arrivalTime: number;
}

export type KanbanActions = ActionType<typeof actions>;

export interface KanbanState {
  kanbanDetails: BT.Kanban;
  isLoading: boolean;
  error: any;
  data: any;
  messages: kanbanMessage[];
  worker_no: string;
}
export interface SlotsState {
  slotData: BT.Slot[];
  isLoading: boolean;
  error: any;
  messages: kanbanMessage[];
  slotsFetched: boolean;
  whStock: BT.WhStock[];
  highlightedSlots: number[];
}

export interface dialogState {
  dialogOpen: boolean;
  dialogData: any;
  dialogXY: string;
  component: React.ReactElement;
  dialogCallback: any;
  dialogTitle: string;
}
export interface InputState {
  searchPhrase: string;
  responseText: any;
  isLoading: boolean;
  messages: kanbanMessage[];
}
export interface moveState {
  error: any;
  isLoading: boolean;
}
export interface fetchedReelsState {
  reelsInKanban: BT.SlotReel[];
  isLoading: boolean;
  error: any;
  messages: kanbanMessage[];
}
export interface RootState {
  kanban: KanbanState;
  dialog: dialogState;
  reels: fetchedReelsState;
  slots: SlotsState;
  input: InputState;
  filesBuffer: FilesBuffer;
}
export interface FilesBuffer {
  files:File[]
}

export enum Constants {
  GET_KANBAN_DATA = "GET_KANBAN_DATA",
  GET_ALL_SLOTS_DATA = "GET_ALL_SLOTS_DATA",
  GET_SLOT_DATA = "GET_SLOT_DATA",
  SET_LOADING = "SET_LOADING",
}
export enum KanbanDetailsActions {
  FETCH_KANBAN_DATA_STARTED = "FETCH_KANBAN_DATA_STARTED",
  FETCH_KANBAN_DATA_SUCCESS = "FETCH_KANBAN_DATA_SUCCESS",
  FETCH_KANBAN_DATA_ERROR = "FETCH_KANBAN_DATA_ERROR",
}

export enum SlotsDetailsActions {
  FETCH_SLOTS_DATA_STARTED = "FETCH_SLOTS_DATA_STARTED",
  FETCH_SLOTS_DATA_SUCCESS = "FETCH_SLOTS_DATA_SUCCESS",
  FETCH_SLOTS_DATA_ERROR = "FETCH_SLOTS_DATA_ERROR",
}
export enum SlotDetailsActions {
  FETCH_SLOT_DATA_STARTED = "FETCH_SLOTS_DATA_STARTED",
  FETCH_SLOT_DATA_SUCCESS = "FETCH_SLOTS_DATA_SUCCESS",
  FETCH_SLOT_DATA_ERROR = "FETCH_SLOTS_DATA_ERROR",
}

export enum SlotDialogActions {
  DIALOG_OPEN = "DIALOG_OPEN",
  DIALOG_CLOSE = "DIALOG_CLOSE",
  DIALOG_SET_CALLBACK_FCN = "DIALOG_SET_CALLBACK_FCN",
}
export enum SearchTextActions {
  TEXT_CHANGE = "TEXT_CHANGE",
  TEXT_ENTER = "TEXT_ENTER",
  REEL_INFO_FETCHED = "REEL_INFO_FETCHED",
  TEXT_SEARCH_ERROR = "TEXT_SEARCH_ERROR",
}
export enum ReelActions {
  REEL_PUT_ON = "TEXT_CHANGE",
  REEL_TAKE_OUT = "TEXT_ENTER",
  REEL_CONSUME = "REEL_CONSUME",
}
export enum SlotPutActions {
  SLOT_PUT_SUCCESS = "SLOT_PUT_SUCCESS",
  SLOT_PUT_START = "SLOT_PUT_START",
  SLOT_PUT_ERROR = "SLOT_PUT_ERROR",
}
export enum SlotMoveActions {
  SLOT_MOVE_SUCCESS = "SLOT_MOVE_SUCCESS",
  SLOT_MOVE_START = "SLOT_MOVE_START",
  SLOT_MOVE_ERROR = "SLOT_MOVE_ERROR",
}
export enum FetchReelActions {
  FETCH_REELS_SUCCESS = "FETCH_REELS_SUCCESS",
  FETCH_REELS_START = "FETCH_REELS_START",
  FETCH_REELS_ERROR = "FETCH_REELS_ERROR",
}
export enum KanbanPutActions {
  KANBAN_PUT_SUCCESS = "KANBAN_PUT_SUCCESS",
  KANBAN_PUT_START = "KANBAN_PUT_START",
  KANBAN_PUT_ERROR = "KANBAN_PUT_ERROR",
}
export enum KanbanPostActions {
  KANBAN_POST_SUCCESS = "KANBAN_POST_SUCCESS",
  KANBAN_POST_START = "KANBAN_POST_START",
  KANBAN_POST_ERROR = "KANBAN_POST_ERROR",
}
export enum FilesUploadActions {
  FILES_UPLOAD_ERROR = "FILES_UPLOAD_ERROR",
  FILES_UPLOAD_SUCCESS = "FILES_UPLOAD_SUCCESS",
  FILES_UPLOAD_START = "FILES_UPLOAD_START",
}
export enum StaticReportActions {
  FETCH_WHSTOCK_ERROR = "FETCH_WHSTOCK_ERROR",
  FETCH_WHSTOCK_SUCCESS = "FETCH_WHSTOCK_SUCCESS",
  FETCH_WHSTOCK_START = "FETCH_WHSTOCK_START",
}

export enum HighlightSlotsActions {
  SET_HIGHLIGHTED_SLOTS = "SET_HIGHLIGHTED_SLOTS",
}
