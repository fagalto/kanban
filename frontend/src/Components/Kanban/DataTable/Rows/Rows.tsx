import TableBody from "@mui/material/TableBody";

type rowProps = {
  rows:any
}
const Rows = (props: rowProps) => {

  return <TableBody>{props.rows}</TableBody>;
};

export default Rows;
