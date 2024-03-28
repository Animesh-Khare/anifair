import { Checkbox } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

const StyledCheck = styled(Checkbox)(({ theme }) => ({
  "&.MuiCheckbox-root": {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    lineHeight: "16px",
    color: "#696974",
    "& .MuiSvgIcon-root": {
      height: 20,
      width: 20,
      borderRadius: 14,
    },
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
  },
}));

const FYCheckbox = (props) => {
  return <StyledCheck {...props} />;
};

export default FYCheckbox;
