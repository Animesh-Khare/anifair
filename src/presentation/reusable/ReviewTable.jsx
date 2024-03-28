import FYBox from "../../shared/FYBox";
import FYTable from "../../shared/FYTable";
import FYTableHead from "../../shared/FYTableHead";
import FYTableRow from "../../shared/FYTableRow";
import FYTableCell from "../../shared/FYTableCell";
import FYTableBody from "../../shared/FYTableBody";
import FYTableContainer from "../../shared/FYTableContainer";
import TableSkeleton from "../../shared/table/TableSkeleton";
import FYTypography from "../../shared/FYTypography";
import FYRating from "../../shared/FYRating";
import FYStack from "../../shared/FYStack";
import FYPagination from "../../shared/FYPagination";
import VerifiedIcon from "@mui/icons-material/Verified";
import useStyles from "./style";
import { calculateRating } from "../../utils/utilFunctions";
import { useTranslation } from "react-i18next";
import ReportReview from "./ReportReview";
import theme from "../../themes/theme";

const ReviewTable = ({
  isLoading,
  tableHeads,
  reviews,
  currentPage,
  handlePageChange,
  rowsPerPage,
  notFoundMsg,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  if (isLoading)
    return <TableSkeleton sx={{ minWidth: 650 }} length={rowsPerPage} />;

  return (
    <FYBox>
      <FYTableContainer>
        <FYTable sx={{ minWidth: 650 }} aria-label="last review table">
          <FYTableHead>
            <FYTableRow>
              {tableHeads?.length
                ? tableHeads.map((label, index) => (
                    <FYTableCell key={index} className={classes.tableHead}>
                      {t(label)}
                    </FYTableCell>
                  ))
                : null}
            </FYTableRow>
          </FYTableHead>
          <FYTableBody>
            {reviews?.data?.length ? (
              reviews?.data?.map((row) => (
                <FYTableRow
                  key={row._id}
                  sx={{
                    "& td": {
                      border: 0,
                    },
                  }}
                >
                  <FYTableCell>
                    <FYStack direction="row">
                      <VerifiedIcon
                        style={{ color: theme.palette.black.main }}
                      />
                    </FYStack>
                  </FYTableCell>
                  <FYTableCell>
                    <FYStack direction="row">
                      <FYTypography fontSize={12} mr={1} fontWeight="700">
                        {row?.overallScore}
                      </FYTypography>
                      <FYRating
                        readOnly
                        value={calculateRating(row?.overallScore)}
                        precision={0.1}
                        size={"small"}
                      />
                    </FYStack>
                  </FYTableCell>
                  <FYTableCell>
                    <FYTypography fontSize={12} fontWeight={700}>
                      {row?.firstName}
                    </FYTypography>
                    <FYTypography color="rgba(63, 63, 68, 0.50)" fontSize={12}>
                      {row?.city}
                    </FYTypography>
                  </FYTableCell>
                  <FYTableCell>
                    <FYRating
                      readOnly
                      value={calculateRating(row?.greenScore)}
                      precision={0.1}
                      size={"small"}
                      sx={{ color: "green.main" }}
                    />
                  </FYTableCell>
                  <FYTableCell>
                    <FYTypography color="rgba(63, 63, 68, 0.50)" fontSize={12}>
                      {row?.recommendation?.join(",")}
                    </FYTypography>
                  </FYTableCell>
                  <FYTableCell>
                    <FYTypography component="span">
                      <ReportReview id={row?._id} disabled={row?.isReported} />
                    </FYTypography>
                  </FYTableCell>
                </FYTableRow>
              ))
            ) : (
              <FYTableRow>
                <FYTableCell colSpan={tableHeads?.length} align="center">
                  {notFoundMsg}
                </FYTableCell>
              </FYTableRow>
            )}
          </FYTableBody>
        </FYTable>
      </FYTableContainer>
      <FYPagination
        totalItem={reviews?.totalCount || 0}
        count={reviews?.totalPage}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          flexDirection: { lg: "row", sm: "column" },
          mt: { lg: 2, xs: 3 },
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      />
    </FYBox>
  );
};

export default ReviewTable;
