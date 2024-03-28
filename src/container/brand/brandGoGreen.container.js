import { useDispatch, useSelector } from "react-redux";
import { SET_COMPANY_DATA } from "../../redux/constants";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { showToast } from "../../utils/toastService";
import { useEffect, useState } from "react";

const BrandGoGreenContainer = ({ formPath }) => {
  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();
  const [showAddRecommendation, setShowAddRecommendation] = useState(false);

  const { recommendations } = useSelector((state) => state.app?.company);
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.child],
  );

  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddRecommendationClick = () => {
    setShowAddRecommendation(!showAddRecommendation);
  };

  const getRecommendations = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.brandRecommendation,
        method: method.get,
        needLoader: true,
        parent: formPath.child,
        showToastMessage: false,
      });

      return response;
    } catch (error) {
      showToast(error);
    }
  };
  const apiCall = async () => {
    try {
      const [recommendations] = await Promise.all([getRecommendations()]);

      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          recommendations: recommendations?.data,
        },
      });
    } catch (error) {
      showToast(error);
    }
  };
  return {
    recommendations,
    loadingStatus,
    showAddRecommendation,
    handleAddRecommendationClick,
  };
};

export default BrandGoGreenContainer;
