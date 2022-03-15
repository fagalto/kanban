import * as React from "react";
import Stack from "@mui/material/Stack";
import Message from "./Message"

import { connectToStore, ReduxType } from "../../Store/store";
import { kanbanMessage } from "../../Store/types";

const MessagesComponent: React.FC<ReduxType> = function (props) {
 
  const ret = props.messages.map((message: kanbanMessage, index) => {
    return (
        <Message {...message} key={index}/>
    );
  });
  return <Stack>{ret}</Stack>;
};
export default connectToStore(MessagesComponent);
