import React from "react";
import BrandGoGreenContainer from "../../../container/brand/brandGoGreen.container";
import FYBox from "../../../shared/FYBox";
import FYGrid from "../../../shared/FYGrid";
import AvrgGreenRating from "../../reusable/AvrgGreenRating";
import { formPath } from "../../../description/brand/brandGoGreen.description";
import FYTableContainer from "../../../shared/FYTableContainer";
import FYTable from "../../../shared/FYTable";
import FYTableHead from "../../../shared/FYTableHead";
import FYTableRow from "../../../shared/FYTableRow";
import FYTableCell from "../../../shared/FYTableCell";
import { useTranslation } from "react-i18next";
import FYTableBody from "../../../shared/FYTableBody";
import FYStack from "../../../shared/FYStack";
import { Box } from "@mui/material";
import FYTypography from "../../../shared/FYTypography";
import { useStyles } from "../style";
import TableSkeleton from "../../../shared/table/TableSkeleton";
import FYLoader from "../../../shared/FYLoader";
import FYButton from "../../../shared/FYButton";
import AddRecommendation from "./AddRecommendation";
import DeleteRecommendation from "./DeleteRecommendation";

const BrandGoGreen = () => {
  const {
    recommendations,
    loadingStatus,
    showAddRecommendation,
    handleAddRecommendationClick,
  } = BrandGoGreenContainer({
    formPath,
  });
  const { t } = useTranslation();
  const classes = useStyles();

  if (loadingStatus) return <FYLoader variant="fullPage" />;

  return (
    <FYBox>
      <FYGrid
        container
        columnSpacing={{ xl: 10, lg: 8, md: 6, sm: 6 }}
        rowSpacing={{ md: 3, sm: 2, xs: 2 }}
      >
        <FYGrid item lg={4} md={6} sm={6} xs={12}>
          <AvrgGreenRating
            reviewSummery={recommendations}
            formPath={formPath}
          />
        </FYGrid>
        <FYGrid item lg={12} md={6} sm={6} xs={12}>
          {recommendations ? (
            <div className={classes.recommendationTable}>
              <FYTypography variant="h6">
                {t("recommendationHead")}
              </FYTypography>
              <FYTableContainer>
                <FYTable aria-label="recommendation table">
                  <FYTableHead>
                    <FYTableRow>
                      <FYTableCell>{t("recommendation")}</FYTableCell>
                      <FYTableCell sx={{ pl: 5.5 }}>{t("votedOn")}</FYTableCell>
                      <FYTableCell sx={{ pl: 5.5 }}>{t("action")}</FYTableCell>
                    </FYTableRow>
                  </FYTableHead>
                  <FYTableBody>
                    {recommendations?.recommendation
                      ? recommendations?.recommendation?.map(
                          (recommendation, index) => (
                            <FYTableRow
                              key={recommendation._id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <FYTableCell
                                sx={{ border: 0, p: 1, width: "44%" }}
                              >
                                <FYStack direction="row">
                                  <FYStack
                                    direction="row"
                                    sx={{ color: "rgba(63, 63, 68, 0.6)" }}
                                    alignItems="center"
                                    flex={1}
                                    spacing={1}
                                  >
                                    <Box minWidth={20}>{index + 1}.</Box>
                                    <FYStack
                                      border="1px solid rgba(53, 70, 171, 0.30)"
                                      p={1}
                                      borderRadius={1.1}
                                      flex={1}
                                    >
                                      {recommendation?.name}
                                    </FYStack>
                                  </FYStack>
                                </FYStack>
                              </FYTableCell>
                              <FYTableCell
                                sx={{ border: 0, py: 1, pr: 1, pl: 3 }}
                              >
                                <FYStack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                >
                                  <Box
                                    width={8}
                                    height={8}
                                    backgroundColor="primary.main"
                                    borderRadius="100%"
                                    mr={2}
                                  ></Box>
                                  <FYTypography
                                    color="gray.main"
                                    variant="body2"
                                  >{`${recommendation?.totalVotes}x`}</FYTypography>
                                </FYStack>
                              </FYTableCell>
                              <FYTableCell
                                sx={{ border: 0, py: 1, pr: 1, pl: 3 }}
                              >
                                <DeleteRecommendation
                                  id={recommendation._id}
                                  recommendations={recommendations}
                                />
                              </FYTableCell>
                            </FYTableRow>
                          ),
                        )
                      : t("recommendationNotFound")}
                    {showAddRecommendation && (
                      <AddRecommendation
                        recommendations={recommendations}
                        closeForm={handleAddRecommendationClick}
                      />
                    )}
                  </FYTableBody>
                </FYTable>
              </FYTableContainer>
              <FYButton
                variant="contained"
                sx={{ m: 2 }}
                onClick={handleAddRecommendationClick}
                isDisable={showAddRecommendation}
              >
                {t("addRecommendation")}
              </FYButton>
            </div>
          ) : (
            <TableSkeleton sx={{ maxWidth: "60%" }} length={5} />
          )}
        </FYGrid>
      </FYGrid>
    </FYBox>
  );
};

export default BrandGoGreen;
