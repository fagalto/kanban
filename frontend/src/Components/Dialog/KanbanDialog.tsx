import React from "react";

import { connectToStore, ReduxType } from "../../Store/store";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import IconButton from "@mui/material/IconButton";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => any;
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle id="draggable-dialog-title" sx={{ m: 0, p: 2, cursor: "move" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "relative",
            right: 0,
            marginRight: 0,
            display: "inline",
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const KanBanDialog: React.FC<ReduxType> = function (props) {
  const handleClick = () => {
    props.closeSlotDialog();
    props.dialog.dialogCallback != null && props.dialog.dialogCallback();
  };
  return (
    <Dialog
      open={props.dialog.dialogOpen}
      scroll="paper"
      maxWidth={false}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title">
      <BootstrapDialogTitle onClose={handleClick}>{props.dialog.dialogTitle}</BootstrapDialogTitle>
      <DialogContent>{props.dialog.component}</DialogContent>
    </Dialog>
  );
};

export default connectToStore(KanBanDialog);
