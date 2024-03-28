import React from "react";
import FYBox from "../../../shared/FYBox";
import FYGrid from "../../../shared/FYGrid";
import FYTypography from "../../../shared/FYTypography";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import FYButton from "../../../shared/FYButton";
import FYTextField from "../../../shared/FYTextField";
import FYCard from "../../../shared/FYCard";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { thanksInformation } from "../../../description/brand/brandThankYou.description";
import BrandThankYouContainer from "../../../container/brand/brandThankYou.container";
import Form from "../../../shared/Form";
import { useStyles } from "../style";

const BrandThankYou = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    formData,
    handleChange,
    handleMessageChange,
    handleSave,
    handleReset,
    thankyouMessage,
    handleStaticThanksSave,
    handleThankYouMessageChange,
  } = BrandThankYouContainer();

  return (
    <FYBox>
      <FYGrid
        container
        columnSpacing={{ xl: 10, lg: 8, md: 6, sm: 6 }}
        rowSpacing={{ md: 3, sm: 2, xs: 2 }}
      >
        <FYGrid item lg={8} md={8} sm={8} xs={12}>
          <FYTypography variant="h6" fontWeight="700">
            {t("headBrandThanks")}
          </FYTypography>
          <Divider sx={{ m: "10px 0px 20px" }} />
          <Form onSubmit={handleSave}>
            <FYTypography variant="h6" fontWeight="700">
              {t("subject")}
            </FYTypography>
            <FYTextField
              fullWidth
              rows={5}
              placeholder={t("thanksForReview")}
              name="subject"
              value={formData?.subject}
              onChange={handleChange}
            />
            <FYTypography variant="h6" fontWeight="700">
              {t("message")}
            </FYTypography>
            <Divider sx={{ m: "10px 0px 20px" }} />
            <CKEditor
              editor={ClassicEditor}
              data={formData?.message}
              onChange={handleMessageChange}
            />
            <FYButton
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                "&.MuiButton-root": {
                  padding: "5px 24px",
                  fontSize: 14,
                },
              }}
            >
              {t("save")}
            </FYButton>
            <FYButton
              type="default"
              onClick={handleReset}
              sx={{
                mt: 2,
                "&.MuiButton-root": {
                  padding: "5px 24px",
                  fontSize: 14,
                },
              }}
            >
              {t("reset")}
            </FYButton>
          </Form>
          <Form onSubmit={handleStaticThanksSave}>
            <FYTypography variant="h6" fontWeight="700" mt={{ xs: 4 }}>
              {/* {t("message")} */}
              Static Message
            </FYTypography>
            <Divider sx={{ m: "10px 0px 20px" }} />
            <FYTextField
              fullWidth
              multiline
              rows={5}
              placeholder={t("thanksForReview")}
              name="thankyouMessage"
              value={thankyouMessage?.thankyouMessage}
              onChange={handleThankYouMessageChange}
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
              {t("save")}
            </FYButton>
          </Form>
        </FYGrid>
        <FYGrid item lg={4} md={4} sm={4} xs={12}>
          <FYGrid
            container
            columnSpacing={{ xl: 10, lg: 8, md: 6, sm: 6 }}
            rowSpacing={{ md: 3, sm: 2, xs: 2 }}
          >
            {thanksInformation?.map(({ head, data }, index) => (
              <FYGrid item xs={12} key={index}>
                <div className={classes.templateInformation}>
                  <FYCard variant="outlined" sx={{ padding: "20px" }}>
                    <FYTypography variant="h5">{t([head])}</FYTypography>
                    <Divider sx={{ m: "10px -20px 20px" }} />
                    <FYTypography>{t([data])}</FYTypography>
                  </FYCard>
                </div>
              </FYGrid>
            ))}
          </FYGrid>
        </FYGrid>
      </FYGrid>
    </FYBox>
  );
};

export default BrandThankYou;
