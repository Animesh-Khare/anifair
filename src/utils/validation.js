import {
  alphabetOnly,
  email,
  intensions,
  mobile,
  notEmptyOrNull,
  password,
  url,
} from "./constant";
import {
  emailValidation,
  notEmpty,
  passwordValidation,
  urlValidation,
  alphabetValidation,
  mobileValidation,
  intensionsValidation,
} from "./regex";

export default (pattern, value, countryCodeName) => {
  switch (pattern) {
    case notEmptyOrNull:
      return notEmpty(value);
    case password:
      return passwordValidation(value);
    case email:
      return emailValidation(value);
    case url:
      return urlValidation(value);
    case alphabetOnly:
      return alphabetValidation(value);
    case mobile:
      return mobileValidation(value, countryCodeName);
    case intensions:
      return intensionsValidation(value);
    default:
      return false;
  }
};
