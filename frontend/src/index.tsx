
import ReactDOM from "react-dom";
import Kanban from "./Components/Kanban/Kanban";
import { Provider } from "react-redux";
import store from "./Store/store";
import "./index.css";

const kanbanId = {
  kanbanId: 82

};


ReactDOM.render(
  <Provider store={store}>
    <Kanban {...kanbanId} />

  </Provider>,
  document.getElementById("root") as HTMLElement
);

 
