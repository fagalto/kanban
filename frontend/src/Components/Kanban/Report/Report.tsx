import { useEffect } from "react";
import { connectToStore, ReduxType } from "../../../Store/store";
import DataTable from "../DataTable/DataTable";

const Report = (props: ReduxType) => {
  useEffect(() => {
    props.whStock.length === 0 && props.fetchWhStock();
  }, []);
  console.log(props.whStock);

  let report: any[] = [];
  props.whStock.forEach((elem) => {
    const slot = props.slotData.slotData.find((slot) => slot.itemid == elem.ITEMID);

    if (slot) {
      const reels = props.reels.reelsInKanban.filter((elem) => elem.slot_id == slot.slot_id).length;
      slot.req_capacity - reels > 0 &&
        report.push({
          Itemid: elem.ITEMID,
          brak: slot.req_capacity - reels,
          "Stan na Magazynie 20": Math.round(elem["Fizycznie dostępne"]),
        });
    }
  });
  const tableProps = {
    rows: report,
    columnOrder: [],
  };
  return props.whStock.length == 0 ? <div>Report null</div> : <div>{DataTable(tableProps)}</div>;
};

export default connectToStore(Report);
