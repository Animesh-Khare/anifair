import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  heading: {
    fontWeight: 500,
    lineHeight: "42px",
    color: theme.palette.text.bluishPurple,
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
}));
