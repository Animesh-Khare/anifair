import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import FYBox from "../../shared/FYBox";
import Header from "./Header";
import { useState } from "react";
import TabNavbar from "./TabNavbar";

const drawerWidth = 280;
const AppLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const menuOpen = () => {
    setCollapse(true);
  };
  const menuClose = () => {
    setCollapse(false);
  };
  return (
    <>
      <Sidebar
        collapse={collapse}
        handleMenuCollapse={menuClose}
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      />
      <Header collapse={collapse} handleMenuCollapse={menuOpen} />
      <FYBox
        component="main"
        sx={{
          ml: { md: `${drawerWidth}px`, sm: 0 },
          p: { md: 3.5, sm: 2.5, xs: 2 },
          mt: { md: 10, sm: 13, xs: 10 },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <TabNavbar />
        <Outlet />
      </FYBox>
    </>
  );
};

export default AppLayout;
