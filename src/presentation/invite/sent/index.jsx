import React from "react";
import FYBox from "../../../shared/FYBox";
import FYTypography from "../../../shared/FYTypography";
import FYButton from "../../../shared/FYButton";
import FYTableContainer from "../../../shared/FYTableContainer";
import FYTable from "../../../shared/FYTable";
import FYTableHead from "../../../shared/FYTableHead";
import FYTableBody from "../../../shared/FYTableBody";
import FYTableRow from "../../../shared/FYTableRow";
import FYTableCell from "../../../shared/FYTableCell";
import FYPagination from "../../../shared/FYPagination";
import useStyles from "./style";
import InviteSentContainer from "../../../container/invite/inviteSent.container";
import { tableHeads } from "../../../description/invite/invitesent.description";
import { useTranslation } from "react-i18next";

const InviteSent = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const { sentTableData, handlePageChange, currentPage, exportBtnHandler } =
    InviteSentContainer();

  return (
    <>
      <FYBox>
        <FYTypography color="natural.gray" fontSize="20px" fontWeight="400">
          {t("historySentInvitation")}
        </FYTypography>
      </FYBox>
      <FYBox className={classes.exportBtnContainer}>
        <FYButton variant="contained" onClick={exportBtnHandler}>
          {t("export")}
        </FYButton>
      </FYBox>
      <FYBox>
        <FYTableContainer>
          <FYTable className={classes.sentTable}>
            <FYTableHead>
              <FYTableRow>
                {tableHeads.map((item, index) => (
                  <FYTableCell
                    key={index}
                    align={index > 0 ? "center" : "left"}
                  >
                    {t(item)}
                  </FYTableCell>
                ))}
              </FYTableRow>
            </FYTableHead>
            <FYTableBody>
              {sentTableData?.data?.length ? (
                sentTableData?.data?.map((item, index) => (
                  <FYTableRow key={index}>
                    <FYTableCell>
                      <FYTypography>{item._id}</FYTypography>
                    </FYTableCell>
                    <FYTableCell align="center">
                      <FYTypography>{item.sendedCount}</FYTypography>
                    </FYTableCell>
                    <FYTableCell align="center">
                      <FYTypography>{item.failedCount}</FYTypography>
                    </FYTableCell>
                    <FYTableCell align="center">
                      <FYTypography>{item.reviewedCount}</FYTypography>
                    </FYTableCell>
                    <FYTableCell align="center">
                      <FYTypography> {item.remindedCount}</FYTypography>
                    </FYTableCell>
                  </FYTableRow>
                ))
              ) : (
                <FYTableRow>
                  <FYTableCell>
                    <FYTypography>{t("noData")}</FYTypography>
                  </FYTableCell>
                </FYTableRow>
              )}
            </FYTableBody>
          </FYTable>
        </FYTableContainer>
        <FYPagination
          totalItem={sentTableData?.totalCount || 0}
          count={sentTableData?.totalPage}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            flexDirection: { sm: "row", xs: "column" },
            mt: { lg: 2, sm: 3 },
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        />
      </FYBox>
    </>
  );
};

export default InviteSent;
