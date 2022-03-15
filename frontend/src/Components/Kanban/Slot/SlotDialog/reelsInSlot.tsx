import * as React from "react";
import { useState, useEffect } from "react";
import { connectToStore, ReduxType, mapReelsToProps } from "../../../../Store/store";

export interface rellsInSlotProperties extends ReduxType {
  slot_id: number;
}
interface reelhistory {
  reelID: number;
  data: string;
  nr_pracownika: string;
}

const ReelsInSlot: React.FC<rellsInSlotProperties> = function (props) {

  useEffect(() => {
    const fetchData = () => {
      props.fetchReelsInSlot(props.slot_id.toString());

    };

    fetchData();
  }, []);

  // const chsld = JSON.parse(props.slotData)
  const reels =
    props.reelIsLoading === true
      ? "Pobieram..."
      : props.reels.reelsInSlot !== null
      ? Object.values(props.reels.reelsInSlot).map((val: any) => {
          val as reelhistory;
          return <div key={`key${val.reelID}`}>{val.reelID}</div>;
        })
      : "pusto";

  return <div>{reels}</div>;
};

export default connectToStore(ReelsInSlot, mapReelsToProps);
