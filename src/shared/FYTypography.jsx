import { Typography } from "@mui/material";
import React from "react";

const FYTypography = ({ children, className, color, ...rest }) => {
  return <Typography {...{ color, className, ...rest }}>{children}</Typography>;
};

export default FYTypography;
