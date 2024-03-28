import { useEffect } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useSelector } from "react-redux";
import { saveStateFn } from "../utils/localStorage";
import { equal } from "../utils/javascript";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toastService";

const EmailVerifyContainer = ({ formPath }) => {
  const { performRequest } = ApiContainer();
  const navigate = useNavigate();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    saveStateFn("token", token);

    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiCall = async () => {
    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.verifyEmail,
        method: method.post,
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
        headerKey: "token",
      });
      if (equal(res.status, 200)) {
        navigate("/login");
      }
    } catch (error) {
      showToast(error);
    }
  };

  return { apiCall, loadingStatus };
};

export default EmailVerifyContainer;
