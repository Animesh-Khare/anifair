import React from "react";
import BrandViewProfileContainer from "../../../container/brand/brandViewProfile.container";

const BrandViewProfile = () => {
  const { companyUrl } = BrandViewProfileContainer();
  return <div>{companyUrl?.link}</div>;
};

export default BrandViewProfile;
