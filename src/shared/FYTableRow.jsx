import { TableRow } from "@mui/material";
import React from "react";

const FYTableRow = ({ children, ...props }) => (
  <TableRow {...{ ...props }}>{children}</TableRow>
);
export default FYTableRow;
