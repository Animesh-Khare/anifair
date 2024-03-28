import React from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { TextField, FormHelperText, FormLabel } from "@mui/material";
import FYStack from "./FYStack";
import { styled } from "@mui/material/styles";

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  position: "absolute",
  bottom: -5,
  left: 0,
}));

const FYPhoneNumberInput = ({
  label,
  value,
  onChange,
  name,
  error,
  formLabel,
  country,
  ...rest
}) => {
  const handleOnChange = (value, country) => {
    const countryCodeName = country?.countryCode?.toUpperCase();
    const countryCodeNumber = country?.dialCode;
    const updatedEvent = {
      target: {
        name: name,
        value: value,
        countryCodeName,
        countryCodeNumber,
      },
    };
    onChange(updatedEvent);
  };

  return (
    <FYStack flex="1" pb={2.5} position="relative">
      {formLabel && (
        <FormLabel
          sx={{
            color: "primary.dark",
            fontSize: 14,
            marginBottom: 1,
            display: "block",
          }}
        >
          {formLabel}
        </FormLabel>
      )}
      <PhoneInput
        country={country}
        value={value}
        onChange={handleOnChange}
        inputComponent={TextField}
        enableSearch
        inputProps={{
          label: label || "Phone Number",
          variant: "outlined",
          name,
          error: !!error,
        }}
        {...rest}
      />
      {error && <StyledFormHelperText error>{error}</StyledFormHelperText>}
    </FYStack>
  );
};

export default FYPhoneNumberInput;
