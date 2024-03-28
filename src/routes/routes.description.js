import PublicRoute from "../presentation/auth/PublicRoute";
import ForgotPassword from "../presentation/forgotPassword";
import AuthLayout from "../presentation/layout/AuthLayout";
import Login from "../presentation/login";
import SignUp from "../presentation/signup";
import LoginFrame from ".././assets/svg/loginFrame.svg";
import SignupFrame from ".././assets/svg/signupFrame.svg";
import { login } from "../description/logIn.description";
import { signup } from "../description/signup.description";
import EmailVerification from "../presentation/verifyEmail";
import PasswordVerification from "../presentation/verifyPassword";
import SignUpPartial from "../presentation/signupPartial";
// import CompanyProfile from "../presentation/companyProfile";
import MainLayout from "../presentation/layout/MainLayout";
import ProtectedRoute from "../presentation/auth/ProtectedRoute";
import AppLayout from "../presentation/layout/AppLayout";
import Dashboard from "../presentation/dashboard";
import NotFound from "../presentation/NotFound";
import LandingPage from "../presentation/landing";
import CompanyReviewPage from "../presentation/review";
import OtpVerificationPage from "../presentation/otpVerification";
import ThanksPage from "../presentation/thanks";
import CheckEmail from "../presentation/checkEmail";
import { Navigate } from "react-router-dom";
import ReviewOverview from "../presentation/reviews/overview";
import ReviewResponse from "../presentation/reviews/response";
import ReviewQuestions from "../presentation/reviews/questions";
import Subscription from "../presentation/subscription";
import AccountSettings from "../presentation/account/accountSettings";
import NoSubscription from "../presentation/NoSubscription";
import Boost from "../presentation/boost";
import BrandOverview from "../presentation/brand/overview";
import BrandGoGreen from "../presentation/brand/goGreen";
import Widget from "../presentation/widget";
import BrandViewProfile from "../presentation/brand/viewProfile";
import BrandThankYou from "../presentation/brand/thankYou";
import WidgetImage from "../presentation/widget/WidgetImage";
import InviteInvitation from "../presentation/invite/invitation";
import InviteImport from "../presentation/invite/import";
import InviteSent from "../presentation/invite/sent";

const loginProps = {
  frame: LoginFrame,
  frameBtn: login,
  isPaddingTop: true,
  padding: true,
};

const signupProps = {
  frame: SignupFrame,
  frameBtn: signup,
  isPaddingTop: false,
};

const props = {
  frame: LoginFrame,
  isPaddingTop: true,
  padding: true,
};

const publicRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/:companyId",
        element: <AuthLayout {...props} sideFrame={false} />,
        children: [
          { index: true, element: <LandingPage /> },
          {
            path: "/:companyId/company-profile",
            element: <LandingPage />,
          },
        ],
      },
      {
        path: "/:companyId/company-review",
        element: <AuthLayout {...props} sideFrame={false} />,
        children: [
          {
            index: true,
            element: <CompanyReviewPage />,
          },
          {
            path: "/:companyId/company-review/verify-otp",
            element: <OtpVerificationPage />,
          },
        ],
      },
      {
        path: "/thanks",
        element: <AuthLayout {...props} sideFrame={false} />,
        children: [{ index: true, element: <ThanksPage /> }],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <AuthLayout {...loginProps} />,
            children: [{ index: true, element: <Login /> }],
          },
          {
            path: "/signup",
            element: <AuthLayout {...signupProps} />,
            children: [{ index: true, element: <SignUp /> }],
          },
          {
            path: "/check-email",
            element: <AuthLayout sideFrame={false} />,
            children: [{ index: true, element: <CheckEmail /> }],
          },
          {
            path: "/forgot-password",
            element: <AuthLayout {...props} />,
            children: [{ index: true, element: <ForgotPassword /> }],
          },
          {
            path: "/forgot-password/verify",
            element: <AuthLayout {...props} />,
            children: [{ index: true, element: <PasswordVerification /> }],
          },
          // {
          //   path: "/company-profile",
          //   element: <AuthLayout {...props} sideFrame={false} />,
          //   children: [{ index: true, element: <CompanyProfile /> }],
          // },
        ],
      },
      {
        path: "/verify",
        element: <EmailVerification />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const protectedRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/complete-profile",
            element: <AuthLayout {...props} sideFrame={false} />,
            children: [{ index: true, element: <SignUpPartial /> }],
          },
          {
            path: "/no-subscription",
            element: <AppLayout />,
            children: [{ index: true, element: <NoSubscription /> }],
          },
          {
            path: "/subscription",
            element: <AppLayout />,
            children: [{ index: true, element: <Subscription /> }],
          },
          // {
          //   path: "/payment",
          //   element: <AuthLayout {...props} sideFrame={false} />,
          //   children: [{ index: true, element: <SubscriptionPayment /> }],
          // },
          {
            path: "/dashboard",
            element: <AppLayout />,
            children: [{ index: true, element: <Dashboard /> }],
          },
          {
            path: "/reviews",
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to={"overview"} replace /> },
              { path: "/reviews/overview", element: <ReviewOverview /> },
              { path: "/reviews/response", element: <ReviewResponse /> },
              { path: "/reviews/questions", element: <ReviewQuestions /> },
            ],
          },
          {
            path: "/brand",
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to={"overview"} replace /> },
              { path: "/brand/overview", element: <BrandOverview /> },
              { path: "/brand/create-thanks", element: <BrandThankYou /> },
              { path: "/brand/go-green", element: <BrandGoGreen /> },
              { path: "/brand/view-profile", element: <BrandViewProfile /> },
            ],
          },
          {
            path: "/account",
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to={"overview"} replace /> },
              { path: "/account/overview", element: <h1>overview</h1> },
              { path: "/account/language", element: <h1>Language</h1> },
              {
                path: "/account/notifications",
                element: <h1>Notifications</h1>,
              },
              { path: "/account/settings", element: <AccountSettings /> },
            ],
          },
          {
            path: "/boost",
            element: <AppLayout {...props} sideFrame={false} />,
            children: [{ index: true, element: <Boost /> }],
          },
          {
            path: "/widget",
            element: <AppLayout {...props} sideFrame={false} />,
            children: [{ index: true, element: <Widget /> }],
          },
          {
            path: "/invite",
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to={"invitations"} replace /> },
              { path: "/invite/invitations", element: <InviteInvitation /> },
              {
                path: "/invite/import",
                element: <InviteImport />,
              },
              { path: "/invite/sent", element: <InviteSent /> },
              {
                path: "/invite/email-template",
                element: <h1>email-template</h1>,
              },
            ],
          },
          {
            path: "/widgetImage",
            element: <WidgetImage />,
          },
        ],
      },
    ],
  },
];

const routes = [...publicRoutes, ...protectedRoutes];

export default routes;
