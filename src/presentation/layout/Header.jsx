import FYTypography from "../../shared/FYTypography";
import { ReactComponent as Notification } from "../../assets/svg/notification.svg";
import FYStack from "../../shared/FYStack";
import useStyles from "./css/layout.style";
import { Avatar } from "@mui/material";
import FYBox from "../../shared/FYBox";
import MenuIcon from "@mui/icons-material/Menu";
import classNames from "classnames";
import FYDropDown from "../../shared/FYDropDown";
import { countries } from "../../utils/constant";
import HeaderContainer from "../../container/header.container";
import { pascalCase, truncateWithEllipsis } from "../../utils/javascript";
import { loadStateFn } from "../../utils/localStorage";

const Header = ({ collapse, handleMenuCollapse }) => {
  const classes = useStyles();
  const {
    selectedOption,
    greeting,
    parentRoute,
    activeTab,
    showName,
    fullName,
    handleOptionChange,
    avatarSrc,
  } = HeaderContainer({
    countries,
  });

  return (
    <>
      <FYStack
        direction="row"
        alignItems="center"
        className={classNames(classes.appBarHeader, {
          [classes.show]: collapse,
        })}
      >
        <MenuIcon onClick={handleMenuCollapse} className={classes.menuButton} />
        <FYTypography
          variant="h5"
          component="h5"
          fontFamily="'Work Sans', sans-serif"
          className={classes.headerTitle}
        >
          {showName ? `${greeting}, ` : `${pascalCase(parentRoute)}`}
          <FYTypography
            variant="h5"
            component="span"
            fontFamily="'Work Sans', sans-serif"
            fontWeight={600}
          >
            {showName
              ? fullName
              : activeTab !== undefined && `| ${pascalCase(activeTab)}`}
          </FYTypography>
        </FYTypography>

        <FYStack ml="auto" direction="row" alignItems="center" spacing={2}>
          <FYDropDown
            value={selectedOption}
            onChange={handleOptionChange}
            options={countries}
            classes={classes}
            className={classes.headerLanguageDropdown}
            activeDropdown={false}
            noPadding
          />
          <FYBox className={classes.notification}>
            <Notification />
          </FYBox>
          <Avatar
            alt={loadStateFn("companyName")}
            src={avatarSrc}
            sx={{
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.13)",
              width: { md: 66, sm: 44, xs: 34 },
              height: { md: 66, sm: 44, xs: 32 },
              p: 1,
            }}
          />
          <FYBox
            sx={{ display: { xs: "none", md: "block", minWidth: "120px" } }}
          >
            <FYTypography color="natural.dark" variant="body2" fontWeight="500">
              {truncateWithEllipsis(loadStateFn("companyName"), 22)}
            </FYTypography>
            <FYTypography color="natural.dark" variant="body2" fontSize={12}>
              {loadStateFn("workGoal")}
            </FYTypography>
          </FYBox>
        </FYStack>
      </FYStack>
    </>
  );
};

export default Header;
