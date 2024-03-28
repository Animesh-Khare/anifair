import React from "react";
import { Outlet } from "react-router-dom";
import WindTurbines from "../../assets/svg/windTurbines.svg";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Box
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          padding: "10px",
          zIndex: -10,
        }}
      >
        <img src={WindTurbines} alt="WindTurbines" />
      </Box>
    </>
  );
};

export default MainLayout;
