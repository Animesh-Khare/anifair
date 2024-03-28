import React, { useEffect, useState } from "react";
import FYBox from "../../shared/FYBox";
import { Tab, Tabs } from "@mui/material";
import { equal, pascalCase } from "../../utils/javascript";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarNavlinks } from "../../description/sidebar.description";
import useStyles from "./css/layout.style";
import { useTranslation } from "react-i18next";

const TabNavbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [subRoutes, setSubRoutes] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const urlParts = location?.pathname?.split("/");
  const { t } = useTranslation();

  useEffect(() => {
    const currentRoute = sidebarNavlinks.find(({ path }) =>
      equal(path, `/${urlParts[1]}`),
    );
    setSubRoutes(currentRoute?.childRoute ? [...currentRoute.childRoute] : []);
    setActiveTab(urlParts[2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);

  const handleTabChange = (event, newValue) => {
    return navigate(newValue);
  };
  return (
    <>
      {subRoutes?.length ? (
        <FYBox className={classes.navTab} mb={4}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            {subRoutes.map(({ label, path }, index) => (
              <Tab
                label={pascalCase(t([label]))}
                value={path?.slice(1)}
                key={index}
                sx={{ textTransform: "capitalize" }}
              />
            ))}
          </Tabs>
        </FYBox>
      ) : null}
    </>
  );
};

export default TabNavbar;
