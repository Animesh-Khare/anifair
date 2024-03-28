import React from "react";
import { makeStyles } from "@mui/styles";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FYTypography from "../shared/FYTypography";

const useStyles = makeStyles((theme) => ({
  titleHead: {
    height: "calc(100vh - 64px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: [[0, 20]],
    "& svg": {
      fontSize: 96,
      marginBottom: 40,
      [theme.breakpoints.down("md")]: {
        fontSize: 70,
        marginBottom: 20,
      },
    },
    "& h3.MuiTypography-root": {
      fontSize: 40,
      [theme.breakpoints.down("md")]: {
        fontSize: 25,
      },
    },
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.titleHead}>
      <ReportProblemIcon />
      <FYTypography variant="h3"> Oops! page not found</FYTypography>
    </div>
  );
};

export default React.memo(NotFound);
