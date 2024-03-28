import { useTranslation } from "react-i18next";
import ReviewOverviewContainer from "../../../container/reviews/reviewOverview.container";
import { reviewTableHeads } from "../../../description/reviews/reviewOverview.description";
import FYBox from "../../../shared/FYBox";
import FYGrid from "../../../shared/FYGrid";
import FYLoader from "../../../shared/FYLoader";
import AvrgGreenRating from "../../reusable/AvrgGreenRating";
import AvrgRating from "../../reusable/AvrgRating";
import ReviewTable from "../../reusable/ReviewTable";

const ReviewOverview = () => {
  const {
    reviewSummery,
    reviews,
    currentPage,
    rowsPerPage,
    loadingStatus,
    childLoadingStatus,
    handlePageChange,
  } = ReviewOverviewContainer();
  const { t } = useTranslation();

  if (loadingStatus) return <FYLoader variant="fullPage" />;

  return (
    <FYBox>
      <FYGrid
        container
        columnSpacing={{ xl: 10, md: 5, xs: 3 }}
        mb={{ xs: 2, sm: 4 }}
      >
        <FYGrid item xl={4} sm={6} xs={12}>
          <AvrgRating reviewSummery={reviewSummery} />
        </FYGrid>
        <FYGrid item xl={4} sm={6} xs={12}>
          <AvrgGreenRating reviewSummery={reviewSummery} />
        </FYGrid>
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
  );
};

export default ReviewOverview;
