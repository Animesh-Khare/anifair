import { TableContainer } from "@mui/material";
import React from "react";

const FYTableContainer = ({ children, ...props }) => (
  <TableContainer {...props}>{children}</TableContainer>
);

export default FYTableContainer;
