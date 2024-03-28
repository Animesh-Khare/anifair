import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { ReactComponent as Calendar } from "../assets/svg/calendar.svg";
import { ReactComponent as Widget } from "../assets/svg/widget.svg";
import { ReactComponent as Chat } from "../assets/svg/chat.svg";
import { ReactComponent as Boost } from "../assets/svg/boost.svg";
import { ReactComponent as Account } from "../assets/svg/account.svg";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { locationPath } from "../utils/constant";

export const sidebarNavlinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    label: "Reviews",
    path: locationPath?.reviews,
    icon: <Calendar />,
    childRoute: [
      {
        label: "overview",
        path: locationPath?.overview,
      },
      {
        label: "response",
        path: locationPath?.response,
      },
      {
        label: "questions",
        path: locationPath?.questions,
      },
    ],
  },
  {
    label: "Brand",
    path: "/brand",
    icon: <StarBorderIcon />,
    badge: { title: "Green", color: "green" },
    childRoute: [
      {
        label: "overview",
        path: "/overview",
      },
      {
        label: "thankYou",
        path: "/create-thanks",
      },
      {
        label: "goGreen",
        path: "/go-green",
      },
      {
        label: "viewProfile",
        path: "/view-profile",
      },
    ],
  },
  {
    label: "Widget",
    path: "/widget",
    icon: <Widget />,
  },
  {
    label: "Invite",
    path: "/invite",
    icon: <Chat />,
    childRoute: [
      {
        label: "invitations",
        path: locationPath?.invitations,
      },
      {
        label: "import",
        path: locationPath?.import,
      },
      {
        label: "sent",
        path: locationPath?.sent,
      },
      {
        label: "emailTemplate",
        path: locationPath?.emailTemplate,
      },
    ],
  },
  {
    label: "Boost",
    path: "/boost",
    icon: <Boost />,
    badge: { title: "Pro", color: "black" },
  },
  {
    label: "Account",
    path: "/account",
    icon: <Account />,
    childRoute: [
      {
        label: "overview",
        path: locationPath?.overview,
      },
      {
        label: "language",
        path: locationPath?.language,
      },
      {
        label: "notifications",
        path: locationPath?.notifications,
      },
      {
        label: "settings",
        path: locationPath?.settings,
      },
    ],
  },
];

export const logoutLabel = "Log out";

export const logoutIcon = <LogoutTwoToneIcon />;
