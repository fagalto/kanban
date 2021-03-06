import * as React from "react";
import { useEffect } from "react";
import { connectToStore, ReduxType } from "../../Store/store";

import KanBanSlots from "./kanbanSlots";
import Dialog from "../Dialog/KanbanDialog";
import KanbanInputComponent from "../InputComponent/KanbanInputComponent";
import KanbanConfiguration from "../KanbanConfiguration/KanbanConfiguration";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MessagesComponent from "../Message/MessagesComponent";
import LoadingComponent from "../Loading/Loading";
import LoadApp from "../Loading/LoadApp/Loading";

interface kanbanProps extends ReduxType {
  kanbanId: number;
}

const KanbanView: React.FC<kanbanProps> = function (props) {
  useEffect(() => {
    const fetchData = () => {
      props.fetchKanData(props.kanbanId);
      props.fetchAllSlotsData(props.kanbanId);
      props.fetchReelsInKanban(props.kanbanId);
      props.fetchWhStock();
    };

    fetchData();
  }, []);
  const width = props.kanbanDetails.slot_x * 70 > 320 ? props.kanbanDetails.slot_x * 70 : 320;
  return props.kanbanDetails.name !== "" && props.slotsFetched == true ? (
    <CssBaseline>
      <Container maxWidth={false} sx={{ width: width }}>
        <DndProvider backend={HTML5Backend}>
          <Dialog />
          <MessagesComponent />

          <Stack spacing={2}>
            <Typography variant="h4" component="h4">
              Kanban {props.kanbanDetails.name}
            </Typography>
            <KanbanInputComponent />
            <KanBanSlots />
            <KanbanConfiguration />
            <LoadingComponent />
          </Stack>
        </DndProvider>
      </Container>
    </CssBaseline>
  ) : (
    <LoadApp />
  );
};

export default connectToStore(KanbanView);
