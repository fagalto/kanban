import { coordinates, kanBan, slotData } from "../../Interfaces/interfaces";
import SlotComponent from "./Slot/SlotComponent";
import { connectToStore, ReduxType, mapSlotsToProps } from "../../Store/store";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const KanBanSlots = function (props: ReduxType) {
  const slotValues = props.slotData !==null? Object.values(props.slotData):[]
  let kanbanRows = [];
  let kanbanCols = [];
  const kanban = props.kanbanDetails;

  const areRowsNotEmpty =
    kanban.slot_y > 0 &&
    kanban.slot_x > 0 &&
    kanban.slot_y != undefined &&
    kanban.slot_x != undefined;
  if (areRowsNotEmpty) {
  
    for (let i = 1; i <= kanban.slot_x; i++) {
      kanbanCols.push(
        <Grid item xs={1} key={i}>
          <Item>{i}</Item>
        </Grid>
      );
    }
    kanbanRows.push(kanbanCols);
    kanbanCols = [];
 
    for (let j = 1; j <= kanban.slot_y; j++) {
      for (let i = 1; i <= kanban.slot_x; i++) {
        
        const slot = {
          slot: props.slotData.find((slot) => slot.slot_coord == `${i},${j}`),
          slotCoord:`${i},${j}`
        };
        const slotComponentt = <SlotComponent {...slot} key={`key${i},${j},${slot.slot?.itemid}`} />;

        kanbanCols.push(slotComponentt);
      }
      kanbanRows.push(kanbanCols);
      kanbanCols = [];
    }
  }
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <div
        style={{
          maxHeight: "56vh",
          width: "calc(100% + 17px)",
          overflowY: "scroll",
          paddingRight: "17px",
          paddingBottom: "5px",
          boxSizing: "content-box",
        }}>
        <Grid container rowSpacing={1} direction="row" columns={kanban.slot_x} columnSpacing={0}>
          {kanbanRows}
        </Grid>
      </div>
    </div>
  );
};
export default connectToStore(KanBanSlots);
