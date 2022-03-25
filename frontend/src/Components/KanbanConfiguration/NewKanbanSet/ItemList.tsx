import React from "react";
import XLSX from "xlsx";


  export type kanbanSetFile = {
    ax_id: string;
    axName: string;
    reelVol: number;
    quantity: number
    quantity2: number
  };
const ItemList = (file: XLSX.WorkBook | null) => {
    let kanbanSetData: kanbanSetFile[] = [];
  if (file == null) {
    return kanbanSetData;
  }
  const fixedHeader = ["ax_id", "axName", "reelVol", "quantity", "quantity2"];
  //jeśli xls przesyłany z zakupów się zmieni (nazwa arkusza, kolejność kolumn), skrytp będzie wymagał aktualizacji.
  const fixedSheetName = "do wyłożenia";

  const sheets = file.SheetNames.forEach((sheet) => {
    const data =
      sheet == fixedSheetName &&
      XLSX.utils.sheet_to_json<kanbanSetFile>(file.Sheets[sheet], { header: fixedHeader });
    data!==false&&kanbanSetData.push(...data)
  });

  return kanbanSetData;
};
export default ItemList;
