import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  exportBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
  },

  sentTable: {
    "&.MuiTable-root": {
      minWidth: "90%",
    },
    "& p": {
      color: theme.palette.natural.gray,
      fontSize: "12px",
      fontWeight: "400px",
    },
  },
}));
