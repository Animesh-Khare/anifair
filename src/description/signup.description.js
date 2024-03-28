import {
  alphabetOnly,
  email,
  notEmptyOrNull,
  password,
} from "../utils/constant";
import { ReactComponent as Email } from "../assets/svg/mail.svg";
import { ReactComponent as User } from "../assets/svg/user.svg";
import { ReactComponent as Url } from "../assets/svg/url.svg";
import { ReactComponent as Lock } from "../assets/svg/lock.svg";

export const attribute = [
  {
    name: "fullName",
    label: "fullName",
    type: "text",
    isRequired: true,
    endAdornment: <User />,
    pattern: alphabetOnly,
    error: ["fullNameRequired", "alphabetValidation"],
  },
  {
    name: "email",
    label: "emailAdd",
    type: "email",
    isRequired: true,
    endAdornment: <Email />,
    pattern: email,
    error: ["emailRequired", "invalidEmail"],
  },
  {
    name: "username",
    label: "businessURL",
    type: "text",
    isRequired: true,
    endAdornment: <Url />,
    pattern: notEmptyOrNull,
    placeholder: "yourownurl",
    startAdornment: "fairyellow.com/",
    error: ["urlRequired", "blankSpaceNotAllowed"],
  },
  {
    name: "password",
    label: "password",
    type: "password",
    isRequired: true,
    endAdornment: <Lock />,
    pattern: password,
    error: ["passwordRequired", "passwordValidation"],
  },
];

export const defaultValues = {
  fullName: "",
  email: "",
  username: "",
  password: "",
};

export const signup = "signup";

export const signupPageTitle = "Start Your FairYellow journey";

export const createAccount = "Create an account";

export const formPath = { parent: "signup" };
