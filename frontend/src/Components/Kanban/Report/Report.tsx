import { useEffect, useState } from "react";
import { connectToStore, ReduxType } from "../../../Store/store";
import DataTable from "./StaticRows";

const Report = (props: ReduxType) => {
  console.log(props);
  useEffect(() => {
    const getStatics = () => {
      props.fetchStatics(props.kanbanDetails.kanban_id);
    };

    props.slotStatic.length == 0 && props.fetchStatics(props.kanbanDetails.kanban_id);
  }, []);

  return props.slotStatic.length == 0 ? (
    <div>Report null</div>
  ) : (
    <div>{DataTable(props.slotStatic)}</div>
  );
};

export default connectToStore(Report);
