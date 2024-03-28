import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FYBox from "../../shared/FYBox";
import FYButton from "../../shared/FYButton";
import { loadStateFn } from "../../utils/localStorage";
import { makeStyles } from "@mui/styles";
import FYTypography from "../../shared/FYTypography";
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

const ThanksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const goToCompanyProfile = () => {
    const companyId = loadStateFn("companyId");
    return navigate(`/${companyId}/company-profile`, { replace: true });
  };

  useEffect(() => {
    if (!location.state?.showThanksPage) {
      goToCompanyProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location]);

  return (
    <FYBox>
      <div className={classes.titleHead}>
        <FYTypography variant="h1">Thank You</FYTypography>
        <FYButton onClick={goToCompanyProfile} variant="contained">
          Go To Company Profile
        </FYButton>
      </div>
    </FYBox>
  );
};

export default ThanksPage;
