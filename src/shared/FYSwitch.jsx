import { FormLabel, Switch, styled } from "@mui/material";
import React from "react";
import FYStack from "./FYStack";
import FYGrid from "./FYGrid";
import FYTypography from "./FYTypography";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 25,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 10%)",
    width: 21,
    height: 21,
    borderRadius: 10,
    transition: theme.transitions.create(["width"], {
      duration: 220,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 42 / 2,
    opacity: 1,
    backgroundColor: "#9FB3C8",
    boxSizing: "border-box",
  },
}));

const RequiredAsterisk = styled("span")({
  color: "red",
});

const FYSwitch = ({
  xs,
  mb,
  label,
  leftText,
  rightText,
  checked,
  onChange,
  required = false,
}) => (
  <FYGrid item xs={xs} mb={mb}>
    <FormLabel sx={{ mb: 1, display: "block" }}>
      {label}
      {required && <RequiredAsterisk>*</RequiredAsterisk>}
    </FormLabel>
    <FYStack direction="row" spacing={1} alignItems="center">
      <FYTypography color="blue.gray" fontWeight={!checked ? 600 : 400}>
        {leftText}
      </FYTypography>
      <AntSwitch {...{ checked, onChange }} />
      <FYTypography color="blue.gray" fontWeight={checked ? 600 : 400}>
        {rightText}
      </FYTypography>
    </FYStack>
  </FYGrid>
);

export default FYSwitch;
