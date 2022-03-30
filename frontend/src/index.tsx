import ReactDOM from "react-dom";
import Kanban from "./Components/Kanban/Kanban";

import "./index.css";

let kanbans = [77,
82,
83,
112,
    113];
kanbans = [77]

ReactDOM.render(Kanban(kanbans), document.getElementById("root") as HTMLElement);
