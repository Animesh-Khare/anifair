/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { equal, head, length } from "../../utils/javascript";
import { showToast } from "../../utils/toastService";
import { ApiContainer } from "../../utils/api";
import { apiEndPoints, method } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { SET_COMPANY_DATA, SET_LOGO } from "../../redux/constants";
import { saveStateFn } from "../../utils/localStorage";
import logo from "../../assets/png/logo-1 2.png";
import backImage from "../../assets/svg/bgImage.svg";
import {
  descriptionMaxLength,
  descriptionMinLength,
} from "../../description/brand/brandOverview.description";

const BrandOverviewContainer = ({ formPath, formData, validate, setError }) => {
  const [logoFile, setLogoFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const companyData = useSelector((state) => state.app?.company);
  const [previewLogo, setPreviewLogo] = useState(logo);
  const [previewBack, setPreviewBack] = useState(backImage);
  const [isError, setIsError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [descriptionMsg, setDescriptionMsg] = useState("");

  const { aboutCompany } = companyData;
  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state) => state.api?.loader?.[formPath?.parent],
  );

  useEffect(() => {
    getCompanyInfo();
  }, []);
  useEffect(() => {
    if (aboutCompany) {
      aboutCompany?.logoUrl &&
        setPreviewLogo(`${aboutCompany?.logoUrl}?date=${new Date()}`);
      aboutCompany?.backgroundCoverUrl &&
        setPreviewBack(
          `${aboutCompany?.backgroundCoverUrl}?date=${new Date()}`,
        );
      aboutCompany?.description && setDescriptionMsg(aboutCompany?.description);
    }
  }, [aboutCompany]);

  const handleLogoChange = (event) => {
    event.preventDefault();
    const logoUploaded = head(event.target.files);

    const fileExtension = logoUploaded?.name?.split(".").pop().toLowerCase();

    const allowedExtensions = ["png", "jpeg", "jpg"];
    if (!allowedExtensions.includes(fileExtension)) {
      showToast("Invalid file type. Please select a PNG, JPG, or JPEG file.");
      return;
    }
    if (logoUploaded.size > process.env.REACT_APP_MAX_FILE_SIZE * 1000000) {
      showToast(
        `File must be less than ${process.env.REACT_APP_MAX_FILE_SIZE}MB`,
      );
    } else {
      setLogoFile(logoUploaded);
      const reader = new FileReader();
      reader.onerror = () => {
        showToast("Error occurred while reading the file.");
      };
      reader.onabort = () => {
        showToast("File reading was aborted.");
      };

      setPreviewLogo(URL.createObjectURL(logoUploaded));
    }
  };

  const handleSetLogo = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.brandImage,
        method: method.put,
        data: { file: logoFile, type: "LOGO" },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      if (equal(response?.status, 200)) {
        saveStateFn("logoUrl", `${response?.data?.url}?date=${new Date()}`);
        setLogoFile(null);
        dispatch({
          type: SET_LOGO,
          payload: `${response?.data?.url}?date=${new Date()}`,
        });
      }
    } catch (error) {
      showToast(error);
    }
  };

  const handleBackChange = (event) => {
    event.preventDefault();
    const fileUploaded = head(event.target.files);

    const fileExtension = fileUploaded?.name?.split(".").pop().toLowerCase();

    const allowedExtensions = ["png", "jpeg", "jpg"];
    if (!allowedExtensions.includes(fileExtension)) {
      showToast("Invalid file type. Please select a PNG, JPG, or JPEG file.");
      return;
    }
    if (fileUploaded.size > process.env.REACT_APP_MAX_FILE_SIZE * 1000000) {
      showToast(
        `File must be less than ${process.env.REACT_APP_MAX_FILE_SIZE}MB`,
      );
    } else {
      setBackFile(fileUploaded);
      const reader = new FileReader();
      reader.onerror = () => {
        showToast("Error occurred while reading the file.");
      };
      reader.onabort = () => {
        showToast("File reading was aborted.");
      };

      setPreviewBack(URL.createObjectURL(fileUploaded));
    }
  };

  const handleBackCover = async () => {
    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.brandImage,
        method: method.put,
        data: { file: backFile, type: "BACKGROUND_COVER" },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      if (equal(response?.status, 200)) {
        setBackFile(null);
      }
      return response;
    } catch (error) {
      showToast(error);
    }
  };

  const getCompanyInfo = async () => {
    try {
      const aboutCompany = await performRequest({
        endPoint: apiEndPoints?.brandCompanyInfo,
        method: method.get,
        showToastMessage: false,
        needLoader: true,
        parent: formPath.parent,
      });
      dispatch({
        type: SET_COMPANY_DATA,
        payload: {
          aboutCompany: aboutCompany?.data,
        },
      });
    } catch (error) {
      showToast();
    }
  };

  const handleEditClick = () => {
    setShowForm(!showForm);
  };

  const validateResponse = (value) => {
    const isValid =
      length(value) >= descriptionMinLength &&
      length(value) <= descriptionMaxLength;
    setIsError(!isValid);
    return isValid;
  };

  const handleDescriptionChange = (event) => {
    const { value } = event?.target;
    validateResponse(value);
    setDescriptionMsg(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateResponse(descriptionMsg);
    if (!isValid) return;

    try {
      const response = await performRequest({
        endPoint: apiEndPoints?.brandCompanyInfo,
        method: method.put,
        data: { updateFields: { description: descriptionMsg } },
        showToastMessage: true,
        needLoader: true,
        parent: formPath.parent,
      });
      if (equal(response?.status, 200)) {
        setShowForm(false);
        dispatch({
          type: SET_COMPANY_DATA,
          payload: {
            aboutCompany: {
              ...aboutCompany,
              description: response?.data?.description,
            },
          },
        });
      }
    } catch (error) {
      showToast(error);
    }
  };

  return {
    previewLogo,
    logoFile,
    handleLogoChange,
    handleSetLogo,
    previewBack,
    backFile,
    handleBackChange,
    handleBackCover,
    getCompanyInfo,
    companyData,
    loadingStatus,
    handleEditClick,
    isError,
    showForm,
    descriptionMsg,
    handleDescriptionChange,
    handleSubmit,
  };
};

export default BrandOverviewContainer;
