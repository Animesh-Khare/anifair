import { useTranslation } from "react-i18next";
import AccountSettingsContainer from "../../../container/account/accountSettings.container";
import FYBox from "../../../shared/FYBox";
import FYGrid from "../../../shared/FYGrid";
import FYTypography from "../../../shared/FYTypography";
import FYTableRow from "../../../shared/FYTableRow";
import FYTableCell from "../../../shared/FYTableCell";
import FYTableContainer from "../../../shared/FYTableContainer";
import FYTableBody from "../../../shared/FYTableBody";
import {
  basicInfo,
  companyInfo,
  planDetails,
} from "../../../description/account/accountSettings.description";
import FYButton from "../../../shared/FYButton";
import { useNavigate } from "react-router-dom";
import { locationPath } from "../../../utils/constant";

const AccountSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleSubscription = () => {
    navigate(locationPath?.boost);
  };
  // eslint-disable-next-line no-unused-vars
  const { loadingStatus, accountDetail } = AccountSettingsContainer();
  return (
    <FYBox>
      <FYBox>
        <FYGrid container columnSpacing={2} direction="column">
          <FYGrid item xl={8} lg={6} md={4} sm={4} xs={12}>
            <FYTypography fontWeight="400" pb={3} flex={1} mt={{ xs: 0 }}>
              {t("accountSettings")}
            </FYTypography>
          </FYGrid>
          <FYGrid item xl={8} lg={6} md={4} sm={4} xs={12}>
            <FYTableContainer>
              <FYTableBody>
                {basicInfo?.map(({ label, info }) => {
                  return (
                    <FYTableRow>
                      <FYTableCell>{t([label])}</FYTableCell>
                      <FYTableCell>{accountDetail?.[info]}</FYTableCell>
                    </FYTableRow>
                  );
                })}
              </FYTableBody>
            </FYTableContainer>
          </FYGrid>
        </FYGrid>
        <FYGrid container columnSpacing={2}>
          <FYGrid item xl={8} lg={6} md={4} sm={4} xs={12}>
            <FYTypography fontWeight="400" pb={3} flex={1} mt={{ xs: 0 }}>
              {t("changePlan")}
            </FYTypography>
          </FYGrid>
        </FYGrid>
        <FYGrid>
          <FYTableContainer>
            <FYTableBody>
              {planDetails?.map(({ label, info }) => {
                return (
                  <FYTableRow>
                    <FYTableCell>{t(label)}</FYTableCell>
                    <FYTableCell>{accountDetail?.[info]}</FYTableCell>
                  </FYTableRow>
                );
              })}
            </FYTableBody>
          </FYTableContainer>
          <FYButton variant="contained" onClick={handleSubscription}>
            {accountDetail?.currentPlan === "BASIC"
              ? t("setToPro")
              : t("setToBasic")}
          </FYButton>
        </FYGrid>
        <FYGrid>
          <FYTableContainer>
            <FYTableBody>
              {companyInfo?.map(({ label, info }) => {
                return (
                  <FYTableRow>
                    <FYTableCell>{t(label)}</FYTableCell>
                    <FYTableCell>{accountDetail?.[info]}</FYTableCell>
                  </FYTableRow>
                );
              })}
            </FYTableBody>
          </FYTableContainer>
        </FYGrid>
      </FYBox>
    </FYBox>
  );
};

export default AccountSettings;
