/* eslint-disable no-unused-vars */
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOADING_CHANGE, LOGOUT } from "../redux/constants";
import { equal, isArray, keys } from "./javascript";
import { showToast } from "../utils/toastService";
import { loadStateFn } from "./localStorage";
import { locationPath } from "./constant";

export const ApiContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutUser = () => {
    localStorage?.clear();
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  const performRequest = ({
    endPoint,
    method,
    data,
    showToastMessage = false,
    successToastMessage = "",
    errorToastMessage = "",
    responseType = "",
    needLoader = false,
    parent = "",
    headerKey = "Authorization",
    token = "",
  }) =>
    new Promise((resolve) => {
      const accessToken = loadStateFn("token");
      const headers = {
        "Content-Type": keys(data).includes("file")
          ? "multipart/form-data"
          : "application/json",
        ...(accessToken &&
          (equal(headerKey, "Authorization")
            ? { [headerKey]: `Bearer ${accessToken}` }
            : { [headerKey]: accessToken })),
        ...(token && { token }),
      };
      if (needLoader) {
        dispatch({ type: LOADING_CHANGE, payload: { [parent]: true } });
      }
      axios({
        method,
        url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
        data,
        headers,
        responseType,
      })
        .then((response) => {
          if (showToastMessage) {
            showToast(
              successToastMessage || response?.data?.message,
              "success",
            );
          }

          if (needLoader) {
            dispatch({ type: LOADING_CHANGE, payload: { [parent]: false } });
          }
          return resolve({
            data: response?.data?.data || response?.data,
            status: response?.status,
            headers: response?.headers,
          });
        })
        .catch((error) => {
          if (equal(error?.response?.status, 401)) {
            // logOutUser();
          }
          let errorMessage;
          if (
            error?.response?.data?.error?.length &&
            isArray(error?.response?.data?.error)
          ) {
            const firstError = error?.response?.data?.error[0];
            errorMessage = firstError.message;
          } else if (error?.response?.data?.error) {
            errorMessage = error.response.data.error;
          } else if (error?.response?.data?.message) {
            errorMessage = error?.response?.data?.message;
          } else {
            errorMessage = "An error occurred";
          }

          const toastMessage = errorToastMessage || errorMessage;

          if (showToastMessage) {
            showToast(toastMessage, "error");
          }
          if (needLoader) {
            dispatch({ type: LOADING_CHANGE, payload: { [parent]: false } });
          }
          if (equal(error?.response?.status, 402)) {
            // navigate(locationPath?.subscriptionOffer);
            navigate(locationPath?.noSubscriptionPath, {
              state: { toastMessage },
            });
          }
          return resolve({
            status: false,
            error: data?.message,
            error_code: data?.status_code,
            statusCode: error?.response?.status,
            data,
          });
        });
    });
  return {
    performRequest,
  };
};
