/* eslint-disable no-unused-vars */
import { formPath } from "../../description/subscription.description";
import FYGrid from "../../shared/FYGrid";
import { Box, Divider } from "@mui/material";
import useStyles from "./style";
import FYTypography from "../../shared/FYTypography";
import { useTranslation } from "react-i18next";
import FYButton from "../../shared/FYButton";
import FYSwitch from "../../shared/FYSwitch";
import {
  planAttMonthly,
  planAttYearly,
} from "../../description/boost.description";
import FYCard from "../../shared/FYCard";
import BoostContainer from "../../container/boost.container";
import UnionLogo from "../../assets/svg/Union.svg";
import { useState } from "react";
import { equal, head, lowerCase } from "../../utils/javascript";

const Boost = () => {
  const {
    handleSubmit,
    loadingStatus,
    selectedPlan,
    handleSwitch,
    checkSwitch,
  } = BoostContainer({
    formPath,
  });

  const planAttData = checkSwitch ? planAttYearly : planAttMonthly;
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.boostPage}>
      <Box>
        <FYGrid item md={6} xs={12} mx="auto">
          <FYTypography variant="h2" mb={2} color="blue.gray">
            {t("boostPrompt")}
          </FYTypography>
          <FYTypography variant="h3" color="blue.gray" mb={3}>
            {t("boostMessage")}
          </FYTypography>
          <div className={classes.container}>
            <FYSwitch
              leftText={t("monthly")}
              rightText={t("yearly")}
              mb={3}
              onChange={handleSwitch}
              checked={checkSwitch}
            />
            <FYGrid container spacing={4}>
              {planAttData?.map((data, index) => (
                <FYGrid item key={index}>
                  <FYCard
                    sx={{
                      boxShadow:
                        equal(head(selectedPlan)?.id, data?.value) &&
                        "0 4px 8px rgba(0, 0, 0, 1)",
                    }}
                  >
                    <FYTypography
                      variant="h4"
                      style={{
                        backgroundColor: equal(data.label, "basic")
                          ? "#0E854E1A"
                          : "#0E854E80",
                      }}
                    >
                      {t([data.label])}
                    </FYTypography>
                    <FYTypography variant="h5" color="blue.gray">
                      {data.description}
                      <span>{data.duration}</span>
                    </FYTypography>
                    <FYTypography color="blue.gray" variant="h6">
                      {t([data.message])}
                    </FYTypography>
                    <FYButton
                      type="submit"
                      variant={
                        equal(data.label, "basic") ? "text" : "contained"
                      }
                      onClick={(e) => handleSubmit(e, data.value)}
                      isLoading={loadingStatus}
                      fullWidth
                      sx={{
                        mt: 2,
                        border:
                          equal(data.label, "basic") && "2px solid #127FBF",
                        color: equal(data.label, "basic") && "#2D2D2D",
                      }}
                    >
                      {t([data.btnText])}
                    </FYButton>
                    <Divider mb={3} />
                    <FYTypography color="blue.gray">
                      <img src={UnionLogo} alt="Union Logo" />
                      {t([data.term1])}
                    </FYTypography>
                    <FYTypography color="blue.gray">
                      <img src={UnionLogo} alt="Union Logo" />
                      {t([data.term2])}
                    </FYTypography>
                    <FYTypography color="blue.gray">
                      <img src={UnionLogo} alt="Union Logo" />
                      {t([data.term3])}
                    </FYTypography>
                    <FYTypography color="blue.gray">
                      <img src={UnionLogo} alt="Union Logo" />
                      {t([data.term4])}
                    </FYTypography>
                  </FYCard>
                </FYGrid>
              ))}
            </FYGrid>
          </div>
        </FYGrid>
      </Box>
    </div>
  );
};

export default Boost;
