import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiContainer } from "../utils/api";
import { locationPath, method } from "../utils/constant";
import { SET_COMPANY_DATA } from "../redux/constants";
import { showToast } from "../utils/toastService";
import { useState } from "react";
import { ReactComponent as Working } from ".././assets/svg/lock.svg";
import { ReactComponent as Url } from ".././assets/svg/url.svg";
import { ReactComponent as Date } from ".././assets/svg/date.svg";
import { ReactComponent as Place } from ".././assets/svg/place.svg";
import { ReactComponent as RelationShip } from ".././assets/svg/relationship.svg";
import { equal, getMonth, getYear } from "../utils/javascript";
import { useNavigate } from "react-router-dom";
import { calculateRating } from "../utils/utilFunctions";

const LandingPageContainer = ({ formPath }) => {
  const { performRequest } = ApiContainer();
  const navigate = useNavigate();
  const [totalRate, setTotalRate] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const { companyData, reviewSummery, reviews } = useSelector(
    (state) => state.app?.company,
  );

  const childLoadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.child],
  );
  const companyId = useSelector((state) => state.app?.company?.companyId);
  const dispatch = useDispatch();
  const rowsPerPage = 10;

  useEffect(() => {
    if (companyId) {
      apiCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  useEffect(() => {
    setTotalRate(calculateRating(reviewSummery?.avgOverallScore));
  }, [reviewSummery?.avgOverallScore]);

  useEffect(() => {
    if (companyId) {
      getAllReviews(rowsPerPage, currentPage, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const companyDetail = [
    { icon: <Working />, desc: companyData?.workGoal || "-" },
    { icon: <Url />, desc: companyData?.websiteUrl },
    {
      icon: <Date />,
      desc: `Joined ${getMonth(companyData?.joinedAt)} ${getYear(
        companyData?.joinedAt,
      )}`,
    },
    { icon: <Place />, desc: `${companyData?.city}, ${companyData?.country}` },
    {
      icon: <RelationShip />,
      desc: `Green score is <b> ${reviewSummery?.greenScoreFlag}</b>`,
      needDangerouslySetInnerHTML: true,
    },
  ];

  const goToReviewPage = () => {
    return navigate(`/${companyId.concat(locationPath?.companyReview)}`);
  };

  const getCompanyProfileData = async () => {
    try {
      const response = await performRequest({
        endPoint: `company/${companyId}`,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath.parent,
      });

      if (equal(response?.statusCode, 404) || equal(response?.status, false))
        return setNotFound(true);
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const getAllReviews = async (
    rowsPerPage = 10,
    page = 1,
    storeInRedux = false,
  ) => {
    try {
      const response = await performRequest({
        endPoint: `company/${companyId}/reviews?perPage=${rowsPerPage}&page=${page}`,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath.child,
      });
      storeInRedux &&
        dispatch({
          type: SET_COMPANY_DATA,
          payload: {
            reviews: response?.data,
          },
        });
      return response;
    } catch (error) {
      showToast(error);
    }
  };
  const getReviewSummery = async () => {
    try {
      const response = await performRequest({
        endPoint: `company/${companyId}/review-summery`,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath.parent,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };
  const apiCall = async () => {
    try {
      const [companyData, reviewSummery, reviews] = await Promise.all([
        getCompanyProfileData(),
        getReviewSummery(),
        getAllReviews(),
      ]);

      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          companyData: companyData?.data,
          reviewSummery: reviewSummery?.data,
          reviews: reviews?.data,
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
    loadingStatus,
    companyData,
    notFound,
    reviewSummery,
    reviews,
    totalRate,
    companyDetail,
    goToReviewPage,
    handlePageChange,
    currentPage,
    childLoadingStatus,
    rowsPerPage,
  };
};

export default LandingPageContainer;
