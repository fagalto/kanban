import React from "react";
import XLSX from "xlsx";

interface itemList {
  file: XLSX.WorkBook;
}

const ItemList = (props: itemList) => {
  const file = props.file;
  console.log("file:",file)
  const sheetName = file.SheetNames[0];
  const workSheet = file.Sheets[sheetName];
  const sheets = file.SheetNames.map(sheet => {
    const data = XLSX.utils.sheet_to_json(file.Sheets[sheet], { header: 3 });
    console.log("sheetData:",data)
  })
  /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(workSheet, {header:3} );
 


  return <div></div>;
};
export default ItemList;
