import {
  KanbanActions,
  KanbanDetailsActions as a,
  KanbanPutActions as kp,
  KanbanPostActions,
  SlotsDetailsActions as sl,
  SlotPutActions as sp,
  SlotDialogActions as sd,
  SlotMoveActions as sm,
  SearchTextActions,
  FilesUploadActions,
  FetchReelActions as fr,
  StaticReportActions as sr,
  KanbanState,
  dialogState,
  InputState,
  RootState,
  SlotsState,
  moveState,
  fetchedReelsState,
  kanbanMessage,
  FilesBuffer,
  severity,
} from "./types";

import * as BT from "../Backend/types";

const initialKanban: BT.Kanban = {
  kanban_id: 83,
  slot_y: 5,
  slot_x: 5,
  name: "",
  notes: "", 
  active:true
};
const init: KanbanState = {
  isLoading: false,
  kanbanDetails: initialKanban,
  error: null,
  data: {},
  messages: [],
  worker_no: "52",
};

const initDialog: dialogState = {
  dialogOpen: false,
  dialogData: null,
  dialogXY: "50,50",
  component: <div></div>,
  dialogCallback: null,
  dialogTitle: "Dialog Title",
};
const inputInit: InputState = {
  searchPhrase: "",
  responseText: "",
  isLoading: false,
  messages: [],
};
const slotsInitState: SlotsState = {
  slotData: [],
  isLoading: false,
  error: null,
  messages: [],
  slotsFetched: false,
  whStock: [],
};
const fetchedReelsInit: fetchedReelsState = {
  reelsInKanban: [],
  isLoading: false,
  error: null,
  messages: [],
};

const messageComposer = (text: string, severity: severity, messages: kanbanMessage[]) => {
  const newMessage: kanbanMessage = {
    messageText: text,
    messageSeverity: severity,
    arrivalTime: Date.now(),
  };
  const msg = messages.slice();
  msg.push(newMessage);
  return msg;
};

export const kanbanReducer = (state: KanbanState = init, action: KanbanActions): KanbanState => {
  //console.log("got action:",action)
  switch (action.type) {
    case a.FETCH_KANBAN_DATA_STARTED:
      return {
        ...state,
        kanbanDetails: initialKanban,
        isLoading: true,
        error: null,
      };
    case a.FETCH_KANBAN_DATA_SUCCESS:
      return {
        ...state,
        kanbanDetails: action.payload,

        isLoading: false,
        error: null,
      };
    case a.FETCH_KANBAN_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        messages: messageComposer(action.type, "error", state.messages),
      };

    case kp.KANBAN_PUT_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case kp.KANBAN_PUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        messages: messageComposer(action.type, "success", state.messages),
        error: null,
      };
    }
    case kp.KANBAN_PUT_ERROR: {
      return {
        ...state,
        isLoading: false,
        messages: messageComposer(action.type, "error", state.messages),
        error: null,
      };
    }
    case KanbanPostActions.KANBAN_POST_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case KanbanPostActions.KANBAN_POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        messages: messageComposer(action.type, "success", state.messages),
        error: null,
      };
    }
    case KanbanPostActions.KANBAN_POST_ERROR: {
      return {
        ...state,
        isLoading: false,
        messages: messageComposer(action.type, "error", state.messages),
        error: null,
      };
    }
    default:
      return state;
  }
};

export const inputReducer = (state: InputState = inputInit, action: KanbanActions): InputState => {
  switch (action.type) {
    case SearchTextActions.TEXT_CHANGE:
      return { ...state, isLoading: false };
    case SearchTextActions.TEXT_ENTER:
      return { ...state, isLoading: true };
    case SearchTextActions.REEL_INFO_FETCHED:
      return {
        ...state,
        isLoading: false,
        messages: messageComposer(action.payload.data, "success", state.messages),
      };
    case SearchTextActions.TEXT_SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        messages: messageComposer(action.payload.error, "error", state.messages),
      };
    default:
      return state;
  }
};
export const slotsReducer = (
  state: SlotsState = slotsInitState,
  action: KanbanActions
): SlotsState => {
  switch (action.type) {
    case sl.FETCH_SLOTS_DATA_STARTED:
      return { ...state, isLoading: true, error: null };
    case sl.FETCH_SLOTS_DATA_SUCCESS:
      return {
        ...state,
        slotData: action.payload.slotData,
        isLoading: false,
        error: null,
        slotsFetched: true,
      };
    case sl.FETCH_SLOTS_DATA_ERROR:
      return { ...state, isLoading: false, error: action.payload.error, slotsFetched: false };
    case sp.SLOT_PUT_START:
      return { ...state, isLoading: true, error: null };

    case sp.SLOT_PUT_SUCCESS:
      return { ...state, isLoading: false, error: null };

    case sp.SLOT_PUT_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };

    case sm.SLOT_MOVE_START:
      return { ...state, isLoading: true, error: null };
    case sm.SLOT_MOVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: messageComposer(action.type, "success", state.messages),
      };
    case sm.SLOT_MOVE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        messages: messageComposer(action.type, "error", state.messages),
      };
    case sr.FETCH_WHSTOCK_START:
      return { ...state, isLoading: true, error: null };
    case sr.FETCH_WHSTOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        whStock: action.payload.data,
      };
    case sr.FETCH_WHSTOCK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        messages: messageComposer(action.type, "error", state.messages),
      };
    default:
      return state;
  }
};
export const fetchReelsReducer = (
  state: fetchedReelsState = fetchedReelsInit,
  action: KanbanActions
): fetchedReelsState => {
  switch (action.type) {
    case fr.FETCH_REELS_START:
      return { ...state, isLoading: true, error: null };
    case fr.FETCH_REELS_SUCCESS:
      return {
        ...state,
        reelsInKanban: action.payload.data,
        isLoading: false,
        error: null,
      };
    case fr.FETCH_REELS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const slotDialogReducer = (
  state: dialogState = initDialog,
  action: KanbanActions
): dialogState => {
  // console.log("got action:",action)
  switch (action.type) {
    case sd.DIALOG_OPEN:
      // console.log("got action:", action);
      return {
        ...state,
        dialogOpen: true,
        dialogXY: action.payload.data.coords,
        component: action.payload.data.component,
        dialogTitle: action.payload.data.title,
      };
    case sd.DIALOG_CLOSE:
      return {
        ...state,
        dialogOpen: false,
        dialogCallback: null,
        component: initDialog.component,
      };
    case sd.DIALOG_SET_CALLBACK_FCN:
      return { ...state, dialogCallback: action.payload.callback };
    default:
      return state;
  }
};
export const filesReducer = (
  state: FilesBuffer = { files: [] },
  action: KanbanActions
): FilesBuffer => {
  switch (action.type) {
    case FilesUploadActions.FILES_UPLOAD_ERROR:
      return { ...state };
    case FilesUploadActions.FILES_UPLOAD_START:
      return { ...state };
    case FilesUploadActions.FILES_UPLOAD_SUCCESS:
      console.log("uploaded files:", action.payload.files);
      return {
        files: action.payload.files,
      };
    default:
      return state;
  }
};
