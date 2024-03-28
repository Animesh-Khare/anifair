/* eslint-disable react-hooks/exhaustive-deps */
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { formPath } from "../../description/forgotPassword.description";
import { showToast } from "../../utils/toastService";
import { SET_COMPANY_DATA } from "../../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { equal } from "../../utils/javascript";

const BrandViewProfileContainer = () => {
  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();

  const companyUrl = useSelector((state) => state.app?.company?.companyUrl);

  useEffect(() => {
    getCompanyUrl();
  }, []);

  const getCompanyUrl = async () => {
    try {
      const companyUrl = await performRequest({
        endPoint: apiEndPoints?.profilePageLink,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath.parent,
      });
      if (companyUrl?.status && equal(companyUrl?.status, 200)) {
        const { link } = companyUrl?.data;
        window.location.href = link;
      }
      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          companyUrl: companyUrl?.data,
        },
      });
    } catch (error) {
      showToast();
    }
  };
  return { companyUrl };
};

export default BrandViewProfileContainer;
