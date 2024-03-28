import { ApiContainer } from "../utils/api";
import { useSelector } from "react-redux";
import { apiEndPoints, locationPath, method } from "../utils/constant";
import { equal, keys } from "../utils/javascript";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toastService";

const SubscriptionContainer = ({
  formData,
  validate,
  setError,
  formPath,
  activeDropdown,
}) => {
  const { performRequest } = ApiContainer();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const navigate = useNavigate();
  const { ...rest } = formData;

  const apiCall = async () => {
    let clonedFormData = { ...rest, priceId: activeDropdown };

    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.subscription,
        method: method.post,
        data: { ...clonedFormData },
        parent: formPath.parent,
        showToastMessage: true,
      });
      if (res?.status && equal(res?.status, 200)) {
        const { url } = res?.data;
        window.location.href = url;
      }
      if (!res?.status && equal(res?.statusCode, 409)) {
        navigate(locationPath?.dashboard);
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

  return { handleSubmit, loadingStatus };
};

export default SubscriptionContainer;
