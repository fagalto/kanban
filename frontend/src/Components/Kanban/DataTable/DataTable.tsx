import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Header from "../DataTable/Header/Header";
import ReportRow from "../DataTable/Rows/LackReportRow";


export type tableProps = {
  rows: any;
  columnOrder: any[];
};

export default function DataTable(props: tableProps) {
  const { rows, columnOrder } = props;
  const headerProps = {
    columns: rows.length > 0 ? Object.keys(rows[0]) : ["brak danych"],
    columnOrder: columnOrder
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 450 }} size="small" aria-label="a dense table">
        <Header {...headerProps} />
        <ReportRow {...props} />
      </Table>
    </TableContainer>
  );
}
