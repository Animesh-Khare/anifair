import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Typography } from "@mui/material";
import useStyles from "./css/layout.style";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import FYStack from "../../shared/FYStack";
import FYButton from "../../shared/FYButton";
import FYGrid from "../../shared/FYGrid";

const AuthLayout = ({
  frame,
  frameBtn,
  isPaddingTop,
  padding,
  sideFrame = true,
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <FYStack
        position="relative"
        zIndex={7}
        className={classNames({ [classes.authLayoutContainer]: sideFrame })}
      >
        <FYGrid container className={classes.mainContent}>
          {sideFrame && (
            <FYGrid
              item
              md={6}
              xs={12}
              className={classNames(classes.imgContainer, {
                [classes.paddingForLogin]: padding,
                [classes.paddingForSignup]: !padding,
              })}
            >
              {frameBtn && (
                <FYButton className={classes.btnImg}>{t(frameBtn)}</FYButton>
              )}
              <Box
                className={classNames(classes.imageOutside, {
                  [classes.paddingTop]: isPaddingTop,
                })}
              >
                <img src={frame} alt="Side frame" />
              </Box>
              <Typography variant="h6" className={classes.textContainer}>
                {t("sustainableFuture")}
              </Typography>
            </FYGrid>
          )}
          <Outlet />
        </FYGrid>
      </FYStack>
    </>
  );
};

export default AuthLayout;
