import { ReactComponent as Lock } from "../assets/svg/lock.svg";
import { password } from "../utils/constant";

export const attribute = [
  {
    name: "password",
    label: "password",
    type: "password",
    isRequired: true,
    endAdornment: <Lock />,
    pattern: password,
    error: ["passwordRequired", "passwordValidation"],
    gridXs: 12,
  },
];

export const defaultValues = {
  password: "",
};
export const formPath = { parent: "verify-password" };
