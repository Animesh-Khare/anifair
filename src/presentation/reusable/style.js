import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  goalProgress: {
    position: "relative",
    "& > svg": {
      position: "absolute",
      left: 15,
      top: 15,
    },
  },
  headingCard: {
    "&.MuiTypography-root": {
      [theme.breakpoints.down("lg")]: {
        fontSize: 36,
      },
    },
  },
  mdHeading: {
    "&.MuiTypography-root": {
      [theme.breakpoints.down("lg")]: {
        fontSize: 24,
        lineHeight: "26px",
      },
    },
  },
  tableHead: {
    "&.MuiTableCell-root": {
      whiteSpace: "nowrap",
    },
  },
  btnReviews: {
    "&.MuiButtonBase-root": {
      fontSize: 12,
      lineHeight: "16px",
      padding: "12px 17px",
    },
  },
}));
