import { useTranslation } from "react-i18next";
import OtpVerificationContainer from "../../container/otpVerification.container";
import {
  formPath,
  numberOfInputField,
  otpResendTime,
} from "../../description/otpVerification.description";
import styles from "./style";
import FYButton from "../../shared/FYButton";
import FYOtpInput from "../../shared/FYOtpInput";
import FYBox from "../../shared/FYBox";
import OTPFrame from "../../assets/svg/otpImage.svg";
import FYStack from "../../shared/FYStack";
import { Container } from "@mui/material";
import FYTypography from "../../shared/FYTypography";
import { ternary } from "../../utils/javascript";

const OtpVerificationPage = () => {
  const classes = styles();
  const {
    otp,
    otpError,
    handleInputChange,
    handleResendOTP,
    handleSubmitOTP,
    timer,
    loadingStatusSubmit,
    loadingStatusResend,
  } = OtpVerificationContainer({ formPath, numberOfInputField, otpResendTime });
  const { t } = useTranslation();

  return (
    <FYStack py={{ md: 12, sm: 8, xs: 4 }} width="100%">
      <Container>
        <FYStack className={classes.verificationOtp}>
          <FYBox mb={3}>
            <img src={OTPFrame} alt="Otp Frame" />
          </FYBox>
          <FYStack>
            <FYTypography variant="h4" component="h4" fontWeight="500" mb={3}>
              {t("enterCode")}
            </FYTypography>
            <FYTypography variant="body2" component="p" mb={3}>
              {t("otpPageDescription")}
            </FYTypography>
            <FYOtpInput
              numInputs={numberOfInputField}
              otp={otp}
              setOtp={handleInputChange}
              inputStyle={ternary(
                otpError,
                { color: "red", borderColor: "red" },
                {},
              )}
            />
            <div style={{ color: "red" }}></div>
            <FYStack direction="row" mt={3} justifyContent="center">
              <FYButton
                onClick={handleResendOTP}
                isDisable={timer !== 0}
                isLoading={loadingStatusResend}
              >
                {timer === 0 ? t("resend") : timer}
              </FYButton>
              <FYButton
                variant="contained"
                sx={{ minWidth: 190 }}
                onClick={handleSubmitOTP}
                isLoading={loadingStatusSubmit}
              >
                {t("submit")}
              </FYButton>
            </FYStack>
          </FYStack>
        </FYStack>
      </Container>
    </FYStack>
  );
};

export default OtpVerificationPage;
