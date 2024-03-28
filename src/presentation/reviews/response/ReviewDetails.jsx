import { Avatar, Divider } from "@mui/material";
import FYBox from "../../../shared/FYBox";
import FYGrid from "../../../shared/FYGrid";
import FYRating from "../../../shared/FYRating";
import {
  calculateRating,
  dateToShorString,
} from "../../../utils/utilFunctions";
import FYStack from "../../../shared/FYStack";
import FYTypography from "../../../shared/FYTypography";
import ReportReview from "../../reusable/ReportReview";
import { useTranslation } from "react-i18next";
import { ReviewDetailsContainer } from "../../../container/reviews/reviewResposne.container";
import FYButton from "../../../shared/FYButton";
import FYCheckbox from "../../../shared/FYCheckbox";
import Form from "../../../shared/Form";
import FYTextField from "../../../shared/FYTextField";
import theme from "../../../themes/theme";
import useStyle from "../style";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { resposneMinLength } from "../../../description/reviews/reviewResposne.description";

const ReviewDetails = ({ review }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const {
    renderAnswerForQuestions,
    showForm,
    responseMsg,
    previousReply,
    isError,
    checked,
    childLoadingStatus,
    handleReportClick,
    handleEditClick,
    handleCheck,
    handleResponseChange,
    handleSubmit,
  } = ReviewDetailsContainer({ id: review?._id, reply: review?.response });
  return (
    <FYBox>
      <FYGrid container>
        <FYGrid
          item
          lg={2}
          md={2}
          sm={2}
          xsm={12}
          xs={12}
          mb={{ xs: 1.5, xsm: 0 }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              fontSize: { lg: 52, md: 42, xs: 32 },
              width: { lg: 80, xs: 60 },
              height: { lg: 80, xs: 60 },
              margin: { lg: "0", md: "auto", xs: "auto" },
            }}
          >
            {review?.firstName?.[0]?.toUpperCase()}
          </Avatar>
          <FYRating
            readOnly
            value={calculateRating(review?.overallScore)}
            precision={0.1}
            size={"small"}
            sx={{
              color: "green.main",
              margin: { lg: "0", xs: "auto" },
              paddingTop: "10px",
            }}
          />
        </FYGrid>
        <FYGrid item lg={10} md={10} sm={10} xsm={12} xs={12}>
          <FYStack direction="row" alignItems="center" spacing={2} mb={2}>
            <FYTypography sx={{ fontWeight: 500, fontSize: 15 }}>
              {t("nameWithScore", {
                name: review?.firstName,
                score: review?.overallScore,
              })}
            </FYTypography>
            <FYStack
              sx={{ "&.MuiStack-root": { marginLeft: "auto" } }}
              direction="row"
              alignItems="center"
            >
              <FYTypography
                sx={{ fontSize: 12, color: theme.palette.black.secondary }}
              >
                {dateToShorString(review?.date)}
              </FYTypography>
              <ReportReview id={review?._id} disabled={review?.isReported} />
            </FYStack>
          </FYStack>
          {review?.reviewAspects?.length
            ? review.reviewAspects.map((aspect, index) => (
                <FYGrid container key={index} mb={1}>
                  <FYGrid sx={{ flex: 1 }}>
                    <FYTypography
                      fontSize="12px"
                      color={theme.palette.black.secondary}
                    >
                      {aspect?.question}
                    </FYTypography>
                  </FYGrid>
                  <FYGrid
                    sx={{ flex: { xsm: "0 0 170px", xs: "1" } }}
                    className={classes.ratingOut}
                  >
                    {renderAnswerForQuestions(aspect)}
                  </FYGrid>
                </FYGrid>
              ))
            : null}
          {previousReply ? (
            <FYBox className={classes.replyBox}>
              <FYStack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FYTypography fontWeight="500" color="black.dark" fontSize={14}>
                  {"Your reply"}
                </FYTypography>
                <FYButton
                  onClick={handleEditClick}
                  sx={{
                    "&.MuiButton-root": {
                      padding: { xsm: "12px 20px", xs: "12px 0" },
                    },
                  }}
                >
                  <EditOutlinedIcon color="black" />
                  <FYTypography
                    fontSize={14}
                    sx={{ paddingLeft: 1 }}
                    color="gray.main"
                  >
                    {showForm ? t("cancel") : t("editReply")}
                  </FYTypography>
                </FYButton>
              </FYStack>
              <FYBox className={classes.replyContent}>
                <FYTypography color="black.secondary" fontSize={12}>
                  {previousReply}
                </FYTypography>
              </FYBox>
            </FYBox>
          ) : (
            <FYButton
              variant={"contained"}
              onClick={handleReportClick}
              sx={{ "&.MuiButton-root": { padding: "5px 24px", fontSize: 14 } }}
            >
              {showForm ? t("cancel") : t("reply")}
            </FYButton>
          )}
          {showForm && (
            <FYBox>
              <Divider sx={{ m: "20px 0px" }} />
              <FYTypography
                fontWeight="500"
                fontSize={14}
                sx={{ mb: { xs: 1, xsm: 0 } }}
              >
                {"Leave reply"}
              </FYTypography>
              <FYStack
                direction="row"
                alignItems="center"
                sx={{ mb: { xs: 1, xsm: 0 } }}
              >
                <FYCheckbox
                  name="termAndCondition"
                  onChange={handleCheck}
                  checked={checked["termAndCondition"]}
                />
                <FYStack
                  display="block"
                  dangerouslySetInnerHTML={{
                    __html: t("replyTerms"),
                  }}
                  fontSize={{ xs: 12, xsm: 14 }}
                  color="black.secondary"
                />
              </FYStack>
              <Form onSubmit={handleSubmit}>
                <FYTextField
                  fullWidth
                  multiline
                  rows={5}
                  placeholder={t("typeMsg")}
                  value={responseMsg}
                  onChange={handleResponseChange}
                  error={isError}
                  className={classes.responseField}
                  helperText={
                    isError
                      ? t("minLengthRequired", {
                          minLength: resposneMinLength,
                        })
                      : ""
                  }
                />
                <FYButton
                  type="submit"
                  variant="contained"
                  sx={{
                    "&.MuiButton-root": { padding: "5px 24px", fontSize: 14 },
                  }}
                  isLoading={childLoadingStatus}
                >
                  {t("submit")}
                </FYButton>
              </Form>
            </FYBox>
          )}
        </FYGrid>
      </FYGrid>

      <Divider sx={{ m: "20px 0px 10px" }} />
    </FYBox>
  );
};

export default ReviewDetails;
