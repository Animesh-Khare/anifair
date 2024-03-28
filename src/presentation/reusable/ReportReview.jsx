import FYBox from "../../shared/FYBox";
import { ReactComponent as ReportFlag } from "../../assets/svg/flag.svg";
import FYDialog from "../../shared/FYDialog";
import FYButton from "../../shared/FYButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { equal } from "../../utils/javascript";
import { showToast } from "../../utils/toastService";
import { useDispatch, useSelector } from "react-redux";
import { SET_REPORT } from "../../redux/constants";

const ReportReview = ({ id, disabled }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(disabled);
  const reportData = useSelector((state) => state.app?.company?.reviews);
  const dispatch = useDispatch();

  const { performRequest } = ApiContainer();

  const handleOnClose = () => {
    setIsOpen(false);
  };
  const handleReportClick = () => {
    setIsOpen(true);
  };

  const reportReviewWithId = async () => {
    setIsOpen(false);
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.reviewReport,
        method: method.post,
        showToastMessage: true,
        data: { _id: id },
      });
      if (equal(response?.status, 200)) {
        reportData?.data?.map(({ _id }, index) => {
          if (equal(_id, id)) {
            dispatch({
              type: SET_REPORT,
              payload: {
                index: index,
                info: true,
              },
            });
          }
          return { _id, response };
        });
        setIsDisable(true);
      }
    } catch (error) {
      showToast(error);
    }
  };

  const dialogActions = [
    {
      label: "Yes",
      onClick: reportReviewWithId,
      variant: "contained",
    },
    {
      label: "No",
      onClick: handleOnClose,
    },
  ];

  return (
    <FYBox>
      <FYButton
        onClick={handleReportClick}
        isDisable={isDisable}
        sx={{
          "&.MuiButton-root": {
            padding: { xsm: "12px 20px", xs: "12px 0px" },
            minWidth: { xsm: 64, xs: 26 },
          },
        }}
      >
        <ReportFlag opacity={isDisable ? 0.3 : 1} />
      </FYButton>
      <FYDialog
        open={isOpen}
        onClose={handleOnClose}
        content={t("reportAlert")}
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
    </FYBox>
  );
};

export default ReportReview;
