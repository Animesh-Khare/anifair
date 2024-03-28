/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthenticator } from "../../hooks/use-authenticator";
import { useSelector } from "react-redux";
import { locationPath } from "../../utils/constant";

const PublicRoute = () => {
  const { decodedToken } = useAuthenticator({ component: "public" });
  const navigate = useNavigate();
  const accountType = useSelector(
    (state) => state.app?.auth?.loginData?.accountType,
  );
  const redirectSignupPartial = useSelector(
    (state) => state.app?.auth?.loginData?.redirectSignupPartial,
  );
  useEffect(() => {
    if (decodedToken) {
      if (
        redirectSignupPartial !== undefined &&
        accountType !== undefined &&
        redirectSignupPartial !== null &&
        accountType !== null
      ) {
        navigate(
          redirectSignupPartial
            ? locationPath?.signupPartial
            : accountType
            ? locationPath?.dashboard
            : locationPath?.noSubscriptionPath,
        );
      }
    }
  }, [decodedToken]);
  return <Outlet />;
};

export default PublicRoute;
