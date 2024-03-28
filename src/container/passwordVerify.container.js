import { ApiContainer } from "../utils/api";
import { useSelector } from "react-redux";
import { apiEndPoints, locationPath, method } from "../utils/constant";
import { equal, keys } from "../utils/javascript";
import { useEffect } from "react";
import { saveStateFn } from "../utils/localStorage";
import { useNavigate } from "react-router";
import { showToast } from "../utils/toastService";

const PasswordVerifyContainer = ({
  formData,
  formPath,
  validate,
  setError,
}) => {
  const navigate = useNavigate();
  const { performRequest } = ApiContainer();

  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    saveStateFn("token", token);
  }, []);

  const apiCall = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.verifyPassword,
        method: method.post,
        data: { ...formData },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
        headerKey: "token",
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const handleSubmit = async (e) => {
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
    const response = await apiCall();
    if (equal(response?.status, 200)) return navigate(locationPath?.login);
  };

  return { handleSubmit, formData, loadingStatus };
};

export default PasswordVerifyContainer;
