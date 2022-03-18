import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type headerProps = {
  columns: string[];
  columnOrder: string[];
};

const Header = (props: headerProps) => {
    const headers = props.columns.map((elem, index) => (
      <TableCell sx={{ fontWeight: "bold" }} align="right" key={index}>
        {elem}
      </TableCell>
    ));

  return (
    <TableHead >
      <TableRow >{headers}</TableRow>
    </TableHead>
  );
};

export default Header;
