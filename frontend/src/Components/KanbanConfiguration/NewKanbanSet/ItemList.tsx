import React from "react";
import XLSX from "xlsx";

interface itemList {
  file: XLSX.WorkBook;
}

const ItemList = (props: itemList) => {
  const file = props.file;
    const sheetName = file.SheetNames[0];
    console.log("sheetNames:", file.SheetNames);
     console.log("sheets:", file.Sheets);
  const workSheet = file.Sheets[sheetName];
  /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(workSheet, {header:3} );
 
    console.log("worksheet: ",data)

  return <div></div>;
};
export default ItemList;
