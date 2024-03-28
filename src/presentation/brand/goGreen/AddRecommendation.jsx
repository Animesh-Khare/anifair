import React, { useState } from "react";
import FYTableRow from "../../../shared/FYTableRow";
import FYTableCell from "../../../shared/FYTableCell";
import FYStack from "../../../shared/FYStack";
import { Box } from "@mui/material";
import FYTextField from "../../../shared/FYTextField";
import FYTypography from "../../../shared/FYTypography";
import FYButton from "../../../shared/FYButton";
import { useTranslation } from "react-i18next";
import { notEmpty } from "../../../utils/regex";
import { equal, length, values } from "../../../utils/javascript";
import { showToast } from "../../../utils/toastService";
import { apiEndPoints, method } from "../../../utils/constant";
import { useDispatch } from "react-redux";
import { ApiContainer } from "../../../utils/api";
import { formPath } from "../../../description/brand/brandGoGreen.description";
import { SET_COMPANY_DATA } from "../../../redux/constants";

const AddRecommendation = ({ recommendations, closeForm }) => {
  const defaultValues = {
    recommendation: "",
  };
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { performRequest } = ApiContainer();
  const [inputValues, setInputValues] = useState(defaultValues);
  const [validationErrors, setValidationErrors] = useState({});

  const validation = (key, value) => {
    const isValid = notEmpty(value);
    setValidationErrors((pre) => ({ ...pre, [key]: !isValid }));
    return !isValid;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (equal(name, "recommendation")) validation(name, value);
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSaveRecommendation = async () => {
    const errorObj = {};
    const validateRecommendation = validation(
      "recommendation",
      inputValues?.recommendation,
    );
    errorObj["recommendation"] = validateRecommendation;
    if (values(errorObj).includes(true)) return;

    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.brandRecommendation,
        method: method?.post,
        data: { recommendation: inputValues?.recommendation },
        showToastMessage: true,
      });

      if (equal(response?.status, 200) && length(response?.data)) {
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
        closeForm();
      }
    } catch (error) {
      showToast(error);
    }
  };

  return (
    <>
      <FYTableRow>
        <FYTableCell>
          <FYStack direction="row">
            <FYStack
              direction="row"
              sx={{ color: "rgba(63, 63, 68, 0.6)" }}
              alignItems="center"
              flex={1}
              spacing={1}
            >
              <Box minWidth={20}>
                {`${length(recommendations?.recommendation) + 1}.`}
              </Box>
              <FYTextField
                name={"recommendation"}
                value={inputValues?.recommendation}
                onChange={handleInputChange}
                fullWidth
                error={validationErrors?.["recommendation"]}
              />
            </FYStack>
          </FYStack>
        </FYTableCell>
        <FYTableCell sx={{ border: 0, py: 1, pr: 1, pl: 3 }}>
          <FYStack direction="row" alignItems="center" spacing={1}>
            <Box
              width={8}
              height={8}
              backgroundColor="primary.main"
              borderRadius="100%"
              mr={2}
            ></Box>
            <FYTypography color="gray.main" variant="body2">
              0x
            </FYTypography>
          </FYStack>
        </FYTableCell>
      </FYTableRow>
      <FYTableRow>
        <FYTableCell colSpan={2}></FYTableCell>
        <FYTableCell colSpan={2} sx={{ whiteSpace: "nowrap" }}>
          <FYButton onClick={closeForm}>{t("cancel")}</FYButton>
          <FYButton variant="contained" onClick={handleSaveRecommendation}>
            {t("save")}
          </FYButton>
        </FYTableCell>
      </FYTableRow>
    </>
  );
};

export default AddRecommendation;
