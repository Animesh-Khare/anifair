import React from "react";
import {
  attribute,
  defaultValues,
  formPath,
} from "../../description/logIn.description";
import { Box } from "@mui/material";
import LoginContainer from "../../container/login.container";
import { Link } from "react-router-dom";
import FormFields from "../../shared/FormFields";
import Form from "../../shared/Form";
import FormContainer from "../../container/form.container";
import FYTypography from "../../shared/FYTypography";
import FYButton from "../../shared/FYButton";
import useStyles from "./style";
import useStylesHeading from "../../shared/css/heading.style";
import useStylesButton from "../../shared/css/button.style";
import { locationPath } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import FYStack from "../../shared/FYStack";
import FYGrid from "../../shared/FYGrid";
import FYCheckbox from "../../shared/FYCheckbox";

const Login = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });
  const { handleCheck, handleSubmit, loadingStatus } = LoginContainer({
    formData,
    validate,
    setError,
    formPath,
  });
  const classes = useStyles();
  const classesHeading = useStylesHeading();
  const classesButton = useStylesButton();
  const { t } = useTranslation();

  return (
    <FYGrid item md={6} xs={12}>
      <FYStack
        px={{ md: 6, sm: 3, xs: 1 }}
        py={{ md: 6, xs: 3 }}
        backgroundColor="white.main"
        position="relative"
        height="100%"
        borderRadius="0 50px 50px 0"
        boxShadow="3px -5px 40px 0px rgba(205, 205, 212, 0.10)"
        zIndex={1}
      >
        <FYTypography
          variant="h2"
          fontSize={{ md: 28, xs: 22 }}
          fontWeight={500}
          mb={3}
          className={classesHeading.heading}
        >
          {t("loginFormTitle")}
        </FYTypography>
        <Form onSubmit={handleSubmit}>
          <FYGrid container>
            <FormFields
              attribute={attribute}
              error={error}
              formData={formData}
              handleChange={handleChange}
            />
          </FYGrid>
          <FYGrid item xs={12}>
            <Box className={classes.checkBoxWrapper}>
              <Box className={classes.checkboxInnerWrapper}>
                <FYCheckbox name="rememberMe" onChange={handleCheck} />
                <FYStack
                  direction="row"
                  alignItems="center"
                  dangerouslySetInnerHTML={{
                    __html: t("rememberMe"),
                  }}
                />
              </Box>
              <Link
                className={classes.forgotLink}
                to={locationPath.forgotPassword}
              >
                {t("forgotPasswordLink")}
              </Link>
            </Box>
          </FYGrid>
          <FYGrid item xs={12}>
            <FYButton
              type="submit"
              variant="contained"
              isLoading={loadingStatus}
              className={classesButton.btnStyle}
            >
              {t("login")}
            </FYButton>
          </FYGrid>
        </Form>
        <FYStack display="block" mt={2}>
          <FYStack
            display="block"
            textAlign="center"
            fontSize={13}
            sx={{
              color: "rgba(63, 63, 68, 0.6)",
              "& a": {
                color: "rgba(0, 80, 173, 0.60)",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: `${t("noAccountYet", {
                signUp: t("signup"),
              })}`,
            }}
          />
        </FYStack>
      </FYStack>
    </FYGrid>
  );
};

export default Login;
