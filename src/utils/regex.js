import { lowerCase } from "./javascript";
import { countryWisePhoneValidation } from "./phoneInputRegex";

export const emailValidation = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(lowerCase(email));
};

export const notEmpty = (val) => {
  const regex = /\S/;
  return regex.test(val);
};

export const intensionsValidation = (val) => {
  const regex = /^[a-zA-Z]+(?:[ ]*[a-zA-Z]+)*$/;
  return regex.test(val);
};

export const passwordValidation = (value) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(value);
};

export const urlValidation = (value) => {
  const regex =
    /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{3,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))$|^((www\.)?[-a-zA-Z0-9@:%._+~#=]{3,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))$/;
  return regex.test(value);
};

export const alphabetValidation = (value) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(value);
};

export const mobileValidation = (value, countryCodeName) => {
  return countryWisePhoneValidation[countryCodeName]?.test(value);
};
