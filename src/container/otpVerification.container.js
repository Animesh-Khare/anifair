import { useEffect, useState } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, locationPath, method } from "../utils/constant";
import { loadStateFn, removeStateFn, saveStateFn } from "../utils/localStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { equal } from "../utils/javascript";
import { useSelector } from "react-redux";
import { isExpired } from "react-jwt";
import { showToast } from "../utils/toastService";

const OtpVerificationContainer = ({
  formPath,
  numberOfInputField,
  otpResendTime,
}) => {
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneVerify = JSON.parse(loadStateFn("phone-verify"));
  const [timer, setTimer] = useState(+loadStateFn("otp-time") || otpResendTime);

  useEffect(() => {
    verifyToken();

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      const message = "Are you sure you want to leave this page?";
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToCompanyReviewPage = () => {
    const companyId = loadStateFn("companyId");
    return navigate(`/${companyId}/company-review`, { replace: true });
  };
  useEffect(() => {
    if (!location.state?.allowedOtpPage) {
      goToCompanyReviewPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (timer !== 0) {
      setTimeout(() => {
        setTimer((preTime) => {
          saveStateFn("otp-time", preTime - 1);
          return preTime - 1;
        });
      }, 1000);
    }
  }, [timer]);

  const verifyToken = () => {
    const isTokenExpired = isExpired(phoneVerify?.token);
    if (!phoneVerify?.phone || isTokenExpired) {
      return navigate(-1, { replace: true });
    }
    return;
  };

  const loadingStatusSubmit = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const loadingStatusResend = useSelector(
    (state) => state.api?.loader?.[formPath?.child],
  );

  const { performRequest } = ApiContainer();

  const handleResendOTP = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.resendOTP,
        method: method.post,
        token: phoneVerify?.token,
        showToastMessage: true,
        parent: formPath?.child,
        needLoader: true,
      });

      if (equal(response?.status, false)) return verifyToken();
      setOtp();

      saveStateFn(
        "phone-verify",
        JSON.stringify({ ...phoneVerify, token: response?.data?.token }),
      );
      setTimer(otpResendTime);
    } catch (error) {
      showToast(error);
    }
  };

  const handleSubmitOTP = async () => {
    if (!otp || otp?.length < numberOfInputField) return setOtpError(true);

    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.verifyOTP,
        method: method.post,
        data: { otp },
        token: phoneVerify?.token,
        showToastMessage: true,
        parent: formPath?.parent,
        needLoader: true,
      });

      if (equal(response?.status, false)) return verifyToken();

      removeStateFn("phone-verify");
      removeStateFn("otp-time");

      return navigate(`${locationPath?.thanks}`, {
        state: { showThanksPage: true },
      });
    } catch (error) {
      showToast(error);
    }
  };

  const handleInputChange = (value) => {
    if (equal(value?.length, numberOfInputField)) setOtpError(false);
    setOtp(value);
  };

  return {
    otp,
    otpError,
    handleInputChange,
    handleResendOTP,
    handleSubmitOTP,
    phoneNumber: phoneVerify?.phone,
    timer,
    loadingStatusSubmit,
    loadingStatusResend,
  };
};

export default OtpVerificationContainer;
