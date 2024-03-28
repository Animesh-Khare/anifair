import React from "react";
import {
  attribute,
  defaultValues,
  formPath,
} from "../../description/signup.description";
import FormFields from "../../shared/FormFields";
import Form from "../../shared/Form";
import FormContainer from "../../container/form.container";
import SignupContainer from "../../container/signup.container";
import FYTypography from "../../shared/FYTypography";
import FYButton from "../../shared/FYButton";
import useStylesHeading from "../../shared/css/heading.style";
import useStylesButton from "../../shared/css/button.style";
import { useTranslation } from "react-i18next";
import FYStack from "../../shared/FYStack";
import FYGrid from "../../shared/FYGrid";

const SignUp = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });
  const { handleSubmit, loadingStatus } = SignupContainer({
    formData,
    validate,
    setError,
    formPath,
  });
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
          {t("signupFormTitle")}
        </FYTypography>
        <Form onSubmit={handleSubmit}>
          <FYGrid container>
            <FormFields
              attribute={attribute}
              error={error}
              formData={formData}
              handleChange={handleChange}
            />
            <FYGrid item xs={12}>
              <FYButton
                type="submit"
                variant="contained"
                isLoading={loadingStatus}
                className={classesButton.btnStyle}
              >
                {t("createAccount")}
              </FYButton>
            </FYGrid>
          </FYGrid>
        </Form>
      </FYStack>
    </FYGrid>
  );
};

export default SignUp;
