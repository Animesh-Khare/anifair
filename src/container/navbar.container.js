import { useEffect, useState } from "react";
import { locationPath } from "../utils/constant";
import { useLocation } from "react-router-dom";
import { navLinks } from "../description/navbar.description";
import { equal } from "../utils/javascript";
import { useDispatch } from "react-redux";
import { SET_COMPANY_DATA } from "../redux/constants";
import { loadStateFn, saveStateFn } from "../utils/localStorage";

const NavbarContainer = () => {
  const [links, setLinks] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParts = location.pathname.split("/");
    const id = urlParts[1];
    const updatedNavLinks = navLinks?.map((link) => {
      if (
        (equal(link.path, "/company-profile") ||
          equal(link.path, "/company-review")) &&
        (equal(urlParts[2], "company-profile") ||
          equal(urlParts[2], "company-review") ||
          id)
      ) {
        saveStateFn("companyId", id);
        dispatch({
          type: SET_COMPANY_DATA,
          payload: {
            companyId: id,
          },
        });
        return {
          ...link,
          path: `/${id.concat(link.path)}`,
        };
      }
      if (
        equal(link.path, "/company-profile") ||
        equal(link.path, "/company-review")
      ) {
        const companyId = loadStateFn("companyId");
        return {
          ...link,
          path: companyId ? `/${companyId.concat(link.path)}` : link.path,
        };
      }
      return link;
    });
    const navLinkPath = updatedNavLinks?.map((link) => {
      return link.path;
    });
    setLinks({
      navLinks: updatedNavLinks,
      allowedNavLinks: navLinkPath,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAttribute = (path) => {
    const attribute = {
      [locationPath.login]: {
        hasLoginBtn: true,
        hasSignupBtn: true,
      },
      [locationPath.signup]: {
        hasLoginBtn: true,
        hasSignupBtn: true,
      },
      [locationPath.signupPartial]: {
        hasLoginBtn: false,
        hasSignupBtn: false,
        hasRenderMobileMenu: false,
      },
    };
    return (
      attribute[path] || {
        hasLoginBtn: true,
        hasSignupBtn: true,
        hasRenderMobileMenu: true,
      }
    );
  };

  return { setAttribute, links };
};

export default NavbarContainer;
