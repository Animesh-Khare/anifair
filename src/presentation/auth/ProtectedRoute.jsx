import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { loadStateFn } from "../../utils/localStorage";

const ProtectedRoute = () => {
  const history = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state) => state.app?.auth);
  const token = loadStateFn();

  useEffect(() => {
    if (!isAuthenticated && !token) {
      history("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <Outlet />;
};

export default ProtectedRoute;
