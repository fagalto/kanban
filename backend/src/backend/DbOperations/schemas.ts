
type tableField ={
    name: string,
    type: string,
    required?: boolean
    columnName: string
}

const kanban: tableField[] = [
  {
    name: "name",
    type: "string",
    required: true,
    columnName: "name",
  },
  {
    name: "rows",
    type: "number",
    required: true,
    columnName: "slot_y",
  },
  {
    name: "columns",
    type: "number",
    required: true,
    columnName: "slot_x",
  },
  {
    name: "kanban_id",
    type: "number",
    required: true,
    columnName: "kanban_id",
  },
  {
    name: "date",
    type: "string",
    required: true,
    columnName: "date",
  },
];
const slots: tableField[] = [
  {
    name: "slot_id",
    type: "number",
    required: true,
    columnName: "slot_id",
  },
  {
    name: "kanban_id",
    type: "number",
    required: true,
    columnName: "kanban_id",
  },
  {
    name: "itemid",
    type: "string",
    required: false,
    columnName: "itemid",
  },
  {
    name: "req_capacity",
    type: "number",
    required: true,
    columnName: "req_capacity",
  },
  {
    name: "slot_coord",
    type: "string",
    required: true,
    columnName: "slot_coord",
  },
];
export {tableField, kanban,slots}
