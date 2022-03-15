import * as React from "react";
import { useDrag } from "react-dnd";
import { slotData } from "../../Interfaces/interfaces";
import { dropElemInterface } from "../Drop/drop";

export interface dragElemInterface {
  allowedTypes: string;
  dropFunction: (from: slotData, to: slotData, kanbanId: number) => any;
  kanbanId: number;
  draggedElem: JSX.Element;
  dragId?: number | string;
  slot?: slotData;
}

   const DragComponent = (props: dragElemInterface)=> {
  const [collected, drag] = useDrag(() => ({
    type: props.allowedTypes,
    item: { dragId: props.dragId, kanbanId: props.kanbanId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<dropElemInterface>();
      if (item && dropResult) {
        console.log("dropping:", props.slot?.itemid, "to:",dropResult.slot?.itemid);
        const dropID = typeof dropResult.dropId != "number" ? 0 : dropResult.dropId;
        props.slot && dropResult.slot&&
          dropID != item.dragId &&
          props.dropFunction(props.slot, dropResult.slot, item.kanbanId);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = collected.isDragging ? 0.4 : 1;
  return (
    <div className="slotDragAndDropWrapper" ref={drag} role="Box" style={{ opacity }}>
      {props.draggedElem}
    </div>
  );
};
export default DragComponent;
