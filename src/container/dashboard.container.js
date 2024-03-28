import { useEffect, useState } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, locationPath, method } from "../utils/constant";
import { showToast } from "../utils/toastService";
import { SET_COMPANY_DATA } from "../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import { defaultOptions, formPath } from "../description/dashboard.description";
import { useNavigate } from "react-router-dom";
import { equal } from "../utils/javascript";

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const childLoadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.child],
  );
  const { reviewSummery, reviews, averageRatings, visitors } = useSelector(
    (state) => state.app?.company,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(defaultOptions);

  const { performRequest } = ApiContainer();
  const rowsPerPage = 4;

  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllReviews(
      rowsPerPage,
      currentPage,
      selectedOption?.month,
      selectedOption?.order,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedOption]);

  const getReviewSummery = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.reviewSummery,
        method: method.get,
        showToastMessage: false,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const getAllReviews = async (rowsPerPage = 5, page = 1, month, star) => {
    const apiEndPointURL = `${apiEndPoints?.reviews}?perPage=${rowsPerPage}&page=${page}`;
    try {
      const response = await performRequest({
        endPoint: apiEndPointURL
          .concat(month ? `&month=${month}` : "")
          .concat(star ? `&star=${star}` : ""),
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

  const getAverageRating = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.avrgRatings,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath?.parent,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const getVisitorsSummary = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.visitors,
        method: method?.get,
        showToastMessage: false,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const apiCall = async () => {
    try {
      const [reviewSummery, averageRatings, visitors] = await Promise.all([
        getReviewSummery(),
        getAverageRating(),
        getVisitorsSummary(),
      ]);

      let avrgRatingData = averageRatings?.data?.averageRating;
      const averageRatingsClone = [];
      for (let i = 5; i > 0; i--) {
        const obj = avrgRatingData.find((data) => equal(data?._id, i));
        averageRatingsClone.push(obj ? obj : { _id: i, count: 0 });
      }
      averageRatings.data.averageRating = averageRatingsClone;

      if (averageRatings?.data?.redirectSignupPartial)
        return navigate(locationPath?.signupPartial);

      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          reviewSummery: reviewSummery?.data,
          averageRatings: averageRatings?.data,
          visitors: visitors?.data,
        },
      });
    } catch (error) {
      showToast(error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption({ ...selectedOption, [name]: value });
  };

  const calulatePerRatingPercentage = (count, total) => {
    if (!count || !total) return 0;
    return parseFloat((count / total) * 100);
  };

  return {
    loadingStatus,
    childLoadingStatus,
    reviewSummery,
    reviews,
    currentPage,
    averageRatings,
    visitors,
    rowsPerPage,
    selectedOption,
    handleOptionChange,
    handlePageChange,
    calulatePerRatingPercentage,
  };
};

export default DashboardContainer;
