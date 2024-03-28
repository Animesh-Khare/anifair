/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { showToast } from "../../utils/toastService";

const InviteImportContainer = () => {
  const { performRequest } = ApiContainer();

  const [fileData, setFiledData] = useState([]);
  const [invitationCount, setInvitationCount] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");

  const getFileUploadData = (value) => {
    setFiledData(value);
  };

  useEffect(() => {
    getInvitationCount();
  }, []);

  const getInvitationCount = async () => {
    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.downloadSample,
        method: method.get,
        showToastMessage: false,
        needLoader: false,
      });
      setDownloadUrl(res.data.fileUrl);
      setInvitationCount(res.data.count);
    } catch (error) {
      showToast(error);
    }
  };

  const sendInvitationCall = async () => {
    try {
      const res = await performRequest({
        endPoint: apiEndPoints?.postExcel,
        method: method.post,
        data: fileData[0],
        showToastMessage: true,
        needLoader: false,
      });

      if (res?.data?.buffer) {
        const downloadLink = document.createElement("a");
        downloadLink.href =
          "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
          res.data.buffer;
        downloadLink.download = `download sample.xlsx`;
        downloadLink.click();
      }
    } catch (error) {
      showToast(error);
    }
  };

  const sendInvitationHandler = () => {
    sendInvitationCall();
  };

  const downloadSampleFile = () => {
    getSampleFile();
  };

  const getSampleFile = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = `download sample.xlsx`;
    downloadLink.click();
  };

  return {
    fileData,
    sendInvitationHandler,
    getFileUploadData,
    downloadSampleFile,
    invitationCount,
  };
};

export default InviteImportContainer;
