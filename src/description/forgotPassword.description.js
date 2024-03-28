import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { email } from "../utils/constant";

export const attribute = [
  {
    name: "email",
    label: "email",
    type: "email",
    isRequired: true,
    endAdornment: <MailOutlineIcon />,
    pattern: email,
    error: ["emailRequired", "invalidEmail"],
    gridXs: 12,
  },
];

export const defaultValues = {
  email: "",
};

export const formPath = { parent: "forgot-password" };
