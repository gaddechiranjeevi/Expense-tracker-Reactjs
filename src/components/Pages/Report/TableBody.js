import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import moment from "moment";

const TableBody = (props) => {
  const { item } = props;
  const date = moment(item.createdAt).format('DD-MM-YYYY')
  return (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
       {date}
      </TableCell>
      <TableCell align="right">{item.description}</TableCell>
      <TableCell align="right">{item.category}</TableCell>
      <TableCell align="right">{item.amount}</TableCell>
    </TableRow>
  );
};

export default TableBody;