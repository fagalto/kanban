import ReactDOM from "react-dom";
import Kanban from "./Components/Kanban/Kanban";

import "./index.css";

const kanbans = [83];

ReactDOM.render(Kanban(kanbans), document.getElementById("root") as HTMLElement);
