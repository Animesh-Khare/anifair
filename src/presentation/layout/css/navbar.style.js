import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  navbarContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 70,
    padding: "0 20px",
    backgroundColor: "#002e19",
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
    },
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
  buttonContainer: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      gap: 5,
    },
    "& .MuiFormControl-root": {
      paddingBottom: 0,
    },
  },
  formControl: {
    "&.MuiFormControl-root": {
      backgroundColor: "transparent",
      borderRadius: theme.shape.borderRadius,
      border: "none",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
  optionContent: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("991")]: {
      "& > div": {
        display: "none",
      },
    },
  },
  icon: {
    fontSize: 18,
    [theme.breakpoints.up("991")]: {
      marginRight: 8,
    },
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  menuPaper: {
    "&.MuiMenu-paper": {
      boxShadow: "none",
    },
  },
  selectIcon: {
    "&.MuiSvgIcon-root": {
      color: theme.palette.white.main,
    },
  },
  selectText: {
    "&.MuiInputBase-input": {
      color: theme.palette.white.main,
    },
  },
  navLinks: {
    color: theme.palette.white.main,
    cursor: "pointer",
    padding: 22,
    textDecoration: "none",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      padding: 15,
    },
  },
  activeLink: {
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      borderBottom: "2px solid #fff",
    },
  },
}));
