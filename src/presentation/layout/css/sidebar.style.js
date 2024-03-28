import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  sidebarContainer: {
    "& .MuiPaper-root": {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      height: "100%",
      backgroundColor: theme.palette.primary.darken,
      boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.10)",
      transition: "all 0.3s ease-in-out",
    },
    "&$show": {
      "& .MuiPaper-root": {
        [theme.breakpoints.down("md")]: {
          left: -280,
        },
      },
    },
  },
  closeButton: {
    "&.MuiSvgIcon-root": {
      position: "absolute",
      top: 12,
      right: 12,
      color: theme.palette.secondary.light,
      cursor: "pointer",
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "inline-block",
      },
    },
  },
  show: {},
  sidebarLogo: {
    textAlign: "center",
    padding: 10,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  logoImage: {
    maxHeight: 55,
    marginRight: 10,
  },
  icon: {
    fontSize: 18,
    [theme.breakpoints.up("991")]: {
      marginRight: 8,
    },
  },
  sidebarMenu: {
    "& .MuiListItem-root": {
      display: "block",
      "& span": {
        color: theme.palette.black.main,
      },
      "& path": {
        color: theme.palette.black.main,
      },
      "& .MuiTypography-root": {
        fontFamily: "'Work Sans', sans-serif",
        "& .MuiBadge-root": {
          marginTop: -15,
          marginLeft: 10,
          "& .MuiBadge-badge": {
            position: "static",
            transform: "none",
            fontFamily: "'Work Sans', sans-serif",
            color: theme.palette.white.main,
            fontWeight: 600,
            fontSize: 10,
            textTransform: "uppercase",
          },
        },
      },
      "& a": {
        textDecoration: "none",
        width: "100%",
        color: theme.palette.white.main,
        borderRadius: 9,
        display: "inline-block",
        "&$activeLink": {
          color: theme.palette.black.gray,
          backgroundColor: theme.palette.white.main,
          "& .MuiButtonBase-root": {
            color: theme.palette.black.gray,
            "& .MuiListItemIcon-root": {
              color: theme.palette.black.gray,
            },
          },
        },
      },
      "& .MuiButtonBase-root": {
        width: "100%",
        color: theme.palette.white.main,
        borderRadius: 2,
        "& .MuiListItemIcon-root": {
          color: theme.palette.white.main,
          minWidth: 35,
        },
      },
      "& .MuiCollapse-root": {
        paddingLeft: 50,
        "&.MuiCollapse-entered": {
          paddingBottom: 10,
        },
        "& .MuiButtonBase-root": {
          fontSize: 14,
          position: "relative",
          padding: "5px 12px",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 14,
            backgroundColor: theme.palette.black.dark,
            width: 4,
            height: 4,
            borderRadius: "50%",
          },
        },
      },
    },
  },
  dropdownOpen: {
    "&.MuiStack-root": {
      backgroundColor: theme.palette.white.main,
      borderRadius: 9,
      "& .MuiButtonBase-root": {
        color: theme.palette.black.dark,
        "& .MuiListItemIcon-root": {
          color: theme.palette.black.gray,
        },
      },
    },
  },
  activeLink: {},
  subActiveLink: {
    fontWeight: 700,
  },
}));
