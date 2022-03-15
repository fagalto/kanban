import { isPropertySignature } from "typescript";
import { slotData } from "../../../../Interfaces/interfaces";
import * as React from "react";
import SlotDetailView from "./slotDetailView";
import ReelsInSlot from "./reelsInSlot"
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";


import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
 

const SlotDialogComponent: React.FC<slotData> = function (props) {
 
  const slotDetails = { slotDetails: props };
  const slotid = { slot_id: props.slot_id};
  return (
    <div>
      <Stack spacing={1}>
        <SlotDetailView {...slotDetails} />
        <Divider />

        <DialogTitle>Szpule w Slocie</DialogTitle>
        <ReelsInSlot {...slotid} />
        <Divider />
      </Stack>
    </div>
  );
};
export default SlotDialogComponent;
