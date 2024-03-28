import { TableBody } from "@mui/material";
import React from "react";

const FYTableBody = ({ children, ...props }) => (
  <TableBody {...props}>{children}</TableBody>
);

export default FYTableBody;
