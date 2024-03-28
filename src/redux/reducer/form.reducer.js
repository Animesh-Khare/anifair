import {
  SET_FORM_DATA,
  SET_FORM_ERROR_DATA,
  SET_FORM_PATTERN_DATA,
} from "../constants";

const initialState = {
  formValues: {},
  pattern: {},
  formError: {},
};

const Form = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FORM_DATA:
      return {
        ...state,
        formValues: { ...state?.formValues, ...payload },
      };
    case SET_FORM_PATTERN_DATA:
      return {
        ...state,
        pattern: { ...state?.pattern, ...payload },
      };
    case SET_FORM_ERROR_DATA:
      return {
        ...state,
        formError: { ...state?.formError, ...payload },
      };
    default:
      return state;
  }
};

export default Form;
