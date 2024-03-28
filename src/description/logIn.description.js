import { notEmptyOrNull } from "../utils/constant";
import { ReactComponent as Email } from "../assets/svg/mail.svg";
import { ReactComponent as Lock } from "../assets/svg/lock.svg";
import { loadStateFn } from "../utils/localStorage";

export const attribute = [
  {
    name: "email",
    label: "emailOrUsername",
    type: "text",
    isRequired: true,
    endAdornment: <Email />,
    pattern: notEmptyOrNull,
    error: ["fieldRequired", "blankSpaceNotAllowed"],
    gridXs: 12,
  },
  {
    name: "password",
    label: "password",
    type: "password",
    isRequired: true,
    endAdornment: <Lock />,
    pattern: notEmptyOrNull,
    error: ["passwordRequired"],
    gridXs: 12,
  },
];

export const defaultValues = {
  email: loadStateFn("rememberedEmail") || "",
  password: loadStateFn("rememberedPassword") || "",
};

export const login = "login";

export const loginPageTitle = "Log In to Your Account";

export const rememberMe = "Remember me";

export const forgotPasswordLink = "Forgot Password";

export const formPath = { parent: "logIn" };
