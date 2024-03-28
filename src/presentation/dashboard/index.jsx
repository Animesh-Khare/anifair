import React from "react";
import DashboardContainer from "../../container/dashboard.container";
import FYBox from "../../shared/FYBox";
import FYLoader from "../../shared/FYLoader";
import AvrgRating from "../reusable/AvrgRating";
import AvrgGreenRating from "../reusable/AvrgGreenRating";
import FYTypography from "../../shared/FYTypography";
import {
  filterdAtrribute,
  reviewTableHeads,
} from "../../description/dashboard.description";
import FYRating from "../../shared/FYRating";
import FYLinerProgressbar from "../../shared/FYLinerProgressbar";
import Visitors from "./Visitors";
import ReviewTable from "../reusable/ReviewTable";
import FormFields from "../../shared/FormFields";
import FYGrid from "../../shared/FYGrid";
import FYStack from "../../shared/FYStack";
import { calculateRating } from "../../utils/utilFunctions";
import { useTranslation } from "react-i18next";
import useStyles from "./style";

const Dashboard = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    loadingStatus,
    childLoadingStatus,
    reviews,
    currentPage,
    reviewSummery,
    averageRatings,
    visitors,
    rowsPerPage,
    selectedOption,
    handleOptionChange,
    handlePageChange,
    calulatePerRatingPercentage,
  } = DashboardContainer();

  if (loadingStatus) return <FYLoader variant="fullPage" />;

  return (
    <FYBox>
      <FYGrid
        container
        columnSpacing={{ xl: 10, lg: 8, md: 6, sm: 6 }}
        rowSpacing={{ md: 3, sm: 2, xs: 2 }}
      >
        <FYGrid item lg={4} md={6} sm={6} xs={12}>
          <AvrgRating reviewSummery={reviewSummery} />
        </FYGrid>
        <FYGrid item lg={4} md={6} sm={6} xs={12}>
          <AvrgGreenRating reviewSummery={reviewSummery} />
        </FYGrid>
        <FYGrid item lg={4} md={6} sm={6} xs={12}>
          <Visitors visitorData={visitors?.visitorData} />
        </FYGrid>
      </FYGrid>
      <FYGrid
        container
        columnSpacing={5}
        rowSpacing={{ sm: 4 }}
        mt={{ md: 3, sm: 0, xs: 5 }}
      >
        <FYGrid item lg={3} md={4} sm={4} xs={12}>
          <FYBox>
            <FYTypography
              fontWeight="700"
              borderBottom="1px solid #C3C8E6"
              pb={1}
              mt={0.8}
            >
              {t("averageRatingHeading")}
            </FYTypography>
            <FYRating
              readOnly
              value={calculateRating(reviewSummery?.avgOverallScore)}
              precision={0.1}
              sxBox={{ ml: 6, py: 1 }}
            />
            {averageRatings?.averageRating?.length
              ? averageRatings.averageRating.map(({ _id, count }, index) => {
                  return (
                    <FYStack
                      direction="row"
                      alignItems="center"
                      mt={2}
                      key={index}
                    >
                      <FYTypography
                        variant="body2"
                        minWidth={50}
                      >{`${_id} Star`}</FYTypography>
                      <FYLinerProgressbar
                        value={calulatePerRatingPercentage(
                          count,
                          averageRatings?.totalCount,
                        )}
                        sx={{
                          flex: 1,
                          height: 16,
                          borderRadius: 20,
                          "& .MuiLinearProgress-bar": { borderRadius: 20 },
                        }}
                      ></FYLinerProgressbar>
                    </FYStack>
                  );
                })
              : null}
          </FYBox>
        </FYGrid>
        <FYGrid item lg={9} md={8} sm={8} xs={12}>
          <FYBox>
            <FYGrid container columnSpacing={2} alignItems="center">
              <FYGrid item xl={8} lg={6} md={4} sm={4} xs={12}>
                <FYTypography
                  fontWeight="700"
                  pb={3}
                  flex={1}
                  mt={{ xs: 4, sm: 0 }}
                >
                  {t("lastReview")}
                </FYTypography>
              </FYGrid>
              <FormFields
                attribute={filterdAtrribute}
                formData={selectedOption}
                handleChange={handleOptionChange}
                className={classes.formGroupOutside}
              />
            </FYGrid>
            <ReviewTable
              tableHeads={reviewTableHeads}
              reviews={reviews}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              handlePageChange={handlePageChange}
              isLoading={childLoadingStatus}
              notFoundMsg={t("reviewNotFound")}
            />
          </FYBox>
        </FYGrid>
      </FYGrid>
    </FYBox>
  );
};

export default Dashboard;
