import { useSelector } from "react-redux";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { equal, keys } from "../utils/javascript";
import { useEffect, useState } from "react";
import { showToast } from "../utils/toastService";
import { useTranslation } from "react-i18next";
import { saveStateFn } from "../utils/localStorage";

const SigUpPartialContainer = ({
  formData,
  validate,
  setError,
  formPath,
  activeDropdown,
}) => {
  const [termAndCondition, setTermAndCondition] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const { performRequest } = ApiContainer();
  const { t } = useTranslation();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  const countryCodeName = useSelector(
    (state) => state?.form?.pattern?.[formPath?.parent]?.countryCodeName,
  );

  useEffect(() => {
    setCountryCode(countryCodeName);
  }, [countryCodeName]);

  const apiCall = async () => {
    let clonedFormData = { ...formData };
    if (!termAndCondition) {
      showToast(t("agreeTermAndCondition"));
      return;
    }
    const { recommendation0, recommendation1, recommendation2, ...rest } =
      clonedFormData;
    clonedFormData = {
      ...rest,
      recommendation: [recommendation0, recommendation1, recommendation2],
      priceId: activeDropdown,
      termAndCondition,
    };
    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.signupPartial,
        method: method.post,
        data: { ...clonedFormData },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      if (res?.status && equal(res?.status, 200)) {
        const { url, companyName, workGoal } = res?.data;
        saveStateFn("companyName", companyName);
        saveStateFn("workGoal", workGoal);
        window.location.href = url;
      }
    } catch (error) {
      showToast(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    keys(formData).forEach((name) => {
      const error = validate(name, formData[name], countryCode);
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
    setTermAndCondition(!termAndCondition);
  };

  return { handleCheck, handleSubmit, loadingStatus };
};

export default SigUpPartialContainer;
