import { useEffect, useState } from "react";
import { ApiContainer } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  apiEndPoints,
  locationPath,
  method,
  scoreMap,
} from "../utils/constant";
import { SET_COMPANY_DATA } from "../redux/constants";
import FYCheckbox from "../shared/FYCheckbox";
import FYRating from "../shared/FYRating";
import FYTypography from "../shared/FYTypography";
import FYTextField from "../shared/FYTextField";
import {
  checkUndefined,
  equal,
  isArray,
  keys,
  length,
  typeOf,
} from "../utils/javascript";
import { getAllCities, reverseObject } from "../helpers/util";
import FYStack from "../shared/FYStack";
import { useLocation, useNavigate } from "react-router-dom";
import { saveStateFn } from "../utils/localStorage";
import { formPath } from "../description/companyReview.description";
import { notEmpty } from "../utils/regex";
import { showToast } from "../utils/toastService";

const CompanyReviewContainer = ({ formData, validate, setError, formPath }) => {
  const companyId = useSelector((state) => state.app?.company?.companyId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [answers, setAnswers] = useState({});
  const [votedButtons, setVotedButtons] = useState([]);
  const [countryCode, setCountryCode] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { performRequest } = ApiContainer();
  const countryCodeName = useSelector(
    (state) => state?.form?.pattern?.[formPath?.parent]?.countryCodeName,
  );

  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  const childLoadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.child],
  );

  const childObjectLoadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.childObject],
  );

  const anotherChildObjectLoadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.anotherChildObject],
  );

  const recommendations = useSelector(
    (state) => state?.app?.company?.recommendations,
  );

  const companyBasicInfo = useSelector(
    (state) => state?.app?.company?.basicInfo,
  );

  const extraQues = useSelector((state) => state?.app?.company?.extraQuestion);

  useEffect(() => {
    setCountryCode(countryCodeName);
  }, [countryCodeName]);

  useEffect(() => {
    if (companyId) {
      getReviewInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const handleQuestionAns = (id, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: answer,
    }));

    if (!extraQues?.question?.find((que) => equal(que?._id, id))?.isRequired)
      return;

    let validationError = false;
    if (
      checkUndefined(answer) ||
      !notEmpty(answer) ||
      (typeOf(answer, "number") && isNaN(answer)) ||
      ((typeOf(answer, "string") || isArray(answer)) && !length(answer))
    ) {
      validationError = true;
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validationError,
    }));
  };

  const getCompanyBasicInfo = async () => {
    try {
      const response = await performRequest({
        endPoint: `company/${companyId}/basic-info`,
        method: method.get,
        needLoader: true,
        parent: formPath.anotherChildObject,
        showToastMessage: false,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const renderInputForQuestion = (question) => {
    switch (question.type) {
      case "CHECKBOX":
        return (
          <FYStack direction="row" alignItems="center" spacing={1}>
            {question?.option?.map((option) => {
              const isChecked = (answers[question._id] || []).includes(option);

              return (
                option !== "" && (
                  <FYStack direction="row" alignItems="center" key={option}>
                    <FYCheckbox
                      checked={isChecked}
                      onChange={() => {
                        handleQuestionAns(
                          question._id,
                          isChecked
                            ? answers[question._id].filter(
                                (ans) => ans !== option,
                              )
                            : [...(answers[question._id] || []), option],
                        );
                      }}
                    />
                    <FYTypography>{option}</FYTypography>
                  </FYStack>
                )
              );
            })}
          </FYStack>
        );
      case "RATING":
        return (
          <FYRating
            precision={0.5}
            value={reverseObject(scoreMap)[answers[question._id]] || 0}
            onChange={(e) => {
              const { value } = e.target;
              handleQuestionAns(question._id, scoreMap[value]);
            }}
          />
        );
      case "TEXT":
        return (
          <FYTextField
            sx={{ p: 0 }}
            value={answers[question._id] || ""}
            onChange={(event) => {
              handleQuestionAns(question._id, event.target.value);
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleRecommendations = async () => {
    try {
      const response = await performRequest({
        endPoint: `company/${companyId}/recommendation`,
        method: method.get,
        needLoader: true,
        parent: formPath.child,
        showToastMessage: false,
      });
      if (equal(response?.statusCode, 404) || equal(response?.status, false))
        return setNotFound(true);
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const handleExtraQuestions = async () => {
    try {
      const response = await performRequest({
        endPoint: `company/${companyId}/question`,
        method: method.get,
        needLoader: true,
        parent: formPath.childObject,
        showToastMessage: false,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const getReviewInfo = async () => {
    const [basicInfo, recommendations, extraQuestion] = await Promise.all([
      getCompanyBasicInfo(),
      handleRecommendations(),
      handleExtraQuestions(),
    ]);

    dispatch({
      type: SET_COMPANY_DATA,
      payload: {
        basicInfo: basicInfo?.data,
        recommendations: recommendations?.data,
        extraQuestion: extraQuestion?.data,
      },
    });
  };

  const handleVoteButtonClick = (id) => {
    if (votedButtons.length < 2 && !votedButtons.includes(id)) {
      setVotedButtons((prevVotedButtons) => [...prevVotedButtons, id]);
    } else {
      if (votedButtons.includes(id)) {
        setVotedButtons((prevVotedButtons) =>
          prevVotedButtons.filter((buttonId) => buttonId !== id),
        );
      }
    }
  };

  const apiCall = async () => {
    const reviewAspects = extraQues?.question?.map((obj) => obj?._id);

    const allAnswers = Object.entries(answers).map(([id, answer]) => {
      return {
        _id: id,
        answer:
          equal(answer?.length, 0) || equal(answer, "") || answer === undefined
            ? null
            : answer,
      };
    });

    reviewAspects?.forEach((id) => {
      const foundAspect = allAnswers?.find((aspect) => equal(aspect?._id, id));
      if (!foundAspect) {
        allAnswers.push({ _id: id, answer: null });
      }
    });

    const payload = {
      ...formData,
      greenScore: scoreMap[formData.greenScore],
      overallScore: scoreMap[formData.overallScore],
      reviewAspects: allAnswers,
      recommendation: length(votedButtons) ? votedButtons : null,
      companyId,
      termAndCondition: true,
    };
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.addReview,
        method: method.post,
        data: { ...payload },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });

      if (response?.status === false) return;

      saveStateFn(
        "phone-verify",
        JSON.stringify({
          token: response?.data?.token,
          phone: response?.data?.phoneNumber,
        }),
      );
      saveStateFn("otp-time", 0);
      return navigate(`${location.pathname.concat(locationPath.verifyOTP)}`, {
        state: { allowedOtpPage: true },
      });
    } catch (error) {
      showToast(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValidationErrors = {};

    extraQues?.question?.forEach((question) => {
      if (question.isRequired) {
        if (
          (equal(question.type, "CHECKBOX") &&
            !(answers[question._id] || []).length) ||
          !answers[question._id]
        ) {
          newValidationErrors[question._id] = true;
        }
      }
    });
    setValidationErrors(newValidationErrors);
    let validationErrors = {};
    keys(formData).forEach((name) => {
      const error = validate(name, formData[name], countryCode);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });

    const allErrors = { ...newValidationErrors, ...validationErrors };

    if (keys(allErrors).length > 0) {
      setError(allErrors);
      return;
    }

    apiCall();
  };

  return {
    childLoadingStatus,
    childObjectLoadingStatus,
    anotherChildObjectLoadingStatus,
    recommendations,
    companyBasicInfo,
    notFound,
    extraQues,
    handleSubmit,
    handleRecommendations,
    handleExtraQuestions,
    renderInputForQuestion,
    handleVoteButtonClick,
    votedButtons,
    validationErrors,
    loadingStatus,
  };
};

export default CompanyReviewContainer;

export const CompanyReviewHelper = ({ attribute }) => {
  const countryCodeNumber = useSelector(
    (state) => state?.form?.pattern?.[formPath?.parent]?.countryCodeNumber,
  );

  const selectedLanguage = useSelector((state) => state?.app?.auth?.language);

  const [clonedAttribute, setClonedAttribute] = useState([...attribute]);

  useEffect(() => {
    const setDropdown = async () => {
      const cityOptions = await getAllCities(
        countryCodeNumber
          ? countryCodeNumber
          : equal(selectedLanguage, "nl")
          ? "31"
          : "1",
      );
      setClonedAttribute((prevAttribute) => {
        const cityAttribute = prevAttribute?.find((obj) =>
          equal(obj?.name, "city"),
        );
        if (cityAttribute) {
          cityAttribute.options = cityOptions;
        }
        return [...prevAttribute];
      });
    };
    setDropdown();
  }, [countryCodeNumber, selectedLanguage]);

  useEffect(() => {
    setClonedAttribute((prevAttribute) => {
      const phoneAttribute = prevAttribute?.find((obj) =>
        equal(obj?.name, "phoneNumber"),
      );
      phoneAttribute.country = equal(selectedLanguage, "nl") ? "nl" : "us";
      return [...prevAttribute];
    });
  }, [selectedLanguage]);
  return { clonedAttribute };
};
