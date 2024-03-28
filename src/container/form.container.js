/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { equal, getObject, head, last } from "../utils/javascript";
import validation from "../utils/validation";
import { useDispatch } from "react-redux";
import { SET_FORM_DATA, SET_FORM_PATTERN_DATA } from "../redux/constants";
import { useEffect } from "react";
import { planAtt } from "../description/signupPartial.description";

const FormContainer = ({ attribute, defaultValues, formPath }) => {
  const [formData, setFormData] = useState(defaultValues);
  const [activeDropdown, setActiveDropdown] = useState(
    process.env.REACT_APP_BASIC_PLAN_MONTHLY,
  );
  const [activeDropdownName, setActiveDropdownName] = useState("priceId");
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const { parent } = formPath;

  const callbackFn = (name, value) => {
    setActiveDropdownName(name);
    setActiveDropdown(value);
    return;
  };

  useEffect(() => {
    if (equal(parent, "complete-profile") || equal(parent, "subscription")) {
      let defaultFormData = {};
      planAtt.forEach(({ name, defaultValue }) => {
        defaultFormData[name] = defaultValue ?? null;
      });
      setFormData({ ...formData, ...defaultFormData });
    }
  }, []);

  const handleChange = (e, callback) => {
    const { name, value } = e.target;
    const countryCodeName = e.target?.countryCodeName;
    const countryCodeNumber = e.target?.countryCodeNumber;
    setError({
      ...error,
      [name]: validate(name, value, countryCodeName),
    });
    setFormData({ ...formData, [name]: value });
    dispatch({
      type: SET_FORM_DATA,
      payload: { [parent]: { ...formData, [name]: value } },
    });

    countryCodeName &&
      dispatch({
        type: SET_FORM_PATTERN_DATA,
        payload: {
          [parent]: {
            countryCodeName,
            countryCodeNumber,
          },
        },
      });

    callback && callbackFn(name, value);
  };

  const validate = (name, value, ...rest) => {
    const { pattern, isRequired, error } = getObject(attribute, name);
    const res = validation(pattern, value, ...rest);
    if (isRequired) {
      if (!value) {
        return head(error);
      }
    }
    if (isRequired && !res) {
      return last(error);
    }
  };

  return {
    handleChange,
    formData,
    setFormData,
    error,
    validate,
    setError,
    activeDropdown,
    activeDropdownName,
  };
};

export default FormContainer;
