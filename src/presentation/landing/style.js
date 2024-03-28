import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  profileCover: {
    backgroundPosition: "center center",
    backgroundSize: "cover",
    "& img": {
      height: 300,
    },
  },
  profileImage: {
    backgroundColor: theme.palette.white.main,
    borderRadius: 30,
    marginTop: -50,
    width: "15%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: 180,
      marginTop: -30,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 150,
    },
    "& img": {
      [theme.breakpoints.down("sm")]: {
        maxWidth: 150,
      },
    },
  },
  profileInfoWrap: {
    flex: 1,
    alignItems: "center",
  },
  score: {
    width: "15%",
    position: "relative",
    textAlign: "center",
    margin: "auto 0",
    padding: "20px 10px 0",
    [theme.breakpoints.down("lg")]: {
      padding: "20px 5px 0",
    },
    [theme.breakpoints.down("md")]: {
      width: "20%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("475")]: {
      width: "40%",
    },
    "& h4": {
      fontWeight: "bold",
      fontSize: 58,
      [theme.breakpoints.down("lg")]: {
        fontSize: 48,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 38,
      },
    },
    "& h6": {
      position: "absolute",
      right: 10,
      top: -23,
      width: 53,
      height: 53,
      backgroundColor: theme.palette.primary.main,
      borderRadius: "100%",
      color: theme.palette.white.main,
      lineHeight: "53px",
      fontWeight: "bold",
      [theme.breakpoints.down("lg")]: {
        top: -30,
      },
      [theme.breakpoints.down("md")]: {
        top: -27,
        width: 50,
        height: 50,
      },
      "&:before": {
        content: '""',
        position: "absolute",
        left: -3,
        bottom: 0,
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "0 8px 20px 10px",
        borderColor: `transparent transparent ${theme.palette.primary.main} transparent`,
        transform: "rotate(-10deg)",
      },
    },
  },
  companyInfo: {
    width: "22%",
    position: "relative",
    margin: "auto 0",
    padding: "0 10px",
    [theme.breakpoints.down("lg")]: {
      padding: "0 5px",
    },
    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "& h6": {
      fontWeight: "bold",
      fontSize: 28,
    },
    "& .MuiRating-root": {
      fontSize: 34,
      [theme.breakpoints.down("lg")]: {
        fontSize: 28,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 24,
      },
    },
    "& p": {
      color: theme.palette.primary.dark,
    },
  },
  map: {
    width: "25%",
    margin: "auto 0",
    padding: 10,
    [theme.breakpoints.down("lg")]: {
      padding: 5,
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "& img": {
      display: "block",
    },
  },
  profileList: {
    "&.MuiList-root": {
      width: "23%",
      margin: "auto 0",
      padding: "0 10px",
      [theme.breakpoints.down("lg")]: {
        padding: "0 5px",
      },
      [theme.breakpoints.down("md")]: {
        width: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      "& .MuiListItem-root": {
        padding: "5px 0",
        color: theme.palette.primary.dark,
        "& .MuiListItemIcon-root": {
          minWidth: 40,
          color: theme.palette.primary.main,
          [theme.breakpoints.down("lg")]: {
            minWidth: 30,
          },
        },
        "& .MuiTypography-root": {
          fontSize: 12,
        },
      },
    },
  },
  aboutCompany: {
    padding: 30,
    [theme.breakpoints.down("sm")]: {
      padding: 15,
    },
  },
}));
