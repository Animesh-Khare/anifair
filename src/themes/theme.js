import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xsm: 500,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#FFD300",
      light: "#3DD598",
      gray: "#4A4A50",
      dark: "#44444F",
      darken: "#FFD300",
    },
    secondary: {
      main: "#F8B500",
      gray: "#D5D5DC",
      light: "#ffffff",
    },
    natural: {
      main: "#E2E2EA",
      gray: "#696974",
      dark: "#444343",
    },
    blue: {
      main: "#50B5FF",
      gray: "#243B53",
    },
    white: {
      main: "#fff",
      bluishPurple: "#171725",
      light: "#0000003b",
    },
    black: {
      main: "#000",
      gray: "#5F5F5F",
      dark: "#3F3F44",
      secondary: "#A1A1A4",
    },
    gray: {
      main: "#B5B5BE",
    },
    warning: {
      main: "#FDD100",
    },
    green: {
      main: "#0E854E",
    },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

export default theme;
