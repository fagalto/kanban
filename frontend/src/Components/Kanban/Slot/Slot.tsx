import { useEffect, useState } from "react";

import SlotFillet from "./SlotFillet/slotFillet";
import React from "react";
import SlotDialogComponent from "./SlotDialog/SlotDialogComponent";
import { connectToStore, ReduxType, mapKanbanToProps } from "../../../Store/store";
import * as BT from "../../../Backend/types";

import EmptySlot from "./EmptySlot";

interface slot extends ReduxType {
  slot: BT.Slot;
  slotCoord: string;
}

const Slot = (props: slot) => {
  const details = props.slot
  const level = props.reels.reelsInKanban.filter(
    (elem) => elem.slot_id === details?.slot_id
  ).length;

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

    details?.slot_id == undefined && createEmptySlot();
  }, [props.slot]);

  //console.log("rendering slot", props.slotDetails.slot_coord)
  const slotDetailsWithBalance = {
    ...details,
    balance: level,
  };
  const clickHandle = (event: React.MouseEvent<HTMLDivElement>) => {
    const coords = `${event.pageX},${event.pageY}`;
    const elem = <SlotDialogComponent {...slotDetailsWithBalance} />;

    props.openSlotDialog(coords, elem, `Parametry Slotu ${details?.slot_id}`);
  };

  const isHighlighted =
    details !== undefined ? props.slotData.highlightedSlots.includes(details.slot_id) : false;

  const className = isHighlighted ? "slot slotHighlighted" : "slot";

  return details == undefined ? (
    <EmptySlot />
  ) : (
    <div className={className} onClick={clickHandle}>
      <SlotFillet {...details} balance={level} />
      <div className="slotData">
        <div className="slot_ax">{details?.itemid}</div>
        <div className="slot_fill">{level == 0 ? "" : level}</div>
      </div>
    </div>
  );
};
export default connectToStore(Slot);
