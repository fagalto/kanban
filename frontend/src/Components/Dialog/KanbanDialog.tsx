import React from "react";

import { connectToStore, ReduxType } from "../../Store/store";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import Button from "@mui/material/Button";
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
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
    <Dialog open={props.dialog.dialogOpen} scroll="paper">
      <BootstrapDialogTitle onClose={handleClick}>{props.dialog.dialogTitle}</BootstrapDialogTitle>
      <DialogContent>{props.dialog.component}</DialogContent>
    </Dialog>
  );
};

export default connectToStore(KanBanDialog);
