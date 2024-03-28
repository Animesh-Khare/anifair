import React from "react";
import FYTypography from "../shared/FYTypography";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import FYButton from "../shared/FYButton";
import { locationPath } from "../utils/constant";
import { useTranslation } from "react-i18next";
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
const NoSubscription = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleSubscription = () => {
    navigate(locationPath?.subscriptionOffer);
  };
  const { t } = useTranslation();
  return (
    <div className={classes.titleHead}>
      <FYTypography variant="h5">
        {state?.toastMessage ? state?.toastMessage : t("noSubscription")}
      </FYTypography>
      <FYButton variant="contained" onClick={handleSubscription}>
        {t("subscribeNow")}
      </FYButton>
    </div>
  );
};

export default NoSubscription;
