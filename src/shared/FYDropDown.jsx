import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import FYStack from "./FYStack";
import FYTypography from "./FYTypography";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { head } from "../utils/javascript";
import { planAtt } from "../description/signupPartial.description";

const FYDropDown = ({
  value,
  onChange,
  options,
  classes,
  name,
  error,
  formLabel,
  placeholder,
  preSelected,
  noPadding,
  className,
  sx,
  activeDropdown,
  optionColor,
  activeDropdownName,
  ...rest
}) => {
  const { t } = useTranslation();
  const handleSelectChange = (event) => {
    onChange(event);
  };

  const defaultValue =
    value === "" || value === undefined ? head(options)?.value : value;

  const option = planAtt.map(({ options }) =>
    options.map(({ value }) => value),
  );
  const planArray = [].concat(...option);
  return (
    <>
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
      <FormControl
        sx={{ pb: noPadding ? 0 : 3 }}
        fullWidth
        className={
          (classNames(classes?.formControl, {
            [classes?.selected]: preSelected,
          }),
          className)
        }
        error={!!error}
      >
        <Select
          value={defaultValue}
          defaultValue={defaultValue}
          sx={
            (activeDropdown === value ||
              (planArray.includes(value) && activeDropdownName === name)) && {
              border: 2,
              borderColor: "primary.main",
              borderRadius: 2,
            }
          }
          onChange={handleSelectChange}
          displayEmpty
          fullWidth
          name={name}
          classes={{
            icon: classes?.selectIcon,
            select: classes?.selectText,
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                boxShadow: "0 10px 10px 2px #f6f6f6",
                ...sx,
              },
            },
          }}
        >
          {placeholder ? (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          ) : null}

          {options?.map((option, index) => (
            <MenuItem
              key={`${index}-${option?.value}`}
              value={option?.value}
              className={classes?.menuItem}
            >
              <FYStack
                direction="row"
                spacing={1}
                className={classes?.optionContent}
              >
                {option?.icon && (
                  <FYTypography component="span" className={classes?.icon}>
                    {option?.icon}
                  </FYTypography>
                )}
                <FYStack>
                  <FYTypography
                    component="span"
                    color={optionColor && optionColor}
                  >
                    {option?.isTranslate ? t(option?.label) : option?.label}
                  </FYTypography>
                  <FYTypography component="span" color="#888888">
                    {option?.description}
                  </FYTypography>
                </FYStack>
              </FYStack>
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default FYDropDown;
