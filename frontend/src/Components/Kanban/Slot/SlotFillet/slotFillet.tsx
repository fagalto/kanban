import * as BT from "../../../../Backend/types";
import CSS from "csstype";

interface filledSlot extends BT.Slot {
  balance:number
}

const SlotFillet = (slot: filledSlot) => {
  const req_capacity = typeof slot.req_capacity === "number" ? slot.req_capacity : 0;
  const slotPercentFill =
    typeof slot.balance === "number" && req_capacity > 0 ? (100 * slot.balance) / req_capacity : 0;
  const slotFillColor: string = slotPercentFill > 80 ? "rgb(113, 183, 67)" : "rgb(255, 153, 0)";
  const slotBackgroundFillet: CSS.Properties = {
    backgroundColor:
      slot.itemid != undefined && slot.itemid.length > 2 && slot.balance == 0 ? "#F5447D" : "",
  };
  let fillet: CSS.Properties = {
    height: slotPercentFill + "%",
    backgroundColor: slotFillColor,
  };
  if (
    ((typeof slot.balance !== "number" && slot.balance !== undefined) ||
      (typeof slot.req_capacity !== "number" && slot.req_capacity != undefined)) &&
    Object.keys(slot).length > 2
  ) {
    fillet = { height: "25%", backgroundColor: "#DC3232" };
  }
  return (
    <div className="slotFillet" style={slotBackgroundFillet}>
      <div className="slotFillLevel" style={fillet}>{slot.balance>req_capacity?"+":"" }</div>
    </div>
  );
};
export default SlotFillet;
