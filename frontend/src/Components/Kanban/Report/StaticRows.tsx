import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import * as BT from "../../../Backend/types";

export default function DataTable(statics: BT.SlotStatic[]) {
  const headers = Object.keys(statics[0]);
  console.log("generate statics for:", headers);
  const columns: GridColDef[] = headers.map((headers) => {
    return { field: headers, headerName: headers, sortable:false, disableColumnMenu:true }
  });

  const rows = statics.map((elem, index) => {
    return { ...elem, id: index };
  });

  return (
    <div style={{ height: 400, width: 900 }}>
      <DataGrid rows={rows} columns={columns}   />
    </div>
  );
}
