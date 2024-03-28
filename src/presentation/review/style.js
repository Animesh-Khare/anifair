import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  ratingCard: {
    border: "1px solid rgba(53, 70, 171, 0.30)",
    borderRadius: 5,
    marginBottom: 20,
  },
  error: {
    borderColor: theme.palette.error.main,
  },
  title: {
    borderBottom: "1px solid #C3C8E6",
    marginBottom: theme.spacing(1),
    padding: [[16, 24]],
    fontSize: 16,
  },
  content: {
    padding: [[20, 24]],
    "& fieldset": {
      "& .MuiTypography-root": {
        lineHeight: "1",
      },
    },
  },
  totalRating: {
    "& svg": {
      color: theme.palette.secondary.main,
    },
  },
  greenRating: {
    "& svg": {
      color: theme.palette.primary.main,
    },
  },
  pointLabel: {
    "&.MuiTypography-root": {
      color: "rgba(63, 63, 68, 0.6)",
      width: 150,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: 0,
      },
    },
  },
  rules: {
    "&.MuiList-root": {
      "& .MuiListItem-root": {
        "&:before": {
          content: "''",
          position: "absolute",
          left: 0,
          top: 20,
          width: 3,
          height: 3,
          backgroundColor: "rgba(63, 63, 68, 0.60)",
          borderRadius: "100%",
        },
      },
    },
  },
  companyInfo: {
    "& img": {
      maxHeight: 100,
    },
  },
}));
