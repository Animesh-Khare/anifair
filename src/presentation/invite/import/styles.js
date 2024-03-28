import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  typographyText: {
    color: "#000",
  },

  typoContainerBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    gap: "50px",
    paddingBottom: "5px",
  },

  fileContainerBox: {
    height: "500px",
    borderRadius: "3px",
    boxshadow: "0px 10px 25px 0px rgba(0, 0, 0, 0.07)",
    border: "1px solid #E6E6E6",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "50px",
  },

  typoBtn: {
    color: "#A1A1A4",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "19px",
  },

  footerBoxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingTop: "10px",
  },

  fileUploadLabel: {
    borderRadius: "5px",
    background: "#0E854E",
    color: "#FFF",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "600",
    textAlign: "center",
    padding: "10px 40px",
    cursor: "pointer",
  },

  pointerCursor: {
    cursor: "pointer",
  },
}));
