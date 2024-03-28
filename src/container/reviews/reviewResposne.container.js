import { useEffect, useState } from "react";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import {
  defaultOptions,
  formPath,
  perPage,
  resposneMinLength,
} from "../../description/reviews/reviewResposne.description";
import { useDispatch, useSelector } from "react-redux";
import { SET_COMPANY_DATA, SET_REPLY } from "../../redux/constants";
import FYTypography from "../../shared/FYTypography";
import FYRating from "../../shared/FYRating";
import { equal, length, strDateToISODate } from "../../utils/javascript";
import { showToast } from "../../utils/toastService";
import { useTranslation } from "react-i18next";
import { calculateRating } from "../../utils/utilFunctions";

const ReviewResponseContainer = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const { detailReviews } = useSelector((state) => state.app?.company);
  const { performRequest } = ApiContainer();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(defaultOptions);
  const date = new Date();
  const [dateRange, setDateRange] = useState([date.setDate(1), new Date()]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const getReviewsDetails = async () => {
      const apiEndPointURL = `${
        apiEndPoints?.reviewsDetails
      }?perPage=${perPage}&page=${currentPage}&startDate=${strDateToISODate(
        startDate,
      )}&endDate=${strDateToISODate(endDate)}`;
      try {
        const response = await performRequest({
          endPoint: apiEndPointURL.concat(
            selectedOption?.star ? `&star=${selectedOption?.star}` : "",
          ),
          method: method?.get,
          needLoader: true,
          parent: formPath?.parent,
          showToastMessage: false,
        });
        dispatch({
          type: SET_COMPANY_DATA,
          payload: {
            detailReviews: response?.data,
          },
        });
      } catch (error) {
        showToast(error);
      }
    };
    if (endDate) {
      getReviewsDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedOption, dateRange]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption({ ...selectedOption, [name]: value });
  };

  const handleDateChange = (update) => {
    setDateRange(update);
  };

  return {
    loadingStatus,
    detailReviews,
    currentPage,
    selectedOption,
    startDate,
    endDate,
    handleDateChange,
    handlePageChange,
    handleOptionChange,
  };
};

export default ReviewResponseContainer;

export const ReviewDetailsContainer = ({ id, reply }) => {
  const { t } = useTranslation();
  const childLoadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.child],
  );
  const [showForm, setShowForm] = useState(false);
  const [checked, setChecked] = useState({
    termAndCondition: false,
  });
  const [responseMsg, setResposneMsg] = useState("");
  const [previousReply, setPreviousReply] = useState(reply);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const replyData = useSelector((state) => state.app?.company?.detailReviews);
  const { performRequest } = ApiContainer();

  const handleReportClick = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = () => {
    setShowForm(!showForm);
    setResposneMsg(previousReply);
  };

  const handleCheck = (event) => {
    const { name } = event.target;
    setChecked({ ...checked, [name]: !checked[name] });
  };

  const validateResponse = (value) => {
    const isValid = length(value) >= resposneMinLength;
    setIsError(!isValid);
    return isValid;
  };

  const handleResponseChange = (event) => {
    const { value } = event?.target;
    validateResponse(value);
    setResposneMsg(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isUnchecked = Object.values(checked).some((check) =>
      equal(check, false),
    );

    if (isUnchecked) return showToast(t("agreeTermAndCondition"));

    const isValid = validateResponse(responseMsg);
    if (!isValid) return;

    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.reviewResponse,
        method: method?.post,
        data: { reviewId: id, responseText: responseMsg },
        showToastMessage: false,
        needLoader: true,
        parent: formPath?.child,
      });
      if (equal(response?.status, 200)) {
        setShowForm(false);
        setPreviousReply(responseMsg);
        replyData?.data?.map(({ _id }, index) => {
          if (equal(_id, id)) {
            dispatch({
              type: SET_REPLY,
              payload: {
                index: index,
                info: response?.data?.response,
              },
            });
          }
          return { _id, response };
        });
      }
    } catch (error) {
      showToast(error);
    }
  };

  const renderAnswerForQuestions = (question) => {
    switch (question?.type) {
      case "CHECKBOX":
      case "TEXT":
        return (
          <FYTypography>
            {Array.isArray(question?.answer)
              ? question?.answer?.join(", ")
              : question?.answer
              ? question?.answer
              : "-"}
          </FYTypography>
        );
      case "RATING":
        return (
          <FYRating
            readOnly
            precision={0.5}
            value={calculateRating(question?.answer)}
          />
        );

      default:
        return null;
    }
  };
  return {
    renderAnswerForQuestions,
    showForm,
    isError,
    responseMsg,
    previousReply,
    checked,
    childLoadingStatus,
    handleReportClick,
    handleEditClick,
    handleCheck,
    handleResponseChange,
    handleSubmit,
  };
};
