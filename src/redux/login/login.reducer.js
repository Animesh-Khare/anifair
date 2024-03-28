const defaultState = {
  formData: {},
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_FORM_VALUES":
      return { ...state, formData: action.payload };
    case "CLEAR_FORM_DATA":
      return { formData: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
