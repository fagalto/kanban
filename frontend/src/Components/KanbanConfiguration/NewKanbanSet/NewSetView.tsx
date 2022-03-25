import React from "react";
import { mapFilesToProps, connectToStore, ReduxType } from "../../../Store/store";

import XLSX from "xlsx";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Typography from "@mui/material/Typography";

import ItemList from "./ItemList";
import { kanbanSetFile } from "./ItemList";
import KANBAN_Slot_Details from "@shared/Slot";
import { highlightSlots } from "../../../Store/actions";
import Box from "@mui/material/Box";

const kanbanProposedItemsView = (props: ReduxType) => {
  const file =
    props.filesBuffer.files.length > 0
      ? XLSX.read(props.filesBuffer.files[0], { type: "buffer" })
      : null;
  const addItemToPostList = (item: kanbanSetFile, itemsToAdd: KANBAN_Slot_Details[] = []) => {
    //find first non configured slot and not in buffer an push it to buffer
    const firstFreeSlot = Object.assign(
      {},
      props.slotData.slotData.find(
        (slot) =>
          (slot.itemid == null ||
          slot.itemid=="") &&
            itemsToAdd.find((slotC) => slotC.slot_coord == slot.slot_coord) == undefined)
      
    );
    if (firstFreeSlot != undefined && Number.parseInt(item.ax_id) && firstFreeSlot.kanban_id!=undefined) {
      const quantity = item.quantity | item.quantity2;
      firstFreeSlot.itemid = item.ax_id;
      firstFreeSlot.req_capacity = quantity;
      itemsToAdd.push(firstFreeSlot);
    }
  };
  const addItemToUpdateList = (
    slot: KANBAN_Slot_Details,
    item: kanbanSetFile,
    updateBuffer: KANBAN_Slot_Details[] = []
  ) => {
    const quantity = item.quantity | item.quantity2;
    const updatedSlot = Object.assign({}, slot);
    if (updatedSlot.req_capacity != quantity) {
      updatedSlot.req_capacity = quantity;
      updateBuffer.push(updatedSlot);
    }
  };

  const kan = ItemList(file);
  const slotsToUpdate: KANBAN_Slot_Details[] = [];
  const itemsToAdd: KANBAN_Slot_Details[] = [];
  const itemsToRemove: KANBAN_Slot_Details[] = [];
  kan.forEach((item) => {
    let itemInKanban = props.slotData.slotData.find((slot) => slot.itemid == item.ax_id);
    itemInKanban != undefined
      ? addItemToUpdateList(itemInKanban, item, slotsToUpdate)
      : addItemToPostList(item, itemsToAdd);
  });

  props.slotData.slotData.forEach((slot) => {
    const itemInFile = kan.find((item) => item.ax_id == slot.itemid);
    itemInFile == undefined && slot.itemid != "" && slot.itemid != null && itemsToRemove.push(slot);
  });


  const highlightSlots = (slots: KANBAN_Slot_Details[]) => {
    const slotsToHighlight = slots.map((slot) => slot.slot_id);
    props.highlightSlots(slotsToHighlight);

  };

  const changeSlots = (slots: KANBAN_Slot_Details[]) => {
    slots.forEach(slot => {
      props.putSlotData(slot,slot.slot_id)
    })
    //props.fetchAllSlotsData(props.kanbanDetails.kanban_id)
    props.highlightSlots([]);
  }
  const removeSlots = (slots: KANBAN_Slot_Details[]) => {
    slots.forEach((slot) => {
      slot.itemid = ""
      slot.req_capacity=0
      props.putSlotData(slot, slot.slot_id);
    });

    props.highlightSlots([]);
  };  

  const addSlots = (slots: KANBAN_Slot_Details[]) => {
    slots.forEach((slot) => {
      console.log("adding slot:", slot)
      props.putSlotData(slot, slot.slot_id);
    });
    //props.fetchAllSlotsData(props.kanbanDetails.kanban_id)
    props.highlightSlots([]);
  };
  return file != null ? (
    <Stack spacing={2} direction="column">
      <Box>
        <Typography variant="h6" component="h6">
          Edycja
        </Typography>
        <Button
          variant="outlined"
          onClick={() => highlightSlots(slotsToUpdate)}
          startIcon={<CheckBoxIcon />}>
          Zaznacz
        </Button>
        <Button
          variant="outlined"
          onClick={() => changeSlots(slotsToUpdate)}
          startIcon={<EditIcon />}>
          Zmień
        </Button>
      </Box>
      <Box>
        <Typography variant="h6" component="h6">
          Usuwanie
        </Typography>
        <Button
          variant="outlined"
          onClick={() => highlightSlots(itemsToRemove)}
          startIcon={<CheckBoxIcon />}>
          Zaznacz
        </Button>
        <Button
          variant="outlined"
          onClick={() => removeSlots(itemsToRemove)}
          startIcon={<DeleteIcon />}>
          Usuń
        </Button>
      </Box>
      <Box>
        <Typography variant="h6" component="h6">
          Dodawanie
        </Typography>
        <Button
          variant="outlined"
          onClick={() => highlightSlots(itemsToAdd)}
          startIcon={<CheckBoxIcon />}>
          Zaznacz
        </Button>
        <Button variant="outlined" onClick={() => addSlots(itemsToAdd)} startIcon={<AddIcon />}>
          Dodaj
        </Button>
      </Box>
    </Stack>
  ) : (
    <></>
  );
};
export default connectToStore(kanbanProposedItemsView);
