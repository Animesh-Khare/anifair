import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  inviteInvitation: {
    paddingRight: "4%",
  },

  stackcss: {
    paddingLeft: "12px",
  },

  textField: {
    "&.MuiTextField-root": {
      paddingBottom: "24px",
      width: "100%",
      "& .MuiInputBase-input": {
        padding: "8px 12px",
      },
    },
  },

  addBtn_container: {
    paddingLeft: "15px",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  addBtn: {
    "&.MuiButton-root": {
      padding: "10px 50px",
    },
  },

  invitationText: {
    color: "rgba(63, 63, 68, 0.60)",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: 400,
    lineHeight: "24px",
  },

  formGroupOutside: {
    "& .MuiInputBase-root": {
      "&:focus-visible": {
        outlineColor: theme.palette.primary.main,
      },
      "& MuiInputBase-input": {
        "&:focus-visible": {
          outlineColor: theme.palette.primary.main,
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        "&:focus-visible": {
          outlineColor: theme.palette.primary.main,
        },
      },
      "& .MuiSelect-select": {
        backgroundColor: "#fff",
        minHeight: 0,
        padding: 8,
        "& .MuiStack-root": {
          "& .MuiTypography-root": {
            fontSize: 12,
          },
        },
      },
    },
  },
}));
