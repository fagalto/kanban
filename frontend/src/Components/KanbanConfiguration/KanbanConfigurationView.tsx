import { slotData } from "../../Interfaces/interfaces";
import React from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";

interface configurationView extends ReduxType {
  mode: "edit" | "add";
}

const KanbanConfigurationView: React.FC<configurationView> = function (props) {
  const [value, setValue] = useState({
    kanban_id: props.kanbanDetails.kanban_id,
    rows: `${props.kanbanDetails.slot_y}`,
    name: props.kanbanDetails.name,
    columns: `${props.kanbanDetails.slot_x}`,
    count: 0,
    buttonDisabled: true,
  });
  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (Object.keys(value).includes(event.target.id)) {
      setValue({
        ...value,
        [event.target.id]: event.target.value,
        count: value.count + 1,
        buttonDisabled: false,
      });
    }
  };

  const buttonSaveClickHandle = () => {
    console.log("mode:", props.mode);
    const record = {
      name: value.name,
      kanban_id: value.kanban_id,
      date: new Date(Date.now()).toLocaleString(),
      rows: Number.parseInt(value.rows),
      columns: Number.parseInt(value.columns),
    };
    const id = typeof value.kanban_id == "number" ? value.kanban_id : 0; //??
    console.log(record)
    switch (props.mode) {
      case "edit":  props.putKanbanData(record, id); break;
      case "add": props.postKanbanData(record); break;
      default: break;
    }
    const callback = () => {
      props.fetchKanData(props.kanbanDetails.kanban_id);
      props.fetchAllSlotsData(props.kanbanDetails.kanban_id);
    };
    props.dialogSetCallback(callback);
  };
  type kanbanFieldDetails = {
    displayName: string;
    defaultValue: string | number;
    fieldType: string;
    keyName: string;
  };
  const kanbanFields: kanbanFieldDetails[] = [];
  kanbanFields.push({
    displayName: "Nazwa",
    defaultValue: value.name,
    fieldType: "text",
    keyName: "name",
  });
  kanbanFields.push({
    displayName: "Ilość wierszy",
    defaultValue: value.rows,
    fieldType: "number",
    keyName: "rows",
  });
  kanbanFields.push({
    displayName: "Ilosć kolumn",
    defaultValue: value.columns,
    fieldType: "number",
    keyName: "columns",
  });

  const form = kanbanFields.map((field: kanbanFieldDetails, index) => {
    return (
      <TextField
        size="small"
        variant="outlined"
        margin="dense"
        label={field.displayName}
        defaultValue={field.defaultValue}
        onChange={changeHandle}
        // onKeyUp={searchHandle}
        type={field.fieldType}
        id={`${field.keyName}`}
        key={index}
      />
    );
  });

  return (
    <div>
      <Stack spacing={2}>
        {form}
        <Button variant="contained" disabled={value.buttonDisabled} onClick={buttonSaveClickHandle}>
          Zapisz
        </Button>
      </Stack>
    </div>
  );
};
export default connectToStore(KanbanConfigurationView);
