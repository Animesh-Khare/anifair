import { toast } from "react-toastify";

export const showToast = (
  message = "Something went wrong",
  messageType = "error",
) => {
  const toastMethod = toast[messageType] || toast.error;

  toastMethod(message, {
    className: "toasterMessage",
    style: {
      maxWidth: "600px",
      backgroundColor: "rgba(255, 255, 255)",
    },
  });
};
