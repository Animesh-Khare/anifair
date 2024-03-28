import { Table } from "@mui/material";
import React from "react";

const FYTable = ({ children, ...props }) => (
  <Table {...props}>{children}</Table>
);

export default FYTable;
