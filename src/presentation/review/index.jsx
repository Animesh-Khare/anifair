import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import styles from "./style";
import {
  greenRating,
  setGreenRating,
  setTotalRating,
  totalRating,
  attribute,
  defaultValues,
  formPath,
  extraRecommendations,
  extraQuestions,
  voteForThis,
  aboutCompany,
  placeReview,
  unVoteForThis,
  noQuestionFound,
} from "../../description/companyReview.description";
import FYRating from "../../shared/FYRating";
import FYTypography from "../../shared/FYTypography";
import Form from "../../shared/Form";
import CompanyReviewContainer, {
  CompanyReviewHelper,
} from "../../container/companyReview.container";
import FormFields from "../../shared/FormFields";
import FormContainer from "../../container/form.container";
import FYStack from "../../shared/FYStack";
import { useTranslation } from "react-i18next";
import FYAccordion from "../../shared/FYAccordion";
import FYSkeleton from "../../shared/FYSkeleton";
import FYTableContainer from "../../shared/FYTableContainer";
import FYTable from "../../shared/FYTable";
import FYTableHead from "../../shared/FYTableHead";
import FYTableRow from "../../shared/FYTableRow";
import FYTableCell from "../../shared/FYTableCell";
import FYTableBody from "../../shared/FYTableBody";
import FYButton from "../../shared/FYButton";
import { fairYellowRules, fairYellowRulesTitle } from "../../utils/constant";
import CompanyLogo from "../../assets/svg/companyLogo.svg";
import FYGrid from "../../shared/FYGrid";
import { equal, length } from "../../utils/javascript";
import NotFound from "../NotFound";
import FYLoader from "../../shared/FYLoader";

const CompanyReviewPage = () => {
  const classes = styles();
  const { t } = useTranslation();

  const { clonedAttribute } = CompanyReviewHelper({ attribute });

  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute: clonedAttribute,
    defaultValues,
    formPath,
  });
  const {
    childLoadingStatus,
    childObjectLoadingStatus,
    anotherChildObjectLoadingStatus,
    recommendations,
    companyBasicInfo,
    notFound,
    extraQues,
    handleSubmit,
    renderInputForQuestion,
    handleVoteButtonClick,
    votedButtons,
    validationErrors,
    loadingStatus,
  } = CompanyReviewContainer({
    formData,
    validate,
    setError,
    formPath,
  });

  if (anotherChildObjectLoadingStatus) return <FYLoader variant="fullPage" />;

  if (notFound) return <NotFound />;

  if (!companyBasicInfo) return null;

  return (
    <FYStack py={12} width="100%">
      <Container>
        <FYGrid container spacing={5}>
          <FYGrid item md={8} xs={12}>
            <Form onSubmit={handleSubmit}>
              <FYGrid container spacing={3}>
                <FYGrid item sm={6} xs={12}>
                  <Paper
                    className={`${classes.ratingCard} ${
                      error?.overallScore ? classes.error : ""
                    }`}
                    elevation={0}
                  >
                    <FYTypography variant="h6" className={classes.title}>
                      {t(totalRating)}*
                    </FYTypography>
                    <FYStack className={classes.content}>
                      <FYStack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className={classes.totalRating}
                        mb={1}
                      >
                        <FYRating
                          name="overallScore"
                          value={formData?.overallScore}
                          onChange={handleChange}
                          precision={0.5}
                          showValue
                          sxBox={{ width: "100%" }}
                        />
                      </FYStack>
                      <FYTypography
                        variant="body1"
                        component="span"
                        color="#3F3F44"
                        sx={{ opacity: 0.6 }}
                      >
                        {t(setTotalRating)}*
                      </FYTypography>
                    </FYStack>
                  </Paper>
                </FYGrid>
                <FYGrid item sm={6} xs={12}>
                  <Paper
                    className={`${classes.ratingCard} ${
                      error?.greenScore ? classes.error : ""
                    }`}
                    elevation={0}
                  >
                    <FYTypography
                      variant="h6"
                      className={classes.title}
                      color="green.main"
                    >
                      {t(greenRating)}*
                    </FYTypography>
                    <FYStack className={classes.content}>
                      <FYStack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className={classes.greenRating}
                        mb={1}
                      >
                        <FYRating
                          name="greenScore"
                          value={formData?.greenScore}
                          onChange={handleChange}
                          precision={0.5}
                          showValue
                          sxBox={{ width: "100%" }}
                        />
                      </FYStack>
                      <FYTypography
                        variant="body1"
                        component="span"
                        color="#3F3F44"
                        sx={{ opacity: 0.6 }}
                      >
                        {t(setGreenRating)}*
                      </FYTypography>
                    </FYStack>
                  </Paper>
                </FYGrid>
              </FYGrid>
              <FormFields
                attribute={clonedAttribute}
                error={error}
                formData={formData}
                handleChange={handleChange}
                pointNumberClass={classes.pointLabel}
              />
              <FYStack>
                <FYAccordion title={t(extraRecommendations)}>
                  {childLoadingStatus ? (
                    <FYSkeleton variant="rectangular" height={20} />
                  ) : (
                    <FYTableContainer>
                      <FYTable
                        sx={{ minWidth: 650 }}
                        aria-label="last review table"
                      >
                        <FYTableHead>
                          <FYTableRow>
                            <FYTableCell>{t("recommendation")}</FYTableCell>
                            <FYTableCell sx={{ pl: 5.5 }}>
                              {t("votedOn")}
                            </FYTableCell>
                            <FYTableCell>{t("maxVote")}</FYTableCell>
                          </FYTableRow>
                        </FYTableHead>
                        <FYTableBody>
                          {recommendations?.recommendation?.map(
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
                                    >{`${
                                      votedButtons.includes(recommendation?._id)
                                        ? parseInt(recommendation?.totalVotes) +
                                          1
                                        : recommendation?.totalVotes
                                    }x`}</FYTypography>
                                  </FYStack>
                                </FYTableCell>
                                <FYTableCell
                                  sx={{ border: 0, p: 1, width: "35%" }}
                                >
                                  <FYStack direction="row">
                                    <FYButton
                                      variant="contained"
                                      fullWidth
                                      isSmall
                                      onClick={() =>
                                        handleVoteButtonClick(
                                          recommendation._id,
                                        )
                                      }
                                      isDisable={
                                        equal(votedButtons.length, 2) &&
                                        !votedButtons.includes(
                                          recommendation._id,
                                        )
                                      }
                                    >
                                      {!votedButtons.includes(
                                        recommendation._id,
                                      )
                                        ? t(voteForThis)
                                        : t(unVoteForThis)}
                                    </FYButton>
                                  </FYStack>
                                </FYTableCell>
                              </FYTableRow>
                            ),
                          )}
                        </FYTableBody>
                      </FYTable>
                    </FYTableContainer>
                  )}
                </FYAccordion>
                <FYAccordion title={t(extraQuestions)}>
                  {childObjectLoadingStatus ? (
                    <FYSkeleton variant="rectangular" height={40} />
                  ) : length(extraQues?.question) ? (
                    extraQues?.question?.map((question, index) => {
                      return (
                        <FYStack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          p={1}
                          border={`1px solid ${
                            validationErrors[question._id]
                              ? "#d32f2f"
                              : "rgba(53, 70, 171, 0.30)"
                          } `}
                          mb={1}
                          borderRadius={2}
                          flexWrap="wrap"
                          key={index}
                        >
                          <FYTypography sx={{ color: "rgba(63, 63, 68, 0.6)" }}>
                            {question?.question}
                          </FYTypography>
                          {renderInputForQuestion(question)}
                        </FYStack>
                      );
                    })
                  ) : (
                    t(noQuestionFound)
                  )}
                </FYAccordion>
              </FYStack>
              <FYStack display="block" mt={3} textAlign="right">
                <FYButton
                  type="submit"
                  variant="contained"
                  sx={{ minWidth: 190 }}
                  isLoading={loadingStatus}
                >
                  {t(placeReview)}
                </FYButton>
              </FYStack>
              <FYStack display="block" mt={2}>
                <FYStack
                  display="block"
                  textAlign="right"
                  fontSize={13}
                  sx={{
                    color: "rgba(63, 63, 68, 0.6)",
                    "& a": {
                      color: "rgba(0, 80, 173, 0.60)",
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `*${t("userAgreement")}`,
                  }}
                />
              </FYStack>
            </Form>
          </FYGrid>
          <FYGrid item md={4}>
            <Box mb={4}>
              {anotherChildObjectLoadingStatus ? (
                <FYSkeleton variant="rectangular" height={40} />
              ) : (
                <div className={classes.companyInfo}>
                  <img
                    src={
                      `${companyBasicInfo?.logoUrl}?date=${new Date()}` ||
                      CompanyLogo
                    }
                    alt="Company Logo"
                  />
                  <FYTypography
                    variant="h6"
                    component="h6"
                    fontSize={18}
                    mb={1}
                    textTransform="capitalize"
                  >{`${t(aboutCompany, {
                    companyName: companyBasicInfo?.companyName,
                  })}`}</FYTypography>
                  <FYTypography
                    sx={{
                      whiteSpace: "pre-line",
                      color: "rgba(63, 63, 68, 0.6)",
                    }}
                  >
                    {companyBasicInfo?.description}
                  </FYTypography>
                  <Link
                    href={`//${companyBasicInfo?.websiteUrl}`}
                    color="#45588D"
                  >
                    {companyBasicInfo?.websiteUrl}
                  </Link>
                </div>
              )}
            </Box>
            <Box>
              <FYTypography
                variant="h6"
                component="h6"
                fontSize={18}
                mb={1}
                textTransform="capitalize"
              >
                {t(fairYellowRulesTitle)}
              </FYTypography>
              <List className={classes.rules}>
                {fairYellowRules?.map((rule, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemText
                        primary={t(rule)}
                        sx={{ color: "rgba(63, 63, 68, 0.6)" }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </FYGrid>
        </FYGrid>
      </Container>
    </FYStack>
  );
};

export default CompanyReviewPage;
