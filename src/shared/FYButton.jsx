import { Button, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles((theme) => ({
  btnStyle: {
    "&.MuiButton-root": {
      padding: (props) => (props?.isSmall ? "8px 15px" : "12px 20px"),
      borderRadius: 8,
      fontSize: 15,
      lineHeight: "24px",
      flex: "none",
      textTransform: "capitalize",
    },
    "&.MuiButton-contained": {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    "&.MuiButton-outlined": {
      backgroundColor: "transparent",
      color: theme.palette.white.main,
      border: "none",
      "&:hover": {
        border: "none",
      },
    },
  },
}));

const FYButton = ({
  isLoading,
  startIcon,
  applyClass = true,
  className,
  isSmall,
  children,
  isDisable = false,
  ...rest
}) => {
  const classes = useStyles({ isSmall });

  return (
    <Button
      {...rest}
      disabled={isDisable || isLoading}
      {...(applyClass && {
        className: classNames(classes.btnStyle, className),
      })}
      startIcon={isLoading ? <CircularProgress size={20} /> : startIcon}
      disableElevation
    >
      {children}
    </Button>
  );
};

export default FYButton;
