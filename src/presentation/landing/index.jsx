import React from "react";
import LandingPageContainer from "../../container/landingPage.container";
import {
  aboutCompany,
  formPath,
} from "../../description/landingPage.description";
import FYLoader from "../../shared/FYLoader";
import CompanyBackground from "../../assets/svg/bgImage.svg";
import CompanyLogo from "../../assets/svg/companyLogo.svg";
import mapImage from "../../assets/png/map.jpeg";
import {
  Card,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FYTypography from "../../shared/FYTypography";
import FYStack from "../../shared/FYStack";
import FYRating from "../../shared/FYRating";
import useStyles from "./style";
import FYPagination from "../../shared/FYPagination";
import FYGrid from "../../shared/FYGrid";
import FYBox from "../../shared/FYBox";
import FYTable from "../../shared/FYTable";
import FYTableHead from "../../shared/FYTableHead";
import FYTableRow from "../../shared/FYTableRow";
import FYTableCell from "../../shared/FYTableCell";
import FYTableBody from "../../shared/FYTableBody";
import FYTableContainer from "../../shared/FYTableContainer";
import TableSkeleton from "../../shared/table/TableSkeleton";
import { useTranslation } from "react-i18next";
import NotFound from "../NotFound";
import { length, truncateWithEllipsis } from "../../utils/javascript";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { calculateRating } from "../../utils/utilFunctions";

const LandingPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    loadingStatus,
    companyData,
    notFound,
    reviewSummery,
    totalRate,
    reviews,
    companyDetail,
    goToReviewPage,
    handlePageChange,
    currentPage,
    childLoadingStatus,
    rowsPerPage,
  } = LandingPageContainer({ formPath });

  if (notFound) return <NotFound />;

  if (loadingStatus) {
    return <FYLoader variant="fullPage" />;
  }

  if (!companyData) return null;

  return (
    <FYStack
      width="100%"
      backgroundColor="#002e19"
      pb={5}
      minHeight="calc(100vh - 70px)"
    >
      <FYStack className={classes.profileCover}>
        <img
          src={
            `${companyData?.backgroundCoverUrl}?date=${new Date()}` ||
            CompanyBackground
          }
          alt="backImage"
        />
      </FYStack>
      <FYStack mt={-10}>
        <Container>
          <Card
            sx={{ overflow: "visible", px: { lg: 4, xs: 2 }, borderRadius: 3 }}
          >
            <FYStack direction="row" flexWrap="wrap">
              <FYBox className={classes.profileImage}>
                <img
                  src={
                    `${companyData?.logoUrl}?date=${new Date()}` || CompanyLogo
                  }
                  alt="Company Logo"
                />
                <FYStack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={goToReviewPage}
                  mt="auto"
                  pb={2}
                  sx={{
                    cursor: "pointer",
                    "& svg": { color: "primary.main", width: 20 },
                  }}
                >
                  <AddCircleOutlineOutlinedIcon />
                  <FYTypography variant="body2">{t("newReview")}</FYTypography>
                </FYStack>
              </FYBox>
              <FYBox className={classes.score}>
                <FYTypography variant="h4" component="h4">
                  {reviewSummery?.avgOverallScore || 0}
                </FYTypography>
                <FYTypography variant="h6" component="h6">
                  {reviewSummery?.avgGreenScore || 0}
                </FYTypography>
              </FYBox>
              <FYBox className={classes.companyInfo}>
                <FYTypography variant="h6" component="h6">
                  {truncateWithEllipsis(companyData?.companyName, 22)}
                </FYTypography>
                <FYRating readOnly value={totalRate} precision={0.5} />
                {reviewSummery?.totalReview && (
                  <FYTypography variant="body2" component="p">
                    {`${t("basesOn")}\t${reviewSummery?.totalReview}\t${t(
                      "reviews",
                    )}`}
                  </FYTypography>
                )}
              </FYBox>
              <FYBox className={classes.map}>
                <img src={mapImage} alt="map" />
              </FYBox>
              <List className={classes.profileList} disablePadding>
                {companyDetail?.map(
                  ({ icon, desc, needDangerouslySetInnerHTML }, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>
                        {needDangerouslySetInnerHTML ? (
                          <span dangerouslySetInnerHTML={{ __html: desc }} />
                        ) : (
                          desc
                        )}
                      </ListItemText>
                    </ListItem>
                  ),
                )}
              </List>
            </FYStack>
          </Card>
        </Container>
      </FYStack>
      <FYStack mt={5}>
        <Container>
          <Card className={classes.aboutCompany} sx={{ borderRadius: 2.5 }}>
            <FYGrid container spacing={3}>
              <FYGrid item md={8} xs={12}>
                <FYTypography
                  variant="body1"
                  component="h6"
                  fontWeight="500"
                  mb={2}
                >
                  {t("lastReviews")}
                </FYTypography>
                {childLoadingStatus ? (
                  <TableSkeleton sx={{ minWidth: 650 }} length={rowsPerPage} />
                ) : reviews?.data?.length ? (
                  <>
                    <FYTableContainer>
                      <FYTable
                        sx={{ minWidth: 650 }}
                        aria-label="last review table"
                      >
                        <FYTableHead>
                          <FYTableRow>
                            <FYTableCell>{t("companyRating")}</FYTableCell>
                            <FYTableCell>{t("name")}</FYTableCell>
                            <FYTableCell>{t("greenRating")}</FYTableCell>
                            <FYTableCell>{t("recommendation")}</FYTableCell>
                          </FYTableRow>
                        </FYTableHead>
                        <FYTableBody>
                          {reviews?.data?.map((row) => (
                            <FYTableRow
                              key={row._id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <FYTableCell>
                                <FYStack direction="row">
                                  <FYTypography
                                    fontSize={12}
                                    mr={1}
                                    fontWeight="700"
                                  >
                                    {row?.overallScore}
                                  </FYTypography>
                                  <FYRating
                                    readOnly
                                    value={calculateRating(row?.overallScore)}
                                    precision={0.5}
                                    size={"small"}
                                  />
                                </FYStack>
                              </FYTableCell>
                              <FYTableCell>
                                <FYTypography fontSize={12} fontWeight={700}>
                                  {row?.firstName}
                                </FYTypography>
                                <FYTypography
                                  color="rgba(63, 63, 68, 0.50)"
                                  fontSize={12}
                                >
                                  {row?.city}
                                </FYTypography>
                              </FYTableCell>
                              <FYTableCell>
                                <FYRating
                                  readOnly
                                  value={calculateRating(row?.greenScore)}
                                  precision={0.5}
                                  size={"small"}
                                  sx={{ color: "green.main" }}
                                />
                              </FYTableCell>
                              <FYTableCell>
                                <FYTypography
                                  color="rgba(63, 63, 68, 0.50)"
                                  fontSize={12}
                                >
                                  {row?.recommendation?.join(",")}
                                </FYTypography>
                              </FYTableCell>
                            </FYTableRow>
                          ))}
                        </FYTableBody>
                      </FYTable>
                    </FYTableContainer>
                    <FYPagination
                      totalItem={reviews?.totalCount}
                      count={reviews?.totalPage}
                      page={currentPage}
                      onChange={handlePageChange}
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    />
                  </>
                ) : (
                  t("reviewNotFound")
                )}
              </FYGrid>
              {length(companyData?.description) ? (
                <FYGrid item md={4} xs={12}>
                  <FYTypography
                    variant="body1"
                    component="h6"
                    fontWeight="500"
                    mb={2}
                  >
                    {`${t(aboutCompany, {
                      companyName: t("company"),
                    })}`}
                  </FYTypography>
                  <FYTypography
                    variant="body2"
                    component="p"
                    color="natural.gray"
                    mb={2}
                    sx={{ whiteSpace: "pre-line" }}
                  >
                    {companyData?.description}
                  </FYTypography>
                  <FYTypography
                    variant="body1"
                    component="h6"
                    fontWeight="5400"
                  >
                    {t("specialties")}
                  </FYTypography>
                  <FYTypography
                    variant="body2"
                    component="p"
                    color="natural.gray"
                  >
                    {companyData?.specialties}
                  </FYTypography>
                </FYGrid>
              ) : null}
            </FYGrid>
          </Card>
        </Container>
      </FYStack>
    </FYStack>
  );
};

export default LandingPage;
