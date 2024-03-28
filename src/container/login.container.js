import { useState } from "react";
import { keys, length } from "../utils/javascript";
import { useDispatch, useSelector } from "react-redux";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, locationPath, method } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { removeStateFn, saveStateFn } from "../utils/localStorage";
import { SET_APP_DATA } from "../redux/constants";
import { showToast } from "../utils/toastService";

const LoginContainer = ({ formData, validate, setError, formPath }) => {
  const [isPwdRemember, setIsPwdRemember] = useState(false);
  const { performRequest } = ApiContainer();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  const apiCall = async () => {
    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.login,
        method: method.post,
        data: { ...formData },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      if (res?.status) {
        const {
          access_token,
          redirectSignupPartial,
          accountType,
          companyName,
          workGoal,
          logoUrl,
        } = res?.data;
        if (length(access_token)) {
          saveStateFn("token", access_token);
          saveStateFn("isAuthenticated", true);
          saveStateFn("companyName", companyName);
          saveStateFn("workGoal", workGoal);
          saveStateFn("redirectSignupPartial", redirectSignupPartial);
          saveStateFn("accountType", accountType);
          saveStateFn("logoUrl", `${logoUrl}?date=${new Date()}`);
        }
        if (isPwdRemember) {
          saveStateFn("rememberedEmail", formData?.email);
          saveStateFn("rememberedPassword", formData?.password);
          saveStateFn("rememberMe", true);
        } else {
          removeStateFn("rememberedEmail");
          removeStateFn("rememberedPassword");
          removeStateFn("rememberMe");
        }
        navigate(
          redirectSignupPartial
            ? locationPath?.signupPartial
            : accountType
            ? locationPath?.dashboard
            : locationPath?.noSubscriptionPath,
        );
        dispatch({
          type: SET_APP_DATA,
          payload: { isAuthenticated: true, loginData: res?.data },
        });
      }
    } catch (error) {
      showToast(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    keys(formData).forEach((name) => {
      const error = validate(name, formData[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    apiCall();
  };

  const handleCheck = () => {
    setIsPwdRemember(!isPwdRemember);
  };

  return { handleCheck, handleSubmit, loadingStatus };
};

export default LoginContainer;
