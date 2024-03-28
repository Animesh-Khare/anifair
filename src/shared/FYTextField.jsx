import { FormLabel, TextField as TF } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { equal } from "../utils/javascript";

const TextField = styled(TF)(({ theme, variant }) => ({
  paddingBottom: equal(variant, "outlined") ? 20 : 30,
  "& .MuiInputBase-input": {
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      lineHeight: "16px",
    },
    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0px 40rem #fff inset",
      borderRadius: 6,
    },
  },
  "& .MuiInput-underline": {
    "& + .MuiFormHelperText-root": {
      bottom: "auto",
      top: 50,
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    position: "absolute",
    bottom: -5,
    left: 0,
  },
}));

const FYTextField = ({ formLabel, ...rest }) => {
  return (
    <>
      {formLabel && (
        <FormLabel
          sx={{
            color: "primary.dark",
            fontSize: 14,
            marginBottom: 1,
            display: "block",
          }}
        >
          {formLabel}
        </FormLabel>
      )}
      <TextField {...rest} />
    </>
  );
};

export default FYTextField;
