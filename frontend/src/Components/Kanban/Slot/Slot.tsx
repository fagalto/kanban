import { useEffect } from "react";

import { slotData } from "../../../Interfaces/interfaces";
import SlotFillet from "./SlotFillet/slotFillet";
import React from "react";
import SlotDialogComponent from "./SlotDialog/SlotDialogComponent";
import { connectToStore, ReduxType } from "../../../Store/store";
import Button from "@mui/material/Button";

interface slot extends ReduxType  {
  slotCoord: string;
}

const Slot = (props: slot) => {

  const details = props.slotData.find((slot) => slot.slot_coord === props.slotCoord);
  
 
  const level = details?.balance != undefined && details.balance > 0 ? details.balance : null;



    useEffect(() => {
      const createEmptySlot = () => {
          const record = {
            itemid: null,
            req_capacity: null,
            slot_coord: props.slotCoord,
            kanban_id: props.kanbanDetails.kanban_id,
          }; 
        props.postSlotData(record);
      };

      details?.slot_id === undefined && createEmptySlot();
    }, []);

  const clickHandle = (event: React.MouseEvent<HTMLDivElement>) => {
    const coords = `${event.pageX},${event.pageY}`;
    const elem = <SlotDialogComponent {...details} />;

    props.openSlotDialog(coords, elem, `Parametry Slotu ${details?.slot_id}`);
    return true;
  };
  //console.log("rendering slot", props.slotDetails.slot_coord)
  return (
    <div className="slot" onClick={clickHandle}>
      <SlotFillet {...details} />
      <div className="slotData">
        <div className="slot_ax">{details?.itemid}</div>
        <div className="slot_fill">{level}</div>
      </div>
    </div>
  );
};
export default connectToStore(Slot);
