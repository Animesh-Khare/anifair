export const navLinks = [
  // {
  //   label: "Home",
  //   path: "/home",
  // },
  {
    label: "Company",
    path: "/company-profile",
  },
  {
    label: "Review",
    path: "/company-review",
  },
];

export const allowedNavLinks = navLinks?.map((link) => {
  return link?.path;
});

export const mobileMenuId = "primary-search-account-menu-mobile";
