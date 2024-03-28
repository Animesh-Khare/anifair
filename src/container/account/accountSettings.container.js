/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { formPath } from "../../description/account/accountSettings.description";
import { useEffect } from "react";
import { showToast } from "../../utils/toastService";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, locationPath, method } from "../../utils/constant";
import { SET_COMPANY_DATA } from "../../redux/constants";
import { useNavigate } from "react-router-dom";
import { equal } from "../../utils/javascript";

const AccountSettingsContainer = () => {
  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const { accountDetail } = useSelector((state) => state.app?.company);

  const getAccountDetails = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.accountProfile,
        method: method?.get,
        parent: formPath?.parent,
        showToastMessage: false,
      });
      if (response?.status && equal(response?.status, 200)) {
        dispatch({
          type: SET_COMPANY_DATA,
          payload: {
            accountDetail: response?.data,
          },
        });
      }
      if (equal(response?.statusCode, 402)) {
        navigate(locationPath?.subscriptionOffer);
      }
    } catch (error) {
      showToast(error);
    }
  };

  useEffect(() => {
    getAccountDetails();
  }, []);

  return {
    loadingStatus,
    accountDetail,
  };
};

export default AccountSettingsContainer;
