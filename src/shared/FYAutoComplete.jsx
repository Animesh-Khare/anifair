import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FYTextField from "./FYTextField";
import FYStack from "./FYStack";
import { styled } from "@mui/material/styles";
import { FormLabel } from "@mui/material";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputBase-root": {
    "&.MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.natural.main,
        borderRadius: 10,
      },
    },
  },
}));

const FYAutoComplete = ({
  name,
  formLabel,
  options,
  label,
  value,
  onChange,
  error,
  placeholder,
}) => {
  const handleChange = (event, newValue) => {
    const updatedEvent = {
      target: {
        name: name,
        value: newValue?.value,
      },
    };
    onChange(updatedEvent);
  };
  return (
    <FYStack flex="1">
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
      <StyledAutocomplete
        options={options}
        defaultValue={value}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <FYTextField
            {...params}
            name={name}
            label={label}
            variant="outlined"
            error={!!error}
            helperText={error}
            placeholder={placeholder}
          />
        )}
      />
    </FYStack>
  );
};

export default FYAutoComplete;
