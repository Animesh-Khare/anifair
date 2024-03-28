import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/constants";

const SidebarContainer = ({ handleMenuCollapse, collapse }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collapse && ref.current && !ref.current.contains(event.target)) {
        handleMenuCollapse();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse]);

  const handleLogoutClick = () => {
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const logoutUser = () => {
    localStorage?.clear();
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  return { isOpen, handleLogoutClick, handleOnClose, logoutUser, ref };
};

export default SidebarContainer;
