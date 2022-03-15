import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { connectToStore, ReduxType } from "../../Store/store";
import { kanbanMessage, severity, KanbanState } from "../../Store/types";


const MessageComponent: React.FC<kanbanMessage> = function (props) {
  const [value, setValue] = React.useState(true);

  const handleClose = (

  ) => {
    setValue(false);
  };
  // React.useEffect(() => { last?.messageText != value.message.text ? setValue({ ...value, open: true, message: { text: "agra" } }):(console.log("doin nothin"))},[])

    return (
      <Snackbar
        open={value}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical:"top", horizontal: "center" }}
      >
        <Alert severity={props.messageSeverity}>
          Message: {props.messageText}
        </Alert>
      </Snackbar>
    );
 
};
export default connectToStore(MessageComponent);
