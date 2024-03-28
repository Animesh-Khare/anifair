import React from "react";
import FYTypography from "../../../shared/FYTypography";
import FYButton from "../../../shared/FYButton";
import useStyles from "./style";
import FormFields from "../../../shared/FormFields";
import Form from "../../../shared/Form";
import {
  attribute,
  defaultValues,
  formPath,
} from "../../../description/invite/inviteInvitation.description";
import FYBox from "../../../shared/FYBox";
import FYGrid from "../../../shared/FYGrid";
import InviteInvitationContainer from "../../../container/invite/inviteInvitation.container";
import InviteInvitationPartialHelper from "./InviteInvitationPartialHelper";
import FormContainer from "../../../container/form.container";
import { useTranslation } from "react-i18next";

const InviteInvitation = () => {
  const { t } = useTranslation();
  const { clonedAttribute } = InviteInvitationPartialHelper({
    attribute,
    formPath,
  });
  const { handleChange, formData, error, validate, setError, activeDropdown } =
    FormContainer({
      attribute: [...clonedAttribute],
      defaultValues,
      formPath,
    });

  const { handleSubmit, loadingStatus, invitationCount } =
    InviteInvitationContainer({
      formData,
      validate,
      setError,
      formPath,
      activeDropdown,
    });

  const classes = useStyles();

  return (
    <div className={classes.inviteInvitation}>
      <FYTypography
        fontWeight="700"
        borderBottom="1px solid #C3C8E6"
        pl={2}
        pb={1}
        mt={0.8}
        mb={2}
      >
        {t("addEmail")}
      </FYTypography>

      <FYBox>
        <Form onSubmit={handleSubmit}>
          <FYGrid container columnSpacing={2} alignItems="center">
            <FormFields
              attribute={clonedAttribute}
              error={error}
              formData={formData}
              handleChange={handleChange}
              className={classes.formGroupOutside}
            />
          </FYGrid>
          <div className={classes.addBtn_container}>
            <FYButton
              type="submit"
              variant="contained"
              isLoading={loadingStatus}
              className={classes.inputField}
            >
              {t("add")}
            </FYButton>
            <FYTypography className={classes.invitationText}>
              {t("youCanSend")}
              <span style={{ color: "#0E854E" }}>{invitationCount}</span>
              {t("invitation")}
            </FYTypography>
          </div>
        </Form>
      </FYBox>
    </div>
  );
};

export default InviteInvitation;
