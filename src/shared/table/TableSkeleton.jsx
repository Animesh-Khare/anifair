import React from "react";
import FYTableContainer from "../FYTableContainer";
import FYTable from "../FYTable";
import FYTableHead from "../FYTableHead";
import FYTableRow from "../FYTableRow";
import FYTableCell from "../FYTableCell";
import FYSkeleton from "../FYSkeleton";
import FYTableBody from "../FYTableBody";

const TableSkeleton = ({ length }) => {
  return (
    <FYTableContainer>
      <FYTable aria-label="simple table">
        <FYTableHead>
          <FYTableRow>
            <FYTableCell>
              <FYSkeleton height={15} />
            </FYTableCell>
          </FYTableRow>
        </FYTableHead>
        <FYTableBody>
          {Array.from({ length }).map((_, index) => (
            <FYTableRow key={index}>
              <FYTableCell>
                <FYSkeleton height={12} />
              </FYTableCell>
            </FYTableRow>
          ))}
        </FYTableBody>
      </FYTable>
    </FYTableContainer>
  );
};

export default TableSkeleton;
