import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  checkBoxWrapper: {
    marginTop: 32,
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
  },
  checkboxInnerWrapper: {
    display: "flex",
    gap: 10,
    "& .MuiCheckbox-root": {
      padding: "0",
      "&.Mui-checked": {
        color: theme.palette.primary.light,
      },
    },
  },
  forgotLink: {
    textDecoration: "none",
    color: "#50B5FF",
    fontSize: 14,
    lineHeight: "21px",
  },
}));
