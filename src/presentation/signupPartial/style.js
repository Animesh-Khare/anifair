import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  authSection: {
    padding: "100px 20px",
    backgroundColor: theme.palette.white.main,
    [theme.breakpoints.down("md")]: {
      padding: "70px 20px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px",
    },
  },
  authSectionInner: {
    maxWidth: 710,
    margin: "0 auto",
    width: "100%",
  },
  heading: {
    "&.MuiTypography-root": {
      fontSize: 56,
      fontWeight: 700,
      lineHeight: "84px",
      color: theme.palette.primary.dark,
      marginBottom: 10,
      [theme.breakpoints.down("xl")]: {
        fontSize: 44,
        lineHeight: "74px",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 38,
        lineHeight: "64px",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 38,
        lineHeight: "44px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 32,
        lineHeight: "34px",
      },
    },
  },
}));
