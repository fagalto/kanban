import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import * as BT from "../../../../Backend/types";
import Rows from "./Rows";

type rowProps = {
  rows: BT.LackReport[];
  columnOrder: string[];
};

const ReportRow = (props: rowProps) => {
  const rows = props.rows.map((elem:BT.LackReport, rowIndex) => {
    const cells = Object.values(elem).map((cell, cellIndex) => (
      <TableCell align="right" key={cellIndex}>
        {cell}
      </TableCell>
    ));
    

    return <TableRow key={rowIndex}>{cells}</TableRow>;
  });

  return <Rows rows={rows} />;
};

export default ReportRow;
