import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import FYTextField from "./FYTextField";
import useStyles from "./css/style";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import FYDropDown from "./FYDropDown";
import FYPhoneNumberInput from "./FYPhoneNumberInput";
import FYGrid from "./FYGrid";
import FYStack from "./FYStack";
import FYTypography from "./FYTypography";
import { equal } from "../utils/javascript";
import FYAutoComplete from "./FYAutoComplete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const FormFields = ({
  attribute,
  error,
  formData,
  handleChange,
  className,
  pointNumberClass,
  activeDropdown,
  activeDropdownName,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState(false);
  const setForm = ({ attr, error, formData, handleChange }) => {
    return attr?.map(
      (
        {
          name,
          label,
          type,
          placeholder,
          startAdornment,
          endAdornment,
          options,
          variant = "standard",
          gridXl,
          gridLg,
          gridMd,
          gridSm,
          gridXsm,
          gridXs,
          pointNumber,
          preSelected,
          isRequired,
          showStar = false,
          country = "us",
          ...rest
        },
        index,
      ) => {
        switch (type) {
          case "text":
          case "email":
          case "url":
          case "password":
            return (
              <FYGrid
                item
                xl={gridXl || 12}
                lg={gridLg || 12}
                md={gridMd || 12}
                sm={gridSm || 12}
                xsm={gridXsm || 12}
                xs={gridXs || 12}
                key={index}
              >
                <FYStack
                  {...(pointNumber && {
                    direction: "row",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    mb: 1.5,
                  })}
                >
                  {pointNumber && (
                    <FYTypography
                      component="span"
                      mt={2}
                      width={20}
                      className={pointNumberClass}
                    >
                      {showStar ? `${t(pointNumber)}*` : t(pointNumber)}
                    </FYTypography>
                  )}
                  <FYTextField
                    {...rest}
                    error={!!error?.[name]}
                    name={name}
                    id={`${name}-${index}`}
                    variant={variant}
                    label={equal(variant, "standard") ? t(label) : null}
                    formLabel={!equal(variant, "standard") ? t(label) : null}
                    type={visibility ? "text" : type}
                    value={formData?.[name]}
                    placeholder={t(placeholder)}
                    helperText={t(error?.[name])}
                    className={classNames(classes.inputField, className)}
                    onChange={(e) => handleChange(e)}
                    InputProps={{
                      endAdornment: endAdornment && (
                        <>
                          {equal(type, "password") ? (
                            visibility ? (
                              <VisibilityOutlinedIcon
                                className={classes.eyeIcon}
                                onClick={() => setVisibility(false)}
                              />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                className={classes.eyeIcon}
                                onClick={() => setVisibility(true)}
                              />
                            )
                          ) : null}
                          <InputAdornment position="end">
                            {endAdornment}
                          </InputAdornment>
                        </>
                      ),
                      startAdornment: startAdornment && (
                        <InputAdornment position="start">
                          {startAdornment}
                        </InputAdornment>
                      ),
                    }}
                  />
                </FYStack>
              </FYGrid>
            );
          case "select":
            return (
              <FYGrid
                item
                xl={gridXl || 12}
                lg={gridLg || 12}
                md={gridMd}
                sm={gridSm || 12}
                xsm={gridXsm || 12}
                xs={gridXs || 12}
                key={index}
              >
                <FYDropDown
                  value={formData?.[name]}
                  name={name}
                  formLabel={t(label)}
                  placeholder={t(placeholder)}
                  error={t(error?.[name])}
                  onChange={handleChange}
                  options={options}
                  classes={classes}
                  preSelected={preSelected}
                  className={className}
                  activeDropdown={activeDropdown}
                  activeDropdownName={activeDropdownName}
                  sx={{
                    "& .MuiMenuItem-root .MuiTypography-root": {
                      fontSize: 12,
                    },
                  }}
                  // {...rest}
                />
              </FYGrid>
            );
          case "phone":
            return (
              <FYGrid
                item
                xl={gridXl || 12}
                lg={gridLg || 12}
                md={gridMd}
                sm={gridSm || 12}
                xsm={gridXsm || 12}
                xs={gridXs || 12}
                key={index}
              >
                <FYStack
                  {...(pointNumber && {
                    direction: "row",
                    alignItems: "flex-start",
                    mb: 1.5,
                    flexWrap: "wrap",
                  })}
                >
                  {pointNumber && (
                    <FYTypography
                      component="span"
                      mt={2}
                      width={20}
                      className={pointNumberClass}
                    >
                      {showStar ? `${t(pointNumber)}*` : t(pointNumber)}
                    </FYTypography>
                  )}
                  <FYPhoneNumberInput
                    formLabel={t(label)}
                    name={name}
                    error={t(error?.[name])}
                    value={formData?.[name]}
                    onChange={handleChange}
                    containerClass={classes.phoneInput}
                    country={country}
                    // {...rest}
                  />
                </FYStack>
              </FYGrid>
            );
          case "autoComplete":
            return (
              <FYGrid
                key={index}
                item
                xl={gridXl || 12}
                lg={gridLg || 12}
                md={gridMd}
                sm={gridSm || 12}
                xsm={gridXsm || 12}
                xs={gridXs || 12}
              >
                <FYStack
                  {...(pointNumber && {
                    direction: "row",
                    alignItems: "flex-start",
                    mb: 1.5,
                    flexWrap: "wrap",
                  })}
                >
                  {pointNumber && (
                    <FYTypography
                      component="span"
                      mt={2}
                      width={20}
                      className={pointNumberClass}
                    >
                      {showStar ? `${t(pointNumber)}*` : t(pointNumber)}
                    </FYTypography>
                  )}
                  <FYAutoComplete
                    name={name}
                    options={options}
                    error={t(error?.[name])}
                    value={formData?.[name]}
                    onChange={handleChange}
                    formLabel={t(label)}
                    placeholder={t(placeholder)}
                  />
                </FYStack>
              </FYGrid>
            );
          default:
            return null;
        }
      },
    );
  };
  return <>{setForm({ attr: attribute, error, formData, handleChange })}</>;
};

export default FormFields;
