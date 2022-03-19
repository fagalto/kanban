import { ChangeEvent, useState, KeyboardEvent } from "react";
import { connectToStore, ReduxType, mapInputToProps } from "../../Store/store";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { kanbanMessage } from "../../Store/types";

const KanbanInputComponent = (props: ReduxType) => {
  const initmsg: kanbanMessage = {
    messageSeverity: "info",
    messageText: "",
    arrivalTime: 0
  };

  const lastMessage = props.messages.slice().pop();

  let message = lastMessage !== undefined ? (lastMessage as kanbanMessage) : initmsg;
  const error = message.messageSeverity === "error" ? true : false;

  const [value, setValue] = useState({
    text: "",
    color: message.messageSeverity,
    helperText: message.messageText,
    error: error,
  });

  const inputItem = (event: ChangeEvent<HTMLInputElement>) => {
    ///props.inputText(event.target.value);
    setValue({
      text: event.target.value,
      color: message.messageSeverity,
      helperText: message.messageText,
      error: false,
    });
  };
  const searchHandle = (event: KeyboardEvent) => {
    //console.log(event.key)
    event.key === "Enter" &&
      props.searchText(value.text, props.kanbanDetails.kanban_id, props.worker_no);
  };
  return (
    <div>
      <TextField
        autoFocus
        error={error}
        color={message.messageSeverity}
        fullWidth
        variant="outlined"
        label="Podaj Reel Id"
        onChange={inputItem}
        onKeyUp={searchHandle}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CropFreeIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
export default connectToStore(KanbanInputComponent, mapInputToProps);
