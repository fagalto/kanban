import { Provider } from "react-redux";
import store from "../../Store/store";
import KanbanView from "./KanbanView"

const Kanban = (kanbanIds: number[]) => {

  const kanbans = kanbanIds.map(
    kid => {
      const prop = {
        kanbanId: kid,
      };
        return (
          <Provider store={store(kid)} key={kid}>
            <KanbanView {...prop} />
          </Provider>
        );
    }
  )
return kanbans

};

export default Kanban;
