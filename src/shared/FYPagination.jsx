import { Pagination } from "@mui/material";
import React from "react";
import FYTypography from "./FYTypography";
import FYStack from "./FYStack";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    "&.Mui-selected": {
      backgroundColor: "transparent",
      borderColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      height: 25,
      minWidth: 25,
    },
  },
}));
const FYPagination = ({ totalItem = 0, sx, ...props }) => {
  const { t } = useTranslation();
  return (
    <FYStack sx={sx}>
      <FYTypography
        variant="body2"
        mr={{ md: 3, xs: 0 }}
        mb={{ sm: 1, xs: 1 }}
      >{`${t("total")}\t${totalItem}\t${t("items")}`}</FYTypography>
      <StyledPagination {...props} variant="outlined" shape="rounded" />
    </FYStack>
  );
};

export default FYPagination;
