import React from "react";
import styled from "@emotion/styled";
import OTPInput from "react-otp-input";
import FYStack from "./FYStack";

const OtpWrapper = styled(FYStack)(({ theme }) => ({
  "& > div": {
    justifyContent: "center",
  },
  "& input": {
    width: "60px !important",
    height: 60,
    border: "1px solid #ddd",
    padding: 10,
    margin: "0 6px",
    borderRadius: 15,
    fontSize: 18,
    "&:focus-visible, &:focus": {
      outline: "none",
    },
  },
}));

const FYOtpInput = ({ otp, setOtp, inputStyle, containerStyle, numInputs }) => {
  const handleKeyPress = (e) => {
    const key = e.key;
    if (!/^\d*$/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleChange = (otpValue) => {
    if (/^\d*$/.test(otpValue)) {
      setOtp(otpValue);
    }
  };

  return (
    <OtpWrapper>
      <OTPInput
        value={otp}
        onChange={handleChange}
        numInputs={numInputs}
        renderInput={(props) => (
          <input {...props} onKeyPress={handleKeyPress} />
        )}
        inputStyle={inputStyle}
        containerStyle={containerStyle}
      />
    </OtpWrapper>
  );
};

export default FYOtpInput;
