import { TableHead } from "@mui/material";
import React from "react";

const FYTableHead = ({ children, ...props }) => (
  <TableHead {...props}>{children}</TableHead>
);

export default FYTableHead;
