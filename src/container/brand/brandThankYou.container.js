/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { formPath } from "../../description/brand/brandThankYou.description";
import { showToast } from "../../utils/toastService";
import { SET_COMPANY_DATA } from "../../redux/constants";
import { useDispatch, useSelector } from "react-redux";

const BrandThankYouContainer = () => {
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [thankyouMessage, setThankyouMessage] = useState({
    thankyouMessage: "",
  });
  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();

  const thankYouTemplate = useSelector(
    (state) => state.app?.company?.thankYouTemplate,
  );

  useEffect(() => {
    getThankYouTemplate();
  }, []);

  useEffect(() => {
    if (thankYouTemplate) {
      setFormData({
        ...formData,
        subject: thankYouTemplate?.subject,
        message: thankYouTemplate?.message,
      });
      setThankyouMessage({
        ...thankyouMessage,
        thankyouMessage: thankYouTemplate?.thankyouMessage,
      });
    }
  }, [thankYouTemplate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMessageChange = (e, data) => {
    setFormData({ ...formData, message: data.getData() });
  };

  const handleThankYouMessageChange = (e) => {
    const { name, value } = e.target;
    setThankyouMessage({ ...thankyouMessage, [name]: value });
  };

  const getThankYouTemplate = async () => {
    try {
      const response = await performRequest({
        endPoint: "brand/thank-you",
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath.parent,
      });
      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          thankYouTemplate: response?.data,
        },
      });
    } catch (error) {
      showToast();
    }
  };

  const handleStaticThanksSave = async (event) => {
    event.preventDefault();
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.thankYouMessage,
        method: method.patch,
        data: thankyouMessage,
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.template,
        method: method.patch,
        data: { template: { _id: thankYouTemplate?._id, ...formData } },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.template,
        method: method.put,
        data: { templateId: thankYouTemplate?._id },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  return {
    formData,
    handleChange,
    handleMessageChange,
    handleSave,
    thankyouMessage,
    handleReset,
    handleStaticThanksSave,
    handleThankYouMessageChange,
  };
};

export default BrandThankYouContainer;
