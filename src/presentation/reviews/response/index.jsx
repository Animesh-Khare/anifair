import { useTranslation } from "react-i18next";
import ReviewResponseContainer from "../../../container/reviews/reviewResposne.container";
import { filterdAtrribute } from "../../../description/reviews/reviewResposne.description";
import FYBox from "../../../shared/FYBox";
import FYGrid from "../../../shared/FYGrid";
import FYPagination from "../../../shared/FYPagination";
import FYTypography from "../../../shared/FYTypography";
import FormFields from "../../../shared/FormFields";
import Divider from "@mui/material/Divider";
import ReviewDetails from "./ReviewDetails";
import FYLoader from "../../../shared/FYLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useStyles from "../style";

const ReviewResponse = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    loadingStatus,
    detailReviews,
    currentPage,
    selectedOption,
    startDate,
    endDate,
    handleDateChange,
    handlePageChange,
    handleOptionChange,
  } = ReviewResponseContainer();

  return (
    <FYBox
      sx={{ maxWidth: { lg: "85%", md: "100%" } }}
      className={classes.mainBox}
    >
      <FYBox>
        <FYGrid container columnSpacing={2} alignItems="center">
          <FYGrid item xl={8} lg={6} md={4} sm={4} xs={12}>
            <FYTypography fontWeight="700" pb={3} flex={1} mt={{ xs: 0 }}>
              {t("shopReview")}
            </FYTypography>
          </FYGrid>
          <FormFields
            attribute={filterdAtrribute}
            formData={selectedOption}
            handleChange={handleOptionChange}
            className={classes.formGroupOutside}
          />
          <FYGrid item xl={2} lg={3} md={4} sm={4} xsm={6} xs={12}>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              className={classes.datePicker}
            />
          </FYGrid>
        </FYGrid>
      </FYBox>
      <Divider sx={{ mb: "10px" }} />
      <FYBox>
        {loadingStatus ? (
          <FYLoader variant="fullPage" />
        ) : detailReviews?.data?.length ? (
          detailReviews.data.map((review) => (
            <ReviewDetails review={review} key={review?._id} />
          ))
        ) : (
          <FYTypography>{t("reviewNotFound")}</FYTypography>
        )}
      </FYBox>
      <FYPagination
        totalItem={detailReviews?.totalCount || 0}
        count={detailReviews?.totalPage}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          flexDirection: { sm: "row", xs: "column" },
          mt: { lg: 2, sm: 3 },
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      />
    </FYBox>
  );
};

export default ReviewResponse;
