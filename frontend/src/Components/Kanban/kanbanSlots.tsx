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
  let kanbanRows = [];
  const kanban = props.kanbanDetails;

  const rows = Array.from({ length: kanban.slot_y }, (v, k) => k + 1);
  const cols = Array.from({ length: kanban.slot_x }, (v, k) => k + 1);

  const header = cols.map((column, i) => (
    <Grid item xs={1} key={i}>
      <Item>{column}</Item>
    </Grid>
  ));
  kanbanRows.push(header);

  const body = rows.map((row) => {
    const rows = cols.map((column) => {
      const slot = {
        slot: props.slotData.find((slot) => slot.slot_coord === `${column},${row}`),
        slotCoord: `${column},${row}`,
      };
      return <SlotComponent {...slot} key={`key${column},${row},${slot.slot?.itemid}`} />;
    })
    return rows
  })
  
  kanbanRows.push(body)

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
