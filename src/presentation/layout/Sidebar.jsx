import { Link, useLocation } from "react-router-dom";
import {
  Badge,
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  logoutIcon,
  logoutLabel,
  sidebarNavlinks,
} from "../../description/sidebar.description";
import useStyles from "./css/sidebar.style";
import classNames from "classnames";
import { useEffect, useState } from "react";
import SidebarContainer from "../../container/sidebar.container";
import FYStack from "../../shared/FYStack";
import FYDialog from "../../shared/FYDialog";
import FYButton from "../../shared/FYButton";
import FYTypography from "../../shared/FYTypography";
import LogoSvg from "../../assets/png/New logo 3.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ReactComponent as Question } from "../../assets/svg/question.svg";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const Sidebar = ({ collapse, handleMenuCollapse, ...rest }) => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();

  const { isOpen, handleLogoutClick, handleOnClose, logoutUser, ref } =
    SidebarContainer({ handleMenuCollapse, collapse });

  const dialogActions = [
    {
      label: "yes",
      onClick: logoutUser,
      variant: "contained",
    },
    {
      label: "no",
      onClick: handleOnClose,
    },
  ];

  return (
    <>
      <Drawer
        anchor="left"
        variant="permanent"
        className={classNames(classes.sidebarContainer, {
          [classes.show]: !collapse,
        })}
        ref={ref}
        {...rest}
      >
        <Box className={classes.sidebarLogo}>
          <img src={LogoSvg} alt="Logo" />
        </Box>
        <CloseIcon
          onClick={handleMenuCollapse}
          className={classes.closeButton}
        />
        <List className={classes.sidebarMenu}>
          {sidebarNavlinks.map(({ childRoute, ...link }, index) => {
            const { path, label, icon, badge } = link;
            return (
              <ListItem key={index}>
                {childRoute?.length ? (
                  <CollapseNavLink
                    childRoute={childRoute}
                    link={link}
                    handleMenuCollapse={handleMenuCollapse}
                  />
                ) : (
                  <Link
                    className={classNames({
                      [classes.activeLink]: location?.pathname.includes(path),
                    })}
                    to={path}
                  >
                    <ListItemButton onClick={handleMenuCollapse}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>
                        {t([label])}
                        {badge && (
                          <Badge
                            color={badge.color}
                            badgeContent={badge.title}
                          />
                        )}
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                )}
              </ListItem>
            );
          })}
          <ListItem onClick={handleLogoutClick}>
            <ListItemButton>
              <ListItemIcon>{logoutIcon}</ListItemIcon>
              <ListItemText primary={logoutLabel} />
            </ListItemButton>
          </ListItem>
        </List>
        <FYStack direction="row" px={3} mt={2}>
          <IconButton color="black">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="black">
            <InstagramIcon />
          </IconButton>
          <IconButton color="black">
            <FacebookIcon /> 
          </IconButton>
        </FYStack>
        <FYStack p={3} alignItems="center" pt={3} mt="auto">
          <FYTypography
            sx={{ "& svg": { mr: 1, verticalAlign: "middle" } }}
            color="black.main"
            fontFamily={"'Work Sans', sans-serif"}
            fontSize={12}
          >
            <Question />
            {t("needAssistance")}
          </FYTypography>
        </FYStack>
      </Drawer>
      <FYDialog
        open={isOpen}
        onClose={handleOnClose}
        content={t("logoutAlert")}
        actions={
          <>
            {dialogActions.map(({ label, onClick, variant }, index) => (
              <FYButton key={index} onClick={onClick} variant={variant}>
                {t([label])}
              </FYButton>
            ))}
          </>
        }
      />
    </>
  );
};

const CollapseNavLink = ({ childRoute, link, handleMenuCollapse }) => {
  const classes = useStyles();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (location.pathname?.includes(link?.path)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);

  const handleLinkclick = () => {
    setIsOpen(!isOpen);
  };
  const { path: parentPath, label: parentLabel, icon, badge } = link;
  return (
    <FYStack className={isOpen ? classes.dropdownOpen : ""}>
      <ListItemButton onClick={handleLinkclick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          {parentLabel}
          {badge && <Badge color={badge.color} badgeContent={badge.title} />}
        </ListItemText>
      </ListItemButton>
      <Collapse in={isOpen}>
        {childRoute?.map(({ path: childPath, label: childLabel }, index) => {
          const routePath = parentPath?.concat(childPath);
          return (
            <ListItem key={index} component="div" disablePadding>
              <Link
                to={routePath}
                className={classNames({
                  [classes.subActiveLink]:
                    location?.pathname.includes(routePath),
                })}
              >
                <ListItemButton onClick={handleMenuCollapse} disableRipple>
                  {t([childLabel])}
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </Collapse>
    </FYStack>
  );
};

export default Sidebar;
