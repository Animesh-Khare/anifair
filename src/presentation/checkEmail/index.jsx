import { useEffect } from "react";
import FYBox from "../../shared/FYBox";
import FYTypography from "../../shared/FYTypography";
import { useLocation, useNavigate } from "react-router-dom";
import { locationPath } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  titleHead: {
    height: "calc(100vh - 70px)",
    maxWidth: 700,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: [[0, 20]],
    "& p": {
      fontWeight: 500,
      lineHeight: 2,
      color: theme.palette.black.secondary,
    },
  },
}));

const CheckEmail = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  useEffect(() => {
    if (!location.state?.showCheckEmail)
      navigate(locationPath?.signup, { replace: true });
  }, [navigate, location]);
  return (
    <FYBox>
      <div className={classes.titleHead}>
        <FYBox mb={3}>
          <MarkEmailReadIcon style={{ color: "#0E854E", fontSize: 350 }} />
        </FYBox>
        <FYTypography variant="h5" color="primary.main" mb={3}>
          {t("confirmEmail")}
        </FYTypography>
        <FYTypography align="center">{t("checkEmailToVerify")}</FYTypography>
      </div>
    </FYBox>
  );
};

export default CheckEmail;
