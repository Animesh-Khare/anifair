import { useSelector } from "react-redux";
import { ApiContainer } from "../utils/api";
import { equal, keys } from "../utils/javascript";
import { apiEndPoints, locationPath, method } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toastService";

const SignupContainer = ({ formData, validate, setError, formPath }) => {
  const navigate = useNavigate();
  const { performRequest } = ApiContainer();

  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  const apiCall = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.signup,
        method: method.post,
        data: { ...formData },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      if (equal(response?.status, 200))
        return navigate(locationPath?.checkEmail, {
          state: { showCheckEmail: true },
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

  return { handleSubmit, formData, loadingStatus };
};

export default SignupContainer;
