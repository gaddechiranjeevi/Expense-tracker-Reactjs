import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableBodyComp from "./TableBody";

const TableComp = (props) => {
  const { TableValues } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>TableValues.one</TableCell>
            <TableCell align="right">TableValues.two</TableCell>
            <TableCell align="right">TableValues.three</TableCell>
            <TableCell align="right">TableValues.four</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.expenseList.map((item) => {
            return <TableBodyComp item={item}/>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;