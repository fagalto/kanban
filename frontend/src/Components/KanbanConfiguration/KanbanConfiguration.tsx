import * as React from "react";
import { useRef, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { connectToStore, ReduxType } from "../../Store/store";
import KanbanConfigurationView from "./KanbanConfigurationView";
import UploadFileForm from "./FileForm";
import NewKanbanSet from "./NewKanbanSet/NewSetView";
import KanbanReportView from "../../Components/Kanban/Report/Report";

const KanbanConfiguration: React.FC<ReduxType> = function (props) {
  const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const coords = `${event.clientX},${event.clientY}`;
    const mode = { mode: "edit" };
    const elem = <KanbanConfigurationView {...mode} />;

    props.dialog.dialogOpen
      ? props.closeSlotDialog()
      : props.openSlotDialog(coords, elem, `Konfiguracja kanbana ${props.kanbanDetails.name}`);
  };
  const deleteHandle = () => {
    return false;
  };
  const showReport = () => {
    const coords = ",";
    const mode = { mode: "add" };
    const elem = <KanbanReportView  />;

    props.dialog.dialogOpen
      ? props.closeSlotDialog()
      : props.openSlotDialog(coords, elem, `Komponenty do uzupełnienia`);
  };
  const addKanbanHandle = () => {
    const coords = ",";
    const mode = { mode: "add" };
    const elem = <KanbanConfigurationView {...mode} />;

    props.dialog.dialogOpen
      ? props.closeSlotDialog()
      : props.openSlotDialog(coords, elem, `Dodawanie nowego kanbana`);
  };

  const filesUploadedAction = (files: File[]) => {
    props.filesUploaded(files);
  };

  return (
    // <Button variant="outlined" onClick={deleteHandle} startIcon={<DeleteIcon />}></Button>
    <>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={clickHandle} startIcon={<EditIcon />}></Button>

        <Button variant="outlined" onClick={addKanbanHandle} startIcon={<AddIcon />}></Button>

        <UploadFileForm uploadFileAction={filesUploadedAction} />
        <Button variant="outlined" onClick={showReport} startIcon={<ListAltIcon />}></Button>
      </Stack>
      <NewKanbanSet />
    </>
  );
};
export default connectToStore(KanbanConfiguration);
