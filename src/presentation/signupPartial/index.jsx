import React from "react";
import FYTypography from "../../shared/FYTypography";
import { useTranslation } from "react-i18next";
import useStyles from "./style";
import Form from "../../shared/Form";
import {
  attribute,
  defaultValues,
  formPath,
  intensionsAtt,
  planAtt,
} from "../../description/signupPartial.description";
import FormFields from "../../shared/FormFields";
import SignUpPartialContainer from "../../container/signupPartial.container";
import FormContainer from "../../container/form.container";
import FYButton from "../../shared/FYButton";
import FYGrid from "../../shared/FYGrid";
import FYStack from "../../shared/FYStack";
import { Box } from "@mui/material";
import FYCheckbox from "../../shared/FYCheckbox";
import SignUpPartialHelper from "./SignUpPartialHelper";

const SignUpPartial = () => {
  const { clonedAttribute } = SignUpPartialHelper({ attribute, formPath });
  const { handleChange, formData, error, validate, setError, activeDropdown } =
    FormContainer({
      attribute: [...clonedAttribute, ...intensionsAtt, ...planAtt],
      defaultValues,
      formPath,
    });
  const { handleCheck, handleSubmit, loadingStatus } = SignUpPartialContainer({
    formData,
    validate,
    setError,
    formPath,
    activeDropdown,
  });

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <FYGrid item xs={12}>
      <Box className={classes.authSection}>
        <FYTypography
          variant="h1"
          className={classes.heading}
          textAlign="center"
        >
          {t("lastSteForRegistration")}
        </FYTypography>
        <FYTypography color="primary.gray" mb={3} textAlign="center">
          {t("signupPrompt")}
        </FYTypography>
        <Box className={classes.authSectionInner}>
          <Form onSubmit={handleSubmit}>
            <FYGrid container spacing={2}>
              <FormFields
                attribute={clonedAttribute}
                error={error}
                formData={formData}
                handleChange={handleChange}
              />
              <FYGrid item xs={12}>
                <FYStack direction="row" alignItems="center">
                  <FYCheckbox name="termAndCondition" onChange={handleCheck} />
                  <FYStack
                    display="block"
                    sx={{
                      "& a": {
                        color: "blue.main",
                        textDecoration: "none",
                      },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: t("cookiePrivacyMessage"),
                    }}
                  />
                </FYStack>
              </FYGrid>
              <FYGrid item xs={12} mt={3}>
                <FYTypography
                  variant="h4"
                  component="h4"
                  fontSize={{ md: 30, xs: 20 }}
                  fontWeight="bold"
                  textAlign="center"
                >
                  {t("setGreenIntentions")}
                </FYTypography>
              </FYGrid>
              <FYGrid item xs={12}>
                <FYGrid container mb={3}>
                  <FYGrid item md={6} xs={12} mx="auto">
                    <FormFields
                      attribute={intensionsAtt}
                      error={error}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </FYGrid>
                </FYGrid>
              </FYGrid>
              <FYGrid item md={6} xs={12} mx="auto">
                <FYTypography
                  variant="h4"
                  component="h4"
                  fontSize={{ md: 30, xs: 20 }}
                  mb={2}
                  fontWeight="bold"
                  textAlign="center"
                >
                  {t("chooseYourPlan")}
                </FYTypography>
                <FYTypography color="primary.gray" mb={3} textAlign="center">
                  {t("signUpCompletionMessage")}
                </FYTypography>
                <FYGrid container spacing={2}>
                  <FormFields
                    attribute={planAtt}
                    error={error}
                    formData={formData}
                    handleChange={(e) => handleChange(e, true)}
                    activeDropdown={activeDropdown}
                  />
                </FYGrid>
                <FYButton
                  type="submit"
                  variant="contained"
                  isLoading={loadingStatus}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {t("getStarted")}
                </FYButton>
              </FYGrid>
            </FYGrid>
          </Form>
        </Box>
      </Box>
    </FYGrid>
  );
};

export default SignUpPartial;
