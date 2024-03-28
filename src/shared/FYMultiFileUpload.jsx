import React from "react";
import FYBox from "./FYBox";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  fileUpload: {
    borderRadius: "5px",
    background: theme.palette.primary.main,
    // color: theme.palette.white.main,
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "600",
    textAlign: "center",
    padding: "10px 40px",
    cursor: "pointer",
  },
}));

const FYMultiFileUpload = ({ getDatachange, label }) => {
  const classes = useStyles();

  //multiple file upload functions
  const handleChangeImage = async (e) => {
    var files = e.target.files;
    let convertfiles = [];

    let postFile = [];

    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);
      let FileName = file.name;
      let imageConvertValue = await convertBase64(file);
      let Image = imageConvertValue.split(",")[1];
      convertfiles.push({ FileName, Image });

      postFile.push({
        document: imageConvertValue.split("base64,")[1],
        documentName: FileName,
      });
    }
    getDatachange(postFile);
    e.target.value = "";
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div>
      <input
        hidden
        id="f02"
        type="file"
        placeholder="Upload File"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={(e) => handleChangeImage(e)}
        multiple
      />
      <label htmlFor="f02">
        <FYBox className={classes.fileUpload}>{label}</FYBox>
      </label>
    </div>
  );
};

export default FYMultiFileUpload;
