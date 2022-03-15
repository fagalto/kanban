import { slotData } from "../../Interfaces/interfaces";
import * as React from "react";
import { ReactDOM } from "react";
import { useDrop } from "react-dnd";
import CSS from "csstype";
const style: CSS.Properties = {};

export interface dropElemInterface extends slotData {
  elem: JSX.Element;
  allowedTypes: string;
  dropId?: number | string | undefined;
  slot?:slotData
}

 const Drop  =(props: dropElemInterface)=> {
  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: props.allowedTypes,
    drop: () => ({dropId: props.dropId, slot:props.slot }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "";
  let border = "";
  if (isActive) {
    backgroundColor = "#a9a9a9";
    border = "0px solid #686868";
  } else if (canDrop) {
    backgroundColor = "#D6D6D6";
    border = "0px #686868";
  }
  const style: CSS.Properties = {
    backgroundColor: backgroundColor,
    border: border,
  };

  return (
    <div key={props.itemid} className="slotDragAndDropWrapper" ref={drop} style={style}>
      {props.elem}
    </div>
  );
};
export default Drop;
