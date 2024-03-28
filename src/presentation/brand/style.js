import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    "& .MuiButton-contained": {
      padding: [["auto"]],
      margin: [[0, 20]],
    },
    "& .MuiGrid-item": {
      margin: [[10, 0]],
    },
  },
  description: {
    border: "1px solid #3546AB4D",
    padding: [[20]],
    width: "90%",
    margin: [[10, 0, 0, 0]],
    borderRadius: 10,
    color: "#3F3F4499",
    height: "maxContent",
  },
  profilePhoto: {
    maxHeight: 150,
    maxWidth: 500,
    display: "flex",
    margin: [[20, 0]],
  },
  recommendationTable: {
    maxWidth: "60%",
    border: "1px solid #3546AB4D",
    borderRadius: 10,
    "& .MuiTableContainer-root": {
      padding: [[20]],
    },
    "& .MuiTableCell-root ": {
      borderBottom: 0,
      padding: [[8]],
    },
    "& h6": {
      padding: [[20, 0, 0, 20]],
    },
    "& .MuiFormControl-root ": {
      padding: [[0]],
    },
  },
  templateInformation: {
    "& .MuiPaper-root": {
      border: "2px solid #3546AB4D",
      borderRadius: 10,
    },
    "& hr": {
      border: "1px solid #3546AB4D",
    },
    "& h5": {
      fontSize: 16,
      fontWeight: 700,
    },
    "& p": {
      color: "#3F3F4499",
    },
  },
}));
