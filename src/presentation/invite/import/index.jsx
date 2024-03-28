import React from "react";
import FYTypography from "../../../shared/FYTypography";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";
import FYBox from "../../../shared/FYBox";
import FYButton from "../../../shared/FYButton";
import InviteImportContainer from "../../../container/invite/inviteImport.container";

import FYMultiFileUpload from "../../../shared/FYMultiFileUpload";

const InviteImport = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    fileData,
    sendInvitationHandler,
    getFileUploadData,
    downloadSampleFile,
    invitationCount,
  } = InviteImportContainer();

  return (
    <div>
      <FYTypography
        variant="h5"
        color="black.main"
        className={classes.typographyText}
      >
        {t("inviteImportText")}
      </FYTypography>
      <FYBox className={classes.typoContainerBox}>
        <FYTypography
          className={`${classes.typoBtn} ${classes.pointerCursor}`}
          onClick={downloadSampleFile}
        >
          {t("downloadExcelExample")}
        </FYTypography>
        <FYTypography className={classes.typoBtn}>
          {t("howDoInviteClient")}
        </FYTypography>
      </FYBox>
      <FYBox className={classes.fileContainerBox}>
        <FYTypography>
          {fileData.map((item, index) => (
            <span key={index}>{item.documentName}&nbsp; &nbsp;</span>
          ))}
        </FYTypography>

        {fileData.length === 0 && (
          <FYMultiFileUpload
            getDatachange={getFileUploadData}
            label={t("import")}
          />
        )}

        <br />

        {fileData.length > 0 && (
          <FYButton variant="contained" onClick={sendInvitationHandler}>
            {t("sendInvitation")}
          </FYButton>
        )}
        <br />
      </FYBox>
      <FYBox className={classes.footerBoxContainer}>
        <FYTypography className={classes.typoBtn}>
          {t("youCanSend")}
          <span style={{ color: "#0E854E" }}> {invitationCount}</span>
          {t("more")} {t("invitation")}
        </FYTypography>
      </FYBox>
    </div>
  );
};

export default InviteImport;
