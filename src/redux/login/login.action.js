import { CLEAR_FORM_DATA, SET_FORM_VALUES } from "../constants";

export const setIntoForm = (payload) => {
  return { type: SET_FORM_VALUES, payload };
};

export const clearFormValue = (payload) => {
  return { type: CLEAR_FORM_DATA, payload };
};
