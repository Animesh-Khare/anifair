import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  boostPage: {
    "& h2": {
      fontSize: 60,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    "& h3": {
      width: "40%",
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  container: {
    maxWidth: 880,
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& .MuiStack-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .MuiGrid-root": {
      maxWidth: "100%",
    },
    "& .MuiPaper-root": {
      padding: [[30]],
      maxWidth: 400,
      borderRadius: 30,
    },
    "& hr": {
      margin: [[20, -30]],
    },
    "& img": {
      padding: [[0, 8, 0, 0]],
    },
    "& p": {
      lineHeight: 3,
    },
    "& h6": {
      lineHeight: 2,
      fontWeight: 400,
      fontSize: 16,
      padding: [[0, 0, 16, 0]],
    },
    "& h4": {
      fontWeight: 500,
      fontSize: 16,
      padding: [[8, 16]],
      width: "max-content",
      borderRadius: 24,
      margin: [[0, 0, 20, 0]],
    },
    "& h5": {
      fontSize: 38,
      fontWeight: 600,
      "& span": {
        color: theme.palette.natural.gray,
        fontSize: 16,
        fontWeight: 500,
      },
    },
  },
}));
