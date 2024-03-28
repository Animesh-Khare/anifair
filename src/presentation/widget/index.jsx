import React from "react";
import FYBox from "../../shared/FYBox";
import FYTypography from "../../shared/FYTypography";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import WidgetContainer from "../../container/widget.container";
import theme from "../../themes/theme";
import Form from "../../shared/Form";
import FYGrid from "../../shared/FYGrid";
import FormFields from "../../shared/FormFields";
import FYButton from "../../shared/FYButton";
import FormContainer from "../../container/form.container";
import {
  attribute,
  defaultValues,
  formPath,
} from "../../description/widget.description";
import WidgetImage from "./WidgetImage";

export const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "90%",
  },
  iframeContainer: {
    "& h2": {
      color: "#696974",
      fontWeight: 500,
      fontSize: 20,
      margin: [[10, 0]],
    },
    "& h6": {
      color: "#696974",
      fontWeight: 400,
      fontSize: 16,
      margin: [[20, 0]],
      border: "1px solid #3546AB4D",
      padding: [[20]],
      borderRadius: 10,
    },
  },
}));

const Widget = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { handleChange, formData, error, setFormData } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });
  const { handleSubmit, ReviewPageLink } = WidgetContainer({
    formData,
    formPath,
    setFormData,
  });

  return (
    <div className={classes.container}>
      <FYBox>
        <FYTypography fontSize={20} fontWeight={700}>
          {t("widgetHead")}
        </FYTypography>
        <FYTypography
          fontWeight={400}
          color={theme.palette.black.secondary}
          mt={3}
        >
          {t("widgetText")}
        </FYTypography>
        <Divider sx={{ m: "10px 0px 20px" }} />
        <FYTypography fontSize={20} fontWeight={500}>
          Parameters
        </FYTypography>
        <Form onSubmit={handleSubmit}>
          <FYGrid container spacing={3}>
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
                // isLoading={loadingStatus}
              >
                {t("save")}
              </FYButton>
            </FYGrid>
          </FYGrid>
        </Form>
        <Divider sx={{ m: "30px 0px" }} />
        <WidgetImage />
        <div className={classes.iframeContainer}>
          <FYTypography variant="h2">{t("websiteFrameHead")}</FYTypography>
          <FYTypography variant="h6">
            &lt;iframe src="http://192.168.0.103:3000/widgetImage"
            name="iframe_a" title="Iframe example" &gt;&lt;/iframe&gt;
          </FYTypography>
          <FYTypography variant="h2">{t("websiteReviewHead")}</FYTypography>
          <FYTypography variant="h6">
            {`<iframe
            src="${ReviewPageLink?.link}"
            name="iframe_a" title="Iframe example" ></iframe>`}
          </FYTypography>
        </div>
      </FYBox>
    </div>
  );
};

export default Widget;
