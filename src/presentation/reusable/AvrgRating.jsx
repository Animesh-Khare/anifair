import { CircularProgress } from "@mui/material";
import FYBox from "../../shared/FYBox";
import FYTypography from "../../shared/FYTypography";
import FYStack from "../../shared/FYStack";
import { ReactComponent as Star } from "../../assets/svg/star.svg";
import styles from "./style";
import { useTranslation } from "react-i18next";
import ChartSvg from "../../assets/svg/chart.svg";

const AvrgRating = ({ reviewSummery }) => {
  const classes = styles();
  const { t } = useTranslation();
  const convertSocreToPercentage = (score) => score * 10;

  if (!reviewSummery) return null;

  return (
    <FYBox minHeight={200} display="flex" flexDirection="column" height="100%">
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
          >
            {reviewSummery?.avgOverallScore || 0}
          </FYTypography>
          <FYTypography color="natural.gray" sx={{ fontSize: 14 }}>
            {t("companyRating")}
          </FYTypography>
        </FYBox>
        <FYBox className={classes.goalProgress}>
          <CircularProgress
            size={50}
            thickness={2.5}
            variant="determinate"
            color="warning"
            value={convertSocreToPercentage(reviewSummery?.avgOverallScore)}
          />
          <CircularProgress
            variant="determinate"
            sx={{
              position: "absolute",
              left: 0,
              zIndex: -1,
              opacity: 0.2,
            }}
            size={50}
            color="warning"
            thickness={2.5}
            value={100}
          />
          <Star />
        </FYBox>
      </FYStack>
      <FYBox mt="auto">
        <FYTypography sx={{ fontSize: 14, textAlign: "end" }}>
          {reviewSummery?.lastWeekReviewCount} {t("reviewLast7days")}
        </FYTypography>
        <img src={ChartSvg} alt="chart" width="100%" />
      </FYBox>
    </FYBox>
  );
};

export default AvrgRating;
