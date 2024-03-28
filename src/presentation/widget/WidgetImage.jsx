/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { showToast } from "../../utils/toastService";
import { method } from "../../utils/constant";
import { formPath } from "../../description/widget.description";
import { useDispatch, useSelector } from "react-redux";
import { ApiContainer } from "../../utils/api";
import { SET_COMPANY_DATA } from "../../redux/constants";
import FYBox from "../../shared/FYBox";
import FYTypography from "../../shared/FYTypography";
import FYRating from "../../shared/FYRating";
import { calculateRating } from "../../utils/utilFunctions";
import FYLoader from "../../shared/FYLoader";
import { equal } from "../../utils/javascript";
import FYButton from "../../shared/FYButton";
import { useTranslation } from "react-i18next";
import avgScore from "../../assets/png/New logo - White 1.png";
import widgetLogo from "../../assets/png/fairYellow white logo.png";
import FYGrid from "../../shared/FYGrid";
import theme from "../../themes/theme";

const WidgetImage = () => {
  const widgetInfo = useSelector((state) => state.app?.company?.widgetInfo);
  const dispatch = useDispatch();
  const { performRequest } = ApiContainer();
  const { t } = useTranslation();

  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  useEffect(() => {
    getWidgetInfo();
  }, []);

  if (loadingStatus) return <FYLoader variant="fullPage" />;
  const getWidgetInfo = async () => {
    try {
      const widgetInfo = await performRequest({
        endPoint: "widget",
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

  return (
    <div>
      <FYBox>
        <FYGrid
          container
          spacing={2}
          sx={{
            height: widgetInfo?.widgetData?.height || 120,
            width: widgetInfo?.widgetData?.width + 50 || 350,
            border: "1px solid #3546AB4D",
            borderRadius: 5,
            backgroundColor: equal(widgetInfo?.widgetData?.color, "Yellow")
              ? theme.palette.primary.main
              : widgetInfo?.widgetData?.color || "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FYGrid item xs={3}>
            <img src={avgScore} alt="avgScore" />
          </FYGrid>
          <FYGrid item xs={3}>
            {equal(widgetInfo?.widgetData?.rate, "On") && (
              <FYRating
                readOnly
                value={calculateRating(widgetInfo?.reviewData?.avgOverallScore)}
                precision={0.5}
                size={"small"}
                sx={{
                  color: equal(widgetInfo?.widgetData?.color, "Yellow")
                    ? "white.main"
                    : "primary.main",
                }}
              />
            )}
            <FYTypography
              fontSize={30}
              fontWeight={700}
              color={
                equal(widgetInfo?.widgetData?.color, "Yellow")
                  ? "black.main"
                  : "primary.main"
              }
            >
              {widgetInfo?.reviewData?.reviewCount || 0}
            </FYTypography>
            <FYTypography
              color={
                equal(widgetInfo?.widgetData?.color, "Yellow")
                  ? "black.main"
                  : "primary.main"
              }
            >
              {t("reviews")}
            </FYTypography>
          </FYGrid>
          <FYGrid item xs={6}>
            <img src={widgetLogo} alt="logo" />
            <FYButton
              variant="contained"
              isDisable={equal(widgetInfo?.widgetData?.button, "Off") && true}
              sx={{
                "&.MuiButtonBase-root ": {
                  padding: "0px 0px",
                  lineHeight: "0px",
                  fontSize: 14,
                },
              }}
            >
              {t("rateUs")}
            </FYButton>
          </FYGrid>
        </FYGrid>
      </FYBox>
    </div>
  );
};

export default WidgetImage;
