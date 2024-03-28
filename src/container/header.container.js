import { useEffect, useState } from "react";
import { loadStateFn, saveStateFn } from "../utils/localStorage";
import i18n from "../i18n/i18n";
import { useLocation } from "react-router-dom";
import { equal } from "../utils/javascript";
import { useSelector } from "react-redux";
import logo from "../assets/svg/companyLogo.svg";

const HeaderContainer = ({ countries }) => {
  const location = useLocation();
  const fullName = useSelector(
    (state) => state.app?.company?.averageRatings?.fullName,
  );
  const logoUrl = useSelector((state) => state.app?.auth?.loginData?.logoUrl);

  const [selectedOption, setSelectedOption] = useState(
    loadStateFn("selectedLanguage") || countries[0].value,
  );
  const [activeTab, setActiveTab] = useState("");
  const [greeting, setGreeting] = useState("");
  const [showName, setShowName] = useState(false);
  const urlParts = location?.pathname?.split("/");

  const [avatarSrc, setAvatarSrc] = useState(logo);

  useEffect(() => {
    if (logoUrl !== undefined && logoUrl !== "undefined") {
      setAvatarSrc(logoUrl);
    }
  }, [logoUrl]);

  useEffect(() => {
    setActiveTab(urlParts[2]);
    if (equal(urlParts[1], "dashboard")) {
      setShowName(true);
    } else {
      setShowName(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);

  useEffect(() => {
    const storedLanguage = loadStateFn("selectedLanguage");
    if (storedLanguage) {
      setSelectedOption(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
    const currentHour = new Date().getHours();

    if (currentHour >= 2 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    i18n.changeLanguage(value);
    saveStateFn("selectedLanguage", value);
  };

  const parentRoute = urlParts[1];

  return {
    selectedOption,
    greeting,
    activeTab,
    parentRoute,
    showName,
    fullName,
    handleOptionChange,
    avatarSrc,
  };
};

export default HeaderContainer;
