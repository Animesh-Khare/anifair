import React from "react";
import FYBox from "../../../shared/FYBox";
import FYGrid from "../../../shared/FYGrid";
import FYTypography from "../../../shared/FYTypography";
import { Divider } from "@mui/material";
import FYButton from "../../../shared/FYButton";
import BrandOverviewContainer from "../../../container/brand/brandOverview.container";
import { useStyles } from "../style";
import { useTranslation } from "react-i18next";
import FYLoader from "../../../shared/FYLoader";
import { equal } from "../../../utils/javascript";
import {
  descriptionMaxLength,
  descriptionMinLength,
  formPath,
} from "../../../description/brand/brandOverview.description";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Form from "../../../shared/Form";
import FYTextField from "../../../shared/FYTextField";

const BrandOverview = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    handleLogoChange,
    handleSetLogo,
    handleBackChange,
    handleBackCover,
    previewLogo,
    previewBack,
    companyData,
    loadingStatus,
    logoFile,
    backFile,
    handleEditClick,
    isError,
    showForm,
    descriptionMsg,
    handleDescriptionChange,
    handleSubmit,
  } = BrandOverviewContainer({
    formPath,
  });

  if (loadingStatus) return <FYLoader variant="fullPage" />;

  return (
    <div className={classes.container}>
      <FYBox>
        <FYGrid
          container
          columnSpacing={{ xl: 10, md: 5, xs: 3 }}
          mb={{ xs: 2, sm: 4 }}
        >
          <FYGrid item xl={6} sm={6} xs={12}>
            <FYTypography variant="h6">{t("uploadLogo")}</FYTypography>
            <Divider sx={{ m: "10px 0px 20px", width: "90%" }} />
            <>
              <div>
                {previewLogo && (
                  <img
                    src={previewLogo}
                    alt="logo"
                    className={classes.profilePhoto}
                  />
                )}
              </div>
              <FYButton onClick={() => document.getElementById("logo").click()}>
                {t("upload")}
                <input
                  type="file"
                  hidden
                  id="logo"
                  onChange={handleLogoChange}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </FYButton>
              <FYButton
                variant="contained"
                onClick={handleSetLogo}
                isDisable={equal(logoFile, null) && true}
              >
                {t("setLogo")}
              </FYButton>
            </>
          </FYGrid>
          <FYGrid item xl={6} sm={6} xs={12}>
            <FYTypography variant="h6">{t("uploadBackCover")}</FYTypography>
            <Divider sx={{ m: "10px 0px 20px", width: "90%" }} />
            <>
              <div>
                {previewBack && (
                  <img
                    src={previewBack}
                    alt="backImage"
                    className={classes.profilePhoto}
                  />
                )}
              </div>
              <FYButton onClick={() => document.getElementById("back").click()}>
                {t("upload")}
                <input
                  type="file"
                  hidden
                  id="back"
                  onChange={handleBackChange}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </FYButton>
              <FYButton
                variant="contained"
                onClick={handleBackCover}
                isDisable={equal(backFile, null) && true}
              >
                {t("setCover")}
              </FYButton>
            </>
          </FYGrid>
          <FYGrid item xl={6} sm={6} xs={12}>
            <FYTypography variant="h6">{t("aboutComp")}</FYTypography>
            <div className={classes.description}>
              {companyData?.aboutCompany?.description ? (
                <>
                  {showForm ? (
                    <FYBox>
                      <FYTypography
                        fontWeight="500"
                        fontSize={14}
                        sx={{ mb: { xs: 1, xsm: 0 } }}
                      >
                        {t("editDescription")}
                      </FYTypography>
                      <Form onSubmit={handleSubmit}>
                        <FYTextField
                          fullWidth
                          multiline
                          rows={5}
                          placeholder={t("typeMsg")}
                          value={descriptionMsg}
                          onChange={handleDescriptionChange}
                          error={isError}
                          helperText={
                            isError
                              ? t("minLengthRequired", {
                                  minLength: descriptionMinLength,
                                  maxLength: descriptionMaxLength,
                                })
                              : ""
                          }
                        />
                        <FYButton
                          type="submit"
                          variant="contained"
                          sx={{
                            "&.MuiButton-root": {
                              padding: "5px 24px",
                              fontSize: 14,
                            },
                          }}
                        >
                          {t("submit")}
                        </FYButton>
                      </Form>
                    </FYBox>
                  ) : (
                    <FYTypography variant="body2">
                      {companyData?.aboutCompany?.description}
                    </FYTypography>
                  )}
                </>
              ) : (
                <>
                  {showForm ? (
                    <FYBox>
                      <FYTypography
                        fontWeight="500"
                        fontSize={14}
                        sx={{ mb: { xs: 1, xsm: 0 } }}
                      >
                        {t("editDescription")}
                      </FYTypography>
                      <Form onSubmit={handleSubmit}>
                        <FYTextField
                          fullWidth
                          multiline
                          rows={5}
                          placeholder={t("typeMsg")}
                          value={descriptionMsg}
                          onChange={handleDescriptionChange}
                          error={isError}
                          helperText={
                            isError
                              ? t("minLengthRequired", {
                                  minLength: descriptionMinLength,
                                  maxLength: descriptionMaxLength,
                                })
                              : ""
                          }
                        />
                        <FYButton
                          type="submit"
                          variant="contained"
                          sx={{
                            "&.MuiButton-root": {
                              padding: "5px 24px",
                              fontSize: 14,
                            },
                          }}
                        >
                          {t("submit")}
                        </FYButton>
                      </Form>
                    </FYBox>
                  ) : (
                    <FYTypography>{t("notFoundDescription")}</FYTypography>
                  )}
                </>
              )}
              <FYButton
                onClick={handleEditClick}
                sx={{
                  "&.MuiButton-root": {
                    padding: { xsm: "12px 20px", xs: "12px 0" },
                  },
                }}
              >
                <EditOutlinedIcon color="black" />
                <FYTypography
                  fontSize={14}
                  sx={{ paddingLeft: 1 }}
                  color="gray.main"
                >
                  {showForm ? t("cancel") : t("editDescription")}
                </FYTypography>
              </FYButton>
            </div>
          </FYGrid>
          <FYGrid item xl={6} sm={6} xs={12}></FYGrid>
        </FYGrid>
      </FYBox>
    </div>
  );
};

export default BrandOverview;
