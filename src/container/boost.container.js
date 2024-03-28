/* eslint-disable react-hooks/exhaustive-deps */
import { ApiContainer } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { apiEndPoints, locationPath, method } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toastService";
import { useEffect, useState } from "react";
import { equal, head, isObjectEmpty } from "../utils/javascript";
import { SET_COMPANY_DATA } from "../redux/constants";

const BoostContainer = ({ formPath }) => {
  const { performRequest } = ApiContainer();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const planList = useSelector((state) => state.app?.company?.plan);
  const findPlan = planList?.data?.map(
    ({ id, interval, currentPlan }) => currentPlan && { id, interval },
  );
  const selectedPlan = findPlan?.filter((item) => item !== undefined);
  const [formData, setFromData] = useState({});
  const [checkSwitch, setCheckSwitch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSwitch = () => {
    setCheckSwitch(!checkSwitch);
  };

  useEffect(() => {
    equal(head(selectedPlan)?.interval, "year") && setCheckSwitch(true);
  }, [head(selectedPlan)?.interval]);

  const apiCall = async () => {
    let clonedFormData = formData;

    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.subscription,
        method: method.put,
        data: { ...clonedFormData },
        parent: formPath.parent,
        showToastMessage: true,
      });
      if (equal(res?.status && res?.status, 200)) {
        const { url } = res?.data;
        window.location.href = url;
      }
      if (equal(!res?.status && res?.statusCode, 409)) {
        navigate(locationPath?.dashboard);
      }
    } catch (error) {
      showToast(error);
    }
  };

  const getPlanSummary = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.subscriptionPriceList,
        method: method?.get,
        showToastMessage: false,
      });
      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          plan: response?.data,
        },
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const handleSubmit = (e, value) => {
    e.preventDefault();
    setFromData({ priceId: value });
  };

  useEffect(() => {
    if (!isObjectEmpty(formData)) {
      apiCall();
    }
  }, [formData]);

  useEffect(() => {
    getPlanSummary();
  }, []);

  return {
    handleSubmit,
    loadingStatus,
    selectedPlan,
    handleSwitch,
    checkSwitch,
  };
};

export default BoostContainer;
