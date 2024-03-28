/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { showToast } from "../../utils/toastService";
import { keys } from "../../utils/javascript";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const InviteInvitationContainer = ({
  formData,
  validate,
  setError,
  formPath,
  activeDropdown,
}) => {
  const { performRequest } = ApiContainer();

  const [invitationCount, setInvitationCount] = useState(0);

  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  useEffect(() => {
    getInvitationCount();
  }, []);

  const getInvitationCount = async () => {
    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.remainingInvitations,
        method: method.get,
        showToastMessage: false,
        needLoader: false,
        parent: formPath.parent,
      });
      setInvitationCount(res.data.count);
    } catch (error) {
      showToast(error);
    }
  };

  const apiCall = async () => {
    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.inviteInvitation,
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

  return {
    handleSubmit,
    loadingStatus,
    invitationCount,
  };
};

export default InviteInvitationContainer;
