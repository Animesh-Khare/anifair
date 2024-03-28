import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  chartBox: {
    height: 150,
    marginTop: 16,
    [theme.breakpoints.down(1660)]: {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      height: 144,
    },
  },
  formGroupOutside: {
    "& .MuiInputBase-root": {
      "& .MuiSelect-select": {
        backgroundColor: "#fff",
        minHeight: 0,
        padding: 12,
        "& .MuiStack-root": {
          "& .MuiTypography-root": {
            fontSize: 12,
          },
        },
      },
    },
  },
}));
