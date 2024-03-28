import FYBox from "../../shared/FYBox";
import FYTypography from "../../shared/FYTypography";
import { CircularProgress } from "@mui/material";
import FYStack from "../../shared/FYStack";
import { ReactComponent as Goal } from "../../assets/svg/goal.svg";
import styles from "./style";
import { useTranslation } from "react-i18next";
import { equal } from "../../utils/javascript";

const AvrgGreenRating = ({ reviewSummery, formPath }) => {
  const classes = styles();
  const { t } = useTranslation();

  const convertSocreToPercentage = (score) => score * 10;

  if (!reviewSummery) return null;

  return (
    <FYBox
      display="flex"
      flexDirection="column"
      minHeight={!equal(formPath?.parent, "brand-go-green") && 200}
    >
      <FYStack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <FYBox>
          <FYTypography
            className={classes.headingCard}
            variant="h3"
            component="h3"
            fontWeight="700"
            color="green.main"
          >
            {reviewSummery?.avgGreenScore || 0}
          </FYTypography>
          <FYTypography color="natural.gray" sx={{ fontSize: 14 }}>
            {t("greenRating")}
          </FYTypography>
        </FYBox>
        <FYBox className={classes.goalProgress}>
          <CircularProgress
            size={50}
            thickness={2.5}
            color="warning"
            variant="determinate"
            value={convertSocreToPercentage(reviewSummery?.avgGreenScore)}
          />
          <CircularProgress
            variant="determinate"
            color="warning"
            sx={{
              position: "absolute",
              left: 0,
              zIndex: -1,
              opacity: 0.2,
            }}
            size={50}
            thickness={2.5}
            value={100}
          />
          <Goal />
        </FYBox>
      </FYStack>
      {!equal(formPath?.parent, "brand-go-green") && (
        <FYStack
          direction={{ sm: "row", xs: "column" }}
          justifyContent={{ sm: "space-between", xs: "start" }}
          alignItems={{ sm: "end", xs: "start" }}
          mt={{ md: "auto", sm: "auto", xs: 3 }}
        >
          <FYBox mb={{ sm: 0, xs: 1 }}>
            <FYTypography
              className={classes.mdHeading}
              variant="h5"
              component="h5"
              fontWeight="700"
            >
              {reviewSummery?.lastMonthRecommendationCount}
            </FYTypography>
            <FYTypography color="natural.gray" sx={{ fontSize: 12 }}>
              {t("recommendationCountDesc")}
            </FYTypography>
          </FYBox>
        </FYStack>
      )}
    </FYBox>
  );
};

export default AvrgGreenRating;
