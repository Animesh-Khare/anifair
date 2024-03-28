import { useSelector } from "react-redux";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { keys } from "../utils/javascript";
import { showToast } from "../utils/toastService";

const ForgotPasswordContainer = ({
  formData,
  validate,
  setError,
  formPath,
}) => {
  const { performRequest } = ApiContainer();

  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  const apiCall = async () => {
    try {
      performRequest({
        endPoint: apiEndPoints?.forgotPassword,
        method: method.post,
        data: { ...formData },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
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

export default ForgotPasswordContainer;
