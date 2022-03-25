import { slotData } from "../../../../Interfaces/interfaces";
import React from "react";
import { connectToStore, ReduxType } from "../../../../Store/store";
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import * as BT from "../../../../Backend/types";

interface slot extends ReduxType {
  slotDetails: BT.Slot;
}

const SlotDetailView: React.FC<slot> = function (props) {
  const level = props.reels.reelsInKanban.filter(
    (elem) => elem.slot_id === props.slotDetails?.slot_id
  ).length;

  const [value, setValue] = useState({
    ...props.slotDetails,
    count: 0,
    buttonDisabled: true,
    inputValidationError: false,
    inputValidationHelperText: " ",
  });
  let inputError = false;
  let errorText = " ";
  let disabled = false;
  const inputItem = (event: ChangeEvent<HTMLInputElement>) => {
    if (Object.keys(props.slotDetails).includes(event.target.id)) {
      //console.log (event.target.id)
      const regex = new RegExp("[^0-9]+");
      const val = event.target.value;

      if (event.target.id == "req_capacity") {
        const val2 = event.target.valueAsNumber;
        if (regex.test(val)) {
          inputError = true;
          errorText = "Wpisz liczbę";
          disabled = true;
        }
        setValue({
          ...value,
          [event.target.id]: val2,
          count: value.count + 1,
          buttonDisabled: disabled,
          inputValidationError: inputError,
          inputValidationHelperText: errorText,
        });
      } else {
        setValue({
          ...value,
          [event.target.id]: val,
          count: value.count + 1,
          buttonDisabled: disabled,
          inputValidationHelperText: " ",
        });
      }
    }
  };

  const searchHandle = (event: KeyboardEvent) => {
    const record:BT.Slot = {
      slot_id: value.slot_id,
      itemid: value.itemid,
      req_capacity: value.req_capacity,
      slot_coord: value.slot_coord,
      kanban_id: props.kanbanDetails.kanban_id,
      do_not_refill: false,
      notes:""
    };
    const id = typeof value.slot_id == "number" ? value.slot_id : 0


    event.key === "Enter" && props.putSlotData(record, id) 
  }
  const buttonClickHandle = () => {
    const record: BT.Slot = {
      slot_id: value.slot_id,
      itemid: value.itemid,
      req_capacity: value.req_capacity,
      slot_coord: value.slot_coord,
      kanban_id: props.kanbanDetails.kanban_id,
      do_not_refill: false,
      notes: "",
    };
    const id = typeof value.slot_id == "number" ? value.slot_id : 0; //??
    props.putSlotData(record, id);
    const callback = () => {
      props.fetchAllSlotsData(props.kanbanDetails.kanban_id);
    };
    props.dialogSetCallback(callback);
  };

  const capactityLabel =
    props.slotDetails.req_capacity != null
      ? `Maksymalna ilość, Bieżąca ${level}`
      : `Maksymalna ilość`;

  return (
    <div>
      <Stack spacing={1}>
        <TextField
          size="small"
          variant="outlined"
          margin="dense"
          autoComplete="off"
          label="Indeks AX"
          defaultValue={props.slotDetails.itemid}
          onChange={inputItem}
          // onKeyUp={searchHandle}
          id="itemid"
        />
        <TextField
          error={value.inputValidationError}
          helperText={value.inputValidationHelperText}
          size="small"
          variant="outlined"
          margin="dense"
          autoComplete="off"
          label={capactityLabel}
          defaultValue={props.slotDetails.req_capacity}
          onChange={inputItem}
          type="number"
          // onKeyUp={searchHandle}
          id="req_capacity"
        />
      </Stack>
      <Button variant="contained" disabled={value.buttonDisabled} onClick={buttonClickHandle}>
        Zapisz
      </Button>
    </div>
  );
};
export default connectToStore(SlotDetailView);
