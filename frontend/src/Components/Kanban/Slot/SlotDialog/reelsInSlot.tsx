import * as React from "react";
import { useState, useEffect } from "react";
import { connectToStore, ReduxType, mapReelsToProps } from "../../../../Store/store";
import { SlotReel } from "../../../../Backend/types";
import { BoxTypeMap } from "@mui/system";

export interface rellsInSlotProperties extends ReduxType {
  slot_id: number;
}

const ReelsInSlot: React.FC<rellsInSlotProperties> = function (props) {

   const reelsInSlot = props.reels.reelsInKanban.filter(
     (elem) => elem.slot_id == props.slot_id
   )

  // const chsld = JSON.parse(props.slotData)
  const reels = reelsInSlot.length > 0
      ? Object.values(reelsInSlot).map((val) => {
          return <div key={`key${val.id}`}>{val.reel_id}</div>;
        })
      : "pusto";

  return <div>{reels}</div>;
};

export default connectToStore(ReelsInSlot, mapReelsToProps);
