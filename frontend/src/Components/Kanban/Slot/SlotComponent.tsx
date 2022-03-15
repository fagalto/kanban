import { useMemo } from "react";

import { slotData } from "../../../Interfaces/interfaces";
import Slot from "./Slot";
import Drop from "../../Drop/drop";
import Drag, { dragElemInterface } from "../../Drag/drag";
import { AllowedTypes } from "./ItemTypes";
import { connectToStore, ReduxType } from "../../../Store/store";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 1,
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: 60,
}));

export interface DropResult extends ReduxType {
  slot: slotData;
  slotCoord: string;
}

const SlotComponent = (props: DropResult) => {
  const details: slotData = props.slot;

  const slotCoord = { slotCoord: props.slotCoord };

  const dropData = {
    elem: <Slot {...slotCoord} />,
    dropId: details?.slot_id,
    allowedTypes: AllowedTypes.SLOT,
    slot: details,
  };

  const dragProps: dragElemInterface = {
    allowedTypes: AllowedTypes.SLOT,
    dropFunction: props.moveSlot,
    kanbanId: props.kanbanDetails.kanban_id,
    dragId: details?.slot_id,
    draggedElem: Drop(dropData),
    slot: details,
  };
  // console.log("dropdata:,", dropData.slot)
  //console.log("dragdata:,", dragProps.slot);
  //const memoizedDrag = useMemo(() => Drag(dragProps), [dragProps]);
  return (
    <Grid item xs={1}>
      <Item>{Drag(dragProps)}</Item>
    </Grid>
  );
};
export default connectToStore(SlotComponent);
