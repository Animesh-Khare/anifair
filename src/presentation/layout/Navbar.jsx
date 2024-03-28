import React, { useState, useEffect } from "react";
import LogoSvg from "../../assets/png/headerLogo.png";
import AddIcon from "@mui/icons-material/Add";
import useStyles from "./css/navbar.style";
import FYButton from "../../shared/FYButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarContainer from "../../container/navbar.container";
import { AppBar, Box, Menu, MenuItem, Stack, Toolbar } from "@mui/material";
import { countries, locationPath } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import FYDropDown from "../../shared/FYDropDown";
import { mobileMenuId } from "../../description/navbar.description";
import i18n from "../../i18n/i18n";
import { loadStateFn, saveStateFn } from "../../utils/localStorage";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import FYTypography from "../../shared/FYTypography";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { SET_APP_DATA, SET_FORM_PATTERN_DATA } from "../../redux/constants";

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAttribute, links } = NavbarContainer();
  const { navLinks, allowedNavLinks } = links;
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(
    loadStateFn("selectedLanguage") || countries[0].value,
  );
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const companyReviewStore = useSelector(
    (state) => state?.form?.pattern?.company_review,
  );

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    i18n.changeLanguage(value);
    saveStateFn("selectedLanguage", value);
    companyReviewStore?.countryCodeNumber &&
      dispatch({
        type: SET_FORM_PATTERN_DATA,
        payload: {
          company_review: { ...companyReviewStore, countryCodeNumber: null },
        },
      });
  };
  useEffect(() => {
    const storedLanguage = loadStateFn("selectedLanguage");
    if (storedLanguage) {
      setSelectedOption(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: SET_APP_DATA,
      payload: { language: selectedOption },
    });
  }, [selectedOption, dispatch]);

  const getNavAttribute = setAttribute(location?.pathname);
  const { hasLoginBtn, hasSignupBtn, hasRenderMobileMenu } = getNavAttribute;

  const homepageRedirect = () => {
    navigate(locationPath.homePage);
  };

  const loginRedirect = () => {
    navigate(locationPath.login);
  };

  const signupRedirect = () => {
    navigate(locationPath.signup);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {allowedNavLinks?.some((path) => location?.pathname.includes(path)) &&
        navLinks?.map((link, index) => {
          const { path, label } = link;
          return (
            <MenuItem
              key={index}
              sx={{ "& a": { color: "black.main", textDecoration: "none" } }}
            >
              <Link
                className={classNames({
                  [classes.activeLink]: location?.pathname.includes(path),
                })}
                to={path}
              >
                {label}
              </Link>
            </MenuItem>
          );
        })}
      {hasLoginBtn && (
        <MenuItem>
          <FYTypography onClick={loginRedirect}>{t("login")}</FYTypography>
        </MenuItem>
      )}
      {hasSignupBtn && (
        <MenuItem>
          <FYTypography onClick={signupRedirect}>{t("signup")}</FYTypography>
        </MenuItem>
      )}
    </Menu>
  );
  return (
    <Box className={classes.navbarContainer}>
      <AppBar position="static" color="inherit">
        <Toolbar disableGutters>
          <Box className={classes.logo}>
            <img
              src={LogoSvg}
              alt="Logo"
              className={classes.logoImage}
              onClick={homepageRedirect}
            />
          </Box>
          <Stack direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
            {allowedNavLinks?.some((path) =>
              location?.pathname.includes(path),
            ) &&
              navLinks?.map((link, index) => {
                const { path, label } = link;
                return (
                  <Link
                    className={classNames(classes.navLinks, {
                      [classes.activeLink]: location?.pathname.includes(path),
                    })}
                    to={path}
                    key={index}
                  >
                    {label}
                  </Link>
                );
              })}
          </Stack>
          <Box className={classes.buttonContainer}>
            <FYDropDown
              value={selectedOption}
              onChange={handleOptionChange}
              options={countries}
              classes={classes}
            />
            <Box sx={{ display: { xs: "none", md: "flex" }, flex: "none" }}>
              {hasLoginBtn && (
                <FYButton variant="outlined" onClick={loginRedirect}>
                  {t("login")}
                </FYButton>
              )}
              {hasSignupBtn && (
                <FYButton
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={signupRedirect}
                >
                  {t("signup")}
                </FYButton>
              )}
            </Box>
            {hasRenderMobileMenu && (
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="white"
                  sx={{ p: 0 }}
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default Navbar;
