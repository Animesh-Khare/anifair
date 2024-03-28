import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  authLayoutContainer: {
    maxWidth: 1180,
    margin: "40px auto 40px auto",
    padding: "0 16px",
    minHeight: "calc(100vh - 150px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      margin: "30px auto 30px auto",
    },
  },
  mainContent: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  textContainer: {
    "&.MuiTypography-root": {
      textAlign: "center",
      fontSize: 24,
      lineHeight: "36px",
      color: theme.palette.text.bluishPurple,
      fontWeight: "600",
      letterSpacing: 0.2,
      [theme.breakpoints.down("md")]: {
        fontSize: 20,
        lineHeight: "32px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 16,
        lineHeight: "22 px",
      },
    },
  },
  imgContainer: {
    position: "relative",
    backgroundColor: "#FAFAFB",
    borderRadius: "50px 0 0 50px",
    border: "1px solid #F1F1F5",
    zIndex: 9,
    [theme.breakpoints.down("md")]: {
      marginBottom: 40,
      borderRadius: "50px 50px 0 0",
    },
  },
  btnImg: {
    "&.MuiButtonBase-root": {
      position: "absolute",
      top: "10%",
      right: 50,
      padding: 15,
      borderRadius: "12px",
      maxWidth: 160,
      width: "100%",
      color: "#0E854E",
      backgroundColor: theme.palette.secondary.light,
      [theme.breakpoints.down("md")]: {
        right: 0,
        top: 0,
        maxWidth: 120,
        position: "relative",
        float: "right",
      },
    },
  },
  imageOutside: {
    "&.MuiBox-root": {
      textAlign: "center",
    },
  },
  paddingTop: {
    "&.MuiBox-root": {
      paddingTop: 62,
    },
  },
  paddingForLogin: {
    padding: "46px 46px 90px 46px",
    [theme.breakpoints.down("md")]: {
      padding: "30px 20px",
    },
  },
  paddingForSignup: {
    padding: "36px 46px 71px 46px",
  },
  notification: {
    position: "relative",
    lineHeight: 1,
    "&:before": {
      content: '""',
      position: "absolute",
      right: 2,
      top: 2,
      width: 8,
      height: 8,
      backgroundColor: theme.palette.error.main,
      borderRadius: "100%",
      [theme.breakpoints.down("sm")]: {
        width: 6,
        height: 6,
      },
    },
    "& svg": {
      [theme.breakpoints.down("sm")]: {
        width: 20,
        height: 20,
      },
    },
  },
  appBarHeader: {
    padding: "28px 28px 0",
    position: "fixed",
    top: 0,
    left: 280,
    right: 0,
    backgroundColor: theme.palette.white.main,
    zIndex: 99,
    transition: "all 0.3s ease-in-out",
    [theme.breakpoints.down("md")]: {
      left: 0,
    },
    "&$show": {
      [theme.breakpoints.down("md")]: {
        left: 0,
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: 16,
    },
  },
  show: {},
  menuButton: {
    "&.MuiSvgIcon-root": {
      marginRight: 24,
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "inline-block",
      },
      [theme.breakpoints.down("sm")]: {
        marginRight: 12,
      },
    },
  },
  headerTitle: {
    "&.MuiTypography-root, & span": {
      [theme.breakpoints.down("lg")]: {
        fontSize: 18,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 13,
      },
    },
  },
  navTab: {
    borderBottom: "1px solid #E6E6E6",
    "& .MuiButtonBase-root": {
      flex: 1,
      maxWidth: "100%",
      color: theme.palette.black.main,
    },
  },
  headerLanguageDropdown: {
    "& .MuiSelect-select": {
      padding: 10,
      "& .MuiStack-root .MuiStack-root": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
    },
  },
}));
