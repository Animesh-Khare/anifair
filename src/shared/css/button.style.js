import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  btnStyle: {
    "&.MuiButton-root": {
      width: "100%",
      borderRadius: "10px",
      fontSize: 12,
      lineHeight: "18px",
      padding: 16,
      textTransform: "capitalize",
      marginTop: 40,
    },
  },
}));
