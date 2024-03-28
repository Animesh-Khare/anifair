import { useDispatch, useSelector } from "react-redux";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { SET_COMPANY_DATA } from "../../redux/constants";
import { showToast } from "../../utils/toastService";
import { useEffect, useState } from "react";
import { formPath } from "../../description/reviews/reviewOverview.description";

const ReviewOverviewContainer = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const childLoadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.child],
  );
  const { reviewSummery, reviews } = useSelector((state) => state.app?.company);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const { performRequest } = ApiContainer();

  useEffect(() => {
    getReviewSummery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllReviews(rowsPerPage, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getReviewSummery = async () => {
    try {
      const reviewSummery = await performRequest({
        endPoint: apiEndPoints?.reviewSummery,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath?.parent,
      });
      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          reviewSummery: reviewSummery?.data,
        },
      });
    } catch (error) {
      showToast();
    }
  };

  const getAllReviews = async (rowsPerPage = 5, page = 1, month, star) => {
    const apiEndPointURL = `${apiEndPoints?.reviews}?perPage=${rowsPerPage}&page=${page}`;
    try {
      const response = await performRequest({
        endPoint: apiEndPointURL,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath?.child,
      });
      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          reviews: response?.data,
        },
      });
    } catch (error) {
      showToast(error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return {
    reviewSummery,
    reviews,
    currentPage,
    rowsPerPage,
    loadingStatus,
    childLoadingStatus,
    handlePageChange,
  };
};

export default ReviewOverviewContainer;
