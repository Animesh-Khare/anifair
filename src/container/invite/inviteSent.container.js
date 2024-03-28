import { useEffect, useState } from "react";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { showToast } from "../../utils/toastService";
import { limitPerPage } from "../../description/invite/invitesent.description";

const InviteSentContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sentTableData, setSentTableData] = useState([]);

  const { performRequest } = ApiContainer();

  useEffect(() => {
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getTableData = async () => {
    try {
      const response = await performRequest({
        endPoint: `${apiEndPoints?.inviteSentTable}?perPage=${limitPerPage}&page=${currentPage}`,
        method: method?.get,
        needLoader: true,
        showToastMessage: false,
      });
      setSentTableData(response.data);
    } catch (error) {
      showToast(error);
    }
  };

  const getExportFile = async () => {
    try {
      const response = await performRequest({
        endPoint: `${apiEndPoints?.inviteSentTable}`,
        method: method?.get,
        needLoader: true,
        showToastMessage: false,
      });
      const downloadLink = document.createElement("a");

      downloadLink.href =
        "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
        response.data.buffer;
      downloadLink.download = `download sample.xlsx`;
      downloadLink.click();
    } catch (error) {
      showToast(error);
    }
  };

  const exportBtnHandler = () => {
    getExportFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return {
    sentTableData,
    handlePageChange,
    currentPage,
    exportBtnHandler,
  };
};

export default InviteSentContainer;
