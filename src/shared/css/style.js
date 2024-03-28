import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  inputField: {
    "&.MuiFormControl-root": {
      flex: 1,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        flex: "none",
      },
      "& .MuiFormLabel-root": {
        color: theme.palette.secondary.gray,
        fontSize: 16,
        lineHeight: "22px",
      },
      "& .MuiInput-underline": {
        "& .MuiInputBase-input": {
          fontSize: 16,
          lineHeight: "19px",
          padding: "4px 0 10px",
        },
      },
      "& .MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.natural.main,
          borderRadius: 10,
        },
      },
    },
    "& .MuiInputAdornment-root": {
      paddingBottom: 4,
    },
  },
  formControl: {
    "&.MuiFormControl-root": {
      backgroundColor: "transparent",
      borderRadius: theme.shape.borderRadius,
      border: "none",
      "& .MuiStack-root": {
        overflow: "hidden",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.natural.main,
      borderRadius: 10,
    },
    "& .MuiInputBase-root.Mui-error": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.natural.main,
      },
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      position: "absolute",
      bottom: -5,
      left: 0,
    },
  },
  selected: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  phoneInput: {
    "& .form-control": {
      height: "auto",
      padding: "14.5px 14px",
      marginLeft: 70,
      width: "calc(100% - 70px)",
      borderRadius: 10,
      borderColor: theme.palette.natural.main,
    },
    "& .flag-dropdown": {
      borderColor: theme.palette.blue.main,
      borderRadius: 10,
      backgroundColor: "transparent",
      "&.open, &:hover": {
        borderRadius: 10,
      },
      "& .selected-flag": {
        width: 55,
        paddingLeft: 14,
        "&.open, &:hover": {
          borderRadius: 10,
        },
      },
    },
  },
  eyeIcon: {
    color: "rgba(0, 0, 0, 0.54)",
    cursor: "pointer",
  },
}));
