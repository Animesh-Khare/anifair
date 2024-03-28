import { useTranslation } from "react-i18next";
import ReviewQuestionsContainer from "../../../container/reviews/reviewQuestions.container";
import {
  limitPerPage,
  tableHeads,
} from "../../../description/reviews/reviewQuestions.description";
import FYBox from "../../../shared/FYBox";
import FYButton from "../../../shared/FYButton";
import FYCheckbox from "../../../shared/FYCheckbox";
import FYPagination from "../../../shared/FYPagination";
import FYTable from "../../../shared/FYTable";
import FYTableBody from "../../../shared/FYTableBody";
import FYTableCell from "../../../shared/FYTableCell";
import FYTableContainer from "../../../shared/FYTableContainer";
import FYTableHead from "../../../shared/FYTableHead";
import FYTableRow from "../../../shared/FYTableRow";
import FYTypography from "../../../shared/FYTypography";
import { pascalCase } from "../../../utils/javascript";
import useStyles from "../style";
import AddQuestion from "./AddQuestion";
import DeleteQuestion from "./DeleteQuestion";
import FYLoader from "../../../shared/FYLoader";

const ReviewQuestions = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    loadingStatus,
    questions,
    renderQuestionsType,
    showAddQue,
    currentPage,
    handlePageChange,
    handleAddQuestionClick,
  } = ReviewQuestionsContainer();

  const questionNumber = (currentPage - 1) * limitPerPage;

  if (loadingStatus) return <FYLoader variant="fullPage" />;

  return (
    <FYBox>
      <FYBox>
        <FYTypography
          color="black.secondary"
          fontSize={14}
          sx={{
            marginBottom: { xs: 1, lg: 0 },
            textAlign: { lg: "end", xs: "start" },
          }}
        >
          {t("questionDescription")}
        </FYTypography>
        <FYButton
          variant="contained"
          onClick={handleAddQuestionClick}
          isDisable={showAddQue}
          sx={{
            "&.MuiButtonBase-root": {
              padding: "5px 24px",
              fontSize: 14,
            },
          }}
        >
          {t("addQuestion")}
        </FYButton>
        <FYTypography
          color="black.dark"
          fontSize={15}
          sx={{ margin: "20px 0 12px 0" }}
        >
          {t("extraQuestion")}
          {". "}
          <FYTypography variant="span" color="black.secondary" fontSize={15}>
            ({t("optional")})
          </FYTypography>
        </FYTypography>
      </FYBox>
      <FYBox>
        <FYTableContainer>
          <FYTable
            sx={{ minWidth: 650 }}
            aria-label="last review table"
            className={classes.AddQueTable}
          >
            <FYTableHead>
              <FYTableRow>
                {tableHeads?.length
                  ? tableHeads.map((label, index) => (
                      <FYTableCell key={index}>{t([label])}</FYTableCell>
                    ))
                  : null}
              </FYTableRow>
            </FYTableHead>
            <FYTableBody>
              {showAddQue && <AddQuestion closeForm={handleAddQuestionClick} />}
              {questions?.question?.length ? (
                questions?.question?.map((row, index) => (
                  <FYTableRow
                    key={row?._id}
                    sx={{
                      "& td": {
                        border: 0,
                      },
                    }}
                  >
                    <FYTableCell>
                      <FYTypography color="black.secondary">{`Question ${
                        showAddQue
                          ? questionNumber + index + 2
                          : questionNumber + index + 1
                      }`}</FYTypography>
                    </FYTableCell>
                    <FYTableCell>
                      <FYTypography color="black.secondary">
                        {pascalCase(row?.type)}
                      </FYTypography>
                    </FYTableCell>
                    <FYTableCell>
                      <FYTypography color="black.secondary">
                        {row?.question}
                      </FYTypography>
                    </FYTableCell>
                    <FYTableCell>
                      <FYCheckbox
                        checked={row?.isRequired}
                        disabled={true}
                        className={classes.checkBox}
                      />
                    </FYTableCell>
                    {renderQuestionsType(row)}
                    <FYTableCell>
                      <DeleteQuestion id={row?._id} currentPage={currentPage} />
                    </FYTableCell>
                  </FYTableRow>
                ))
              ) : (
                <FYTableRow>
                  <FYTableCell colSpan={tableHeads?.length} align="center">
                    {t("noQuestion")}
                  </FYTableCell>
                </FYTableRow>
              )}
            </FYTableBody>
          </FYTable>
        </FYTableContainer>
        <FYPagination
          totalItem={questions?.totalCount || 0}
          count={questions?.totalPage}
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
    </FYBox>
  );
};

export default ReviewQuestions;
