import { useState } from "react";
import FYButton from "../../../shared/FYButton";
import FYCheckbox from "../../../shared/FYCheckbox";
import FYDropDown from "../../../shared/FYDropDown";
import FYTableCell from "../../../shared/FYTableCell";
import FYTableRow from "../../../shared/FYTableRow";
import FYTextField from "../../../shared/FYTextField";
import { equal, length, values } from "../../../utils/javascript";
import FYRating from "../../../shared/FYRating";
import FYStack from "../../../shared/FYStack";
import { ApiContainer } from "../../../utils/api";
import { apiEndPoints, method } from "../../../utils/constant";
import { notEmpty } from "../../../utils/regex";
import { useDispatch } from "react-redux";
import { ADD_QUESTION } from "../../../redux/constants";
import useStyles from "../style";
import { showToast } from "../../../utils/toastService";
import { useTranslation } from "react-i18next";
import FYTypography from "../../../shared/FYTypography";

const AddQuestion = ({ closeForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { performRequest } = ApiContainer();

  const defaultValue = {
    type: "CHECKBOX",
    question: "",
    isRequired: false,
  };
  const [inputValues, setInputValues] = useState(defaultValue);
  const [options, setOptions] = useState({
    otption1: "",
    otption2: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const optionAttribute = [
    { name: "otption1", required: true },
    { name: "otption2", required: true },
    { name: "otption3", required: false },
  ];

  const validation = (key, value) => {
    const isValid = notEmpty(value);
    setValidationErrors((pre) => ({ ...pre, [key]: !isValid }));
    return !isValid;
  };

  const handleInputeChange = (event) => {
    const { name, value } = event.target;

    if (equal(name, "isRequired"))
      return setInputValues({ ...inputValues, [name]: !inputValues[name] });
    if (equal(name, "question")) validation(name, value);

    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOptionChange = (event) => {
    const { name, value } = event.target;

    if (optionAttribute.find((attr) => equal(name, attr?.name))?.required)
      validation(name, value);
    setOptions({ ...options, [name]: value });
  };

  const handleSaveQuetion = async () => {
    const errorObj = {};
    const validateQuestion = validation("question", inputValues?.question);
    errorObj["question"] = validateQuestion;
    const payload = { ...inputValues };
    if (equal(inputValues?.type, "CHECKBOX")) {
      optionAttribute.forEach((attr) => {
        const isError = attr?.required
          ? validation(attr?.name, options[attr?.name])
          : false;
        errorObj[attr?.name] = isError;
      });

      Object.assign(payload, { option: Object.values(options) });
    }
    if (values(errorObj).includes(true)) return;

    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.reviewQuestions,
        method: method?.post,
        data: { questions: [{ ...payload }] },
        showToastMessage: true,
      });

      if (equal(response?.status, 200) && length(response?.data)) {
        dispatch({
          type: ADD_QUESTION,
          payload: response?.data?.[0],
        });
        closeForm();
      }
    } catch (error) {
      showToast(error);
    }
  };

  const typeOptions = [
    { label: "Checkbox", value: "CHECKBOX" },
    { label: "Rating", value: "RATING" },
    { label: "Text", value: "TEXT" },
  ];

  const renderQuestionsType = (data) => {
    switch (data?.type) {
      case "CHECKBOX":
        return (
          <>
            {optionAttribute.map((attr, index) => (
              <FYTableCell key={index}>
                <FYTextField
                  name={attr?.name}
                  value={options?.[attr?.name]}
                  onChange={handleOptionChange}
                  error={validationErrors?.[attr?.name]}
                  className={classes.textField}
                />
              </FYTableCell>
            ))}
          </>
        );
      case "RATING":
        return (
          <FYTableCell colSpan={3} align="center">
            <FYRating
              precision={0.5}
              value={10}
              readOnly
              className={classes.rating}
            />
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
            ></FYStack>
          </FYTableCell>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <FYTableRow
        sx={{
          "& td": {
            border: 0,
          },
        }}
      >
        <FYTableCell>
          <FYTypography color="black.secondary">{`Question 1`}</FYTypography>
        </FYTableCell>
        <FYTableCell>
          <FYDropDown
            name={"type"}
            value={inputValues?.type}
            onChange={handleInputeChange}
            options={typeOptions}
            optionColor="black.secondary"
            classes={{}}
            className={classes.dropDown}
            sx={{
              "& .MuiMenuItem-root .MuiTypography-root": {
                fontSize: 12,
              },
            }}
          />
        </FYTableCell>
        <FYTableCell>
          <FYTextField
            name={"question"}
            value={inputValues?.question}
            onChange={handleInputeChange}
            error={validationErrors?.["question"]}
            className={classes.textField}
          />
        </FYTableCell>
        <FYTableCell>
          <FYCheckbox
            name={"isRequired"}
            onChange={handleInputeChange}
            checked={inputValues?.isRequired}
            className={classes.checkBox}
          />
        </FYTableCell>
        {renderQuestionsType(inputValues)}
      </FYTableRow>
      <FYTableRow>
        <FYTableCell colSpan={6}></FYTableCell>
        <FYTableCell colSpan={2} sx={{ whiteSpace: "nowrap" }}>
          <FYButton onClick={closeForm}>{t("cancel")}</FYButton>
          <FYButton variant="contained" onClick={handleSaveQuetion}>
            {t("save")}
          </FYButton>
        </FYTableCell>
      </FYTableRow>
    </>
  );
};

export default AddQuestion;
