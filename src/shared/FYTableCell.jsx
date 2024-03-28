import { TableCell } from "@mui/material";
import React from "react";

const FYTableCell = ({ children, ...props }) => (
  <TableCell {...{ ...props }}>{children}</TableCell>
);

export default FYTableCell;
