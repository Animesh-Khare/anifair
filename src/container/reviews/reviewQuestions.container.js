import { useEffect, useState } from "react";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import {
  formPath,
  limitPerPage,
} from "../../description/reviews/reviewQuestions.description";
import { useDispatch, useSelector } from "react-redux";
import { SET_COMPANY_DATA } from "../../redux/constants";
import FYTableCell from "../../shared/FYTableCell";
import FYStack from "../../shared/FYStack";
import FYRating from "../../shared/FYRating";
import { showToast } from "../../utils/toastService";
import FYTypography from "../../shared/FYTypography";

const ReviewQuestionsContainer = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );
  const { questions } = useSelector((state) => state.app?.company);

  const [showAddQue, setShowAddQue] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { performRequest } = ApiContainer();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await performRequest({
          endPoint: `${apiEndPoints?.reviewQuestions}?perPage=${limitPerPage}&page=${currentPage}`,
          method: method?.get,
          needLoader: true,
          parent: formPath?.parent,
          showToastMessage: false,
        });
        dispatch({
          type: SET_COMPANY_DATA,
          payload: {
            questions: response?.data,
          },
        });
      } catch (error) {
        showToast(error);
      }
    };
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const renderQuestionsType = (data) => {
    switch (data?.type) {
      case "CHECKBOX":
        return (
          <>
            {Array(3)
              .fill(3)
              .map((_, index) => (
                <FYTableCell key={index}>
                  <FYStack
                    border="1px solid rgba(53, 70, 171, 0.30)"
                    p={1}
                    borderRadius={1.1}
                    flex={1}
                  >
                    <FYTypography color="black.secondary">
                      {data?.option?.[index] || "N/A"}
                    </FYTypography>
                  </FYStack>
                </FYTableCell>
              ))}
          </>
        );
      case "RATING":
        return (
          <FYTableCell colSpan={3} align="center">
            <FYRating precision={0.5} value={10} readOnly />
          </FYTableCell>
        );
      case "TEXT":
        return (
          <FYTableCell colSpan={3}>
            <FYStack
              border="1px solid rgba(53, 70, 171, 0.30)"
              p={1}
              borderRadius={1.1}
              flex={1}
              sx={{ height: 39 }}
            ></FYStack>
          </FYTableCell>
        );

      default:
        return null;
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddQuestionClick = () => {
    setShowAddQue(!showAddQue);
  };

  return {
    loadingStatus,
    questions,
    showAddQue,
    currentPage,
    handlePageChange,
    renderQuestionsType,
    handleAddQuestionClick,
  };
};

export default ReviewQuestionsContainer;
