import { useState } from "react";
import FYButton from "../../../shared/FYButton";
import FYDialog from "../../../shared/FYDialog";
import { ReactComponent as DeleteIcon } from "../../../assets/svg/deleteBin.svg";
import { useTranslation } from "react-i18next";
import { ApiContainer } from "../../../utils/api";
import { apiEndPoints, method } from "../../../utils/constant";
import { useDispatch } from "react-redux";
import { equal } from "../../../utils/javascript";
import { SET_COMPANY_DATA } from "../../../redux/constants";
import {
  formPath,
  limitPerPage,
} from "../../../description/reviews/reviewQuestions.description";
import { showToast } from "../../../utils/toastService";

const DeleteQuestion = ({ id, currentPage }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const { performRequest } = ApiContainer();

  const handleDeleteQuestion = async () => {
    setIsOpen(false);
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.reviewQuestions,
        method: method?.delete,
        data: {
          question: {
            _id: id,
            includeInReview: false,
          },
        },
        showToastMessage: true,
      });
      if (equal(response?.status, 200)) {
        try {
          const res = await performRequest({
            endPoint: `${apiEndPoints?.reviewQuestions}?perPage=${limitPerPage}&page=${currentPage}`,
            method: method?.get,
            needLoader: true,
            parent: formPath?.parent,
          });
          dispatch({
            type: SET_COMPANY_DATA,
            payload: {
              questions: res?.data,
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
      label: "Yes",
      onClick: handleDeleteQuestion,
      variant: "contained",
    },
    {
      label: "No",
      onClick: handleOnClose,
    },
  ];
  return (
    <>
      <FYButton onClick={handleDeleteClick}>
        <DeleteIcon />
      </FYButton>
      <FYDialog
        open={isOpen}
        onClose={handleOnClose}
        content={t("deleteAlert")}
        actions={
          <>
            {dialogActions.map(({ label, onClick, variant }, index) => (
              <FYButton key={index} onClick={onClick} variant={variant}>
                {label}
              </FYButton>
            ))}
          </>
        }
      />
    </>
  );
};

export default DeleteQuestion;
