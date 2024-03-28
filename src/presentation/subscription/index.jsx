import FormContainer from "../../container/form.container";
import {
  defaultValues,
  formPath,
} from "../../description/subscription.description";
import SubscriptionContainer from "../../container/subscription.container";
import FYGrid from "../../shared/FYGrid";
import { Box } from "@mui/material";
import useStyles from "./style";
import Form from "../../shared/Form";
import FYTypography from "../../shared/FYTypography";
import FormFields from "../../shared/FormFields";
import { useTranslation } from "react-i18next";
import FYButton from "../../shared/FYButton";
import { planAtt } from "../../description/signupPartial.description";

const Subscription = () => {
  const {
    handleChange,
    formData,
    error,
    validate,
    setError,
    activeDropdown,
    activeDropdownName,
  } = FormContainer({
    attribute: [...planAtt],
    defaultValues,
    formPath,
  });
  const { handleSubmit, loadingStatus } = SubscriptionContainer({
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
      <Box className={classes.authSectionInner}>
        <Form onSubmit={handleSubmit}>
          <FYGrid container spacing={2}>
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
                  activeDropdownName={activeDropdownName}
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
    </FYGrid>
  );
};

export default Subscription;
