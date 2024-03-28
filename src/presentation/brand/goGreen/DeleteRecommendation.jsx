import { useState } from "react";
import FYButton from "../../../shared/FYButton";
import FYDialog from "../../../shared/FYDialog";
import { ReactComponent as DeleteIcon } from "../../../assets/svg/deleteBin.svg";
import { useTranslation } from "react-i18next";
import { ApiContainer } from "../../../utils/api";
import { apiEndPoints, method } from "../../../utils/constant";
import { useDispatch } from "react-redux";
import { equal, length } from "../../../utils/javascript";
import { SET_COMPANY_DATA } from "../../../redux/constants";
import { formPath } from "../../../description/reviews/reviewQuestions.description";
import { showToast } from "../../../utils/toastService";

const DeleteRecommendation = ({ id, recommendations }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const minRecommendations = length(recommendations?.recommendation) <= 3;
  const { performRequest } = ApiContainer();

  const handleDeleteRecommendation = async () => {
    setIsOpen(false);
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.brandRecommendation,
        method: method?.delete,
        data: {
          recommendation: {
            _id: id,
            includeInReview: false,
          },
        },
        showToastMessage: true,
      });
      if (equal(response?.status, 200)) {
        try {
          const res = await performRequest({
            endPoint: apiEndPoints?.brandRecommendation,
            method: method?.get,
            needLoader: true,
            parent: formPath?.parent,
          });
          dispatch({
            type: SET_COMPANY_DATA,
            payload: {
              recommendations: res?.data,
            },
          });
        } catch (error) {
          showToast(error);
        }
      }
    } catch (error) {
      showToast(error);
    }
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const dialogActions = [
    {
      label: "yes",
      onClick: handleDeleteRecommendation,
      variant: "contained",
    },
    {
      label: "no",
      onClick: handleOnClose,
    },
  ];
  return (
    <>
      <span title={minRecommendations && t("minRecommendations")}>
        <FYButton
          onClick={handleDeleteClick}
          isDisable={minRecommendations && true}
        >
          <DeleteIcon opacity={minRecommendations ? 0.3 : 1} />
        </FYButton>
      </span>
      <FYDialog
        open={isOpen}
        onClose={handleOnClose}
        content={t("deleteAlert")}
        actions={
          <>
            {dialogActions.map(({ label, onClick, variant }, index) => (
              <FYButton key={index} onClick={onClick} variant={variant}>
                {t([label])}
              </FYButton>
            ))}
          </>
        }
      />
    </>
  );
};

export default DeleteRecommendation;
