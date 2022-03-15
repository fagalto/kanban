import React from "react";
import { mapFilesToProps, connectToStore, ReduxType } from "../../../Store/store";

import XLSX from "xlsx";

import ItemList from "./ItemList";
import NewSetActions from "./NewSetActions";

const kanbanProposedItemsView = (props: ReduxType) => {
  const file =
    props.filesBuffer.files.length > 0
      ? XLSX.read(props.filesBuffer.files[0].name, { type: "binary" })
      : null;

  return file !=null ? (
    <div>
      <ItemList file={file}/>
      <NewSetActions />
    </div>
  ) : null;
};
export default connectToStore(kanbanProposedItemsView, mapFilesToProps);
