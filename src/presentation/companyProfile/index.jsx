import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CloseableTabs = () => {
  const [openTabs, setOpenTabs] = useState([0]); // An array to store the open tab indexes

  const handleCloseTab = (index) => {
    setOpenTabs((prevOpenTabs) =>
      prevOpenTabs.filter((tabIndex) => tabIndex !== index),
    );
  };

  const handleChangeTab = (event, newValue) => {
    setOpenTabs([...openTabs, newValue]);
  };

  return (
    <div>
      <Tabs value={openTabs} onChange={handleChangeTab}>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        {/* Add more Tab components as needed */}
      </Tabs>

      {openTabs.map((tabIndex) => (
        <div key={tabIndex}>
          <IconButton onClick={() => handleCloseTab(tabIndex)}>
            <CloseIcon />
          </IconButton>
          {/* Render the content of the corresponding tab */}
          {/* Add content for Tab 1, Tab 2, etc. based on the index */}
        </div>
      ))}
    </div>
  );
};

export default CloseableTabs;
