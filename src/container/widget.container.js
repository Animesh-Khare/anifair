/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { SET_COMPANY_DATA } from "../redux/constants";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { showToast } from "../utils/toastService";
import { useDispatch, useSelector } from "react-redux";
import { equal } from "../utils/javascript";

const WidgetContainer = ({ formData, formPath, setFormData }) => {
  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();

  const widgetInfo = useSelector((state) => state.app?.company?.widgetInfo);
  const ReviewPageLink = useSelector(
    (state) => state.app?.company?.ReviewPageLink,
  );

  useEffect(() => {
    getWidgetInfo();
    getReviewPageLink();
  }, []);

  useEffect(() => {
    if (widgetInfo) {
      setFormData(widgetInfo?.widgetData);
    }
  }, [widgetInfo?.widgetData]);

  const getWidgetInfo = async () => {
    try {
      const widgetInfo = await performRequest({
        endPoint: apiEndPoints?.widget,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath.parent,
      });
      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          widgetInfo: widgetInfo?.data,
        },
      });
    } catch (error) {
      showToast();
    }
  };

  const getReviewPageLink = async () => {
    try {
      const reviewPageLink = await performRequest({
        endPoint: apiEndPoints?.profilePageLink,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath.parent,
      });
      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          ReviewPageLink: reviewPageLink?.data,
        },
      });
    } catch (error) {
      showToast();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await performRequest({
        endPoint: "widget",
        method: method.put,
        data: { ...formData },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      if (equal(res.status, 200)) {
        dispatch({
          type: SET_COMPANY_DATA,
          payload: {
            widgetInfo: { ...widgetInfo, widgetData: res?.data },
          },
        });
      }
    } catch (error) {
      showToast(error);
    }
  };

  return { handleSubmit, widgetInfo, ReviewPageLink };
};

export default WidgetContainer;
