import { formPath } from "../../description/emailVerify.description";
import EmailVerifyContainer from "../../container/emailVerify.container";
import FYLoader from "../../shared/FYLoader";

const EmailVerification = () => {
  const { loadingStatus } = EmailVerifyContainer({ formPath });
  if (loadingStatus) {
    return <FYLoader variant="fullPage" />;
  }
};

export default EmailVerification;
