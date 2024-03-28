import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  ratingOut: {
    "& .MuiTypography-root": {
      fontSize: 12,
      color: theme.palette.black.secondary,
    },
    "& .MuiRating-root": {
      fontSize: 14,
      [theme.breakpoints.down("xsm")]: {
        marginLeft: "auto",
      },
    },
    [theme.breakpoints.down("xsm")]: {
      textAlign: "right",
    },
  },
  formGroupOutside: {
    "& .MuiInputBase-root": {
      "& .MuiSelect-select": {
        backgroundColor: "#fff",
        minHeight: 0,
        padding: 12,
        "& .MuiStack-root": {
          "& .MuiTypography-root": {
            fontSize: 12,
          },
        },
      },
    },
  },
  rating: {
    "& MuiRating-root": {
      justifyContent: "center",
    },
  },
  replyBox: {
    "&.MuiBox-root": {
      maxWidth: "100%",
      paddingRight: 50,
      [theme.breakpoints.down("sm")]: {
        paddingRight: 0,
      },
    },
  },
  replyContent: {
    padding: "8px 12px",
    border: "1px solid",
    borderRadius: "5px",
    borderColor: theme.palette.black.secondary,
  },
  datePicker: {
    padding: 12,
    borderRadius: 4,
    marginBottom: 24,
    border: "1px solid",
    borderColor: theme.palette.white.light,
    width: "100%",
    fontSize: "12px",
    "&:focus-visible": {
      outlineColor: theme.palette.primary.main,
    },
  },
  mainBox: {
    "& .react-datepicker-wrapper": {
      width: "100%",
    },
  },
  dropDown: {
    "&.MuiFormControl-root": {
      paddingBottom: 0,
      "& .MuiSelect-select": {
        padding: "10px 12px",
        minHeight: 0,
        "& .MuiTypography-root": {
          fontSize: 12,
        },
      },
    },
  },
  textField: {
    "&.MuiTextField-root": {
      paddingBottom: 0,
      width: "100%",
      "& .MuiInputBase-input": {
        padding: "8px 12px",
      },
    },
  },
  checkBox: {
    "&.MuiCheckbox-root": {
      display: "inline-flex",
      "&.Mui-checked": {
        color: theme.palette.primary.main,
      },
    },
  },
  AddQueTable: {
    "&.MuiTable-root": {
      minWidth: 1040,
      "& .MuiTableRow-root": {
        "& .MuiTableCell-root": {
          "&:nth-last-child(2)": {
            width: 120,
            "& .MuiStack-root": {
              height: 39,
            },
          },
          "&:nth-last-child(3)": {
            width: 120,
          },
          "&:nth-child(3)": {
            width: "30%",
          },
          "&:first-child": {
            whiteSpace: "nowrap",
          },
          "&:nth-last-child(4)": {
            width: 120,
          },
          "& .MuiButton-root": {
            padding: "5px 24px",
            fontSize: 14,
          },
        },
      },
    },
  },
  responseField: {
    "&.MuiFormControl-root": {
      "& .MuiFormHelperText-root": {
        bottom: 6,
      },
    },
  },
}));
