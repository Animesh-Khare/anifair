export const locationPath = {
  homePage: "/",
  login: "/login",
  signup: "/signup",
  checkEmail: "/check-email",
  forgotPassword: "/forgot-password",
  signupPartial: "/complete-profile",
  verifyOTP: "/verify-otp",
  thanks: "/thanks",
  dashboard: "/dashboard",
  companyReview: "/company-review",
  reviews: "/reviews",
  overview: "/overview",
  response: "/response",
  questions: "/questions",
  language: "/language",
  notifications: "/notifications",
  settings: "/settings",
  noSubscriptionPath: "/no-subscription",
  subscriptionOffer: "/subscription",
  boost: "/boost",
  invitations: "/invitations",
  import: "/import",
  sent: "/sent",
  emailTemplate: "/email-template",
  inviteInvitation: "/invite-invitation",
};

export const apiEndPoints = {
  login: "auth/sign-in",
  signup: "auth/sign-up",
  forgotPassword: "auth/forgot-password",
  verifyEmail: "auth/verify",
  verifyPassword: "auth/forgot-password/verify",
  signupPartial: "auth/sign-up-partial",
  report: "company/report",
  addReview: "company/add-review",
  verifyOTP: "auth/verify-otp",
  resendOTP: "auth/resend-otp",
  cities: "auth/all-city",
  country: "auth/country",
  state: "auth/state",
  city: "auth/city",
  workBranches: "auth/work-goal",
  reviewSummery: "dashboard/review-summery",
  reviews: "dashboard/reviews",
  avrgRatings: "dashboard/average-rating",
  visitors: "dashboard/visitor",
  reviewsDetails: "review/reviews",
  reviewReport: "dashboard/report",
  reviewResponse: "review/response",
  reviewQuestions: "review/question",
  subscriptionPriceList: "payment",
  subscription: "payment/subscription",
  accountProfile: "account/account-profile",
  inviteInvitation: "invitation",
  remainingInvitations: "invitation/",
  postExcel: "invitation/upload-excel",
  downloadSample: "invitation/?fileUrl=true",
  brandImage: "brand/image",
  brandCompanyInfo: "brand/company-info",
  brandRecommendation: "brand/recommendation",
  profilePageLink: "brand/profile-page-link",
  template: "brand/template",
  thankYouMessage: "brand/thank-you-message",
  widget: "widget",
  inviteSentTable: "invitation/past-statistics",
};

export const method = {
  post: "post",
  get: "get",
  delete: "delete",
  put: "put",
  patch: "patch",
};

export const zipCode = "zipCode";

export const password = "password";

export const email = "email";

export const confirmPasswordConst = "confirmPassword";

export const number = "number";

export const notEmptyOrNull = "notEmptyOrNull";

export const url = "url";

export const alphabetOnly = "alphabetOnly";

export const mobile = "mobile";

export const intensions = "intensions";

export const frameDesc =
  "Let’s work towards a more sustainable future for the next generation!";

export const scoreMap = {
  0.5: 1,
  1: 2,
  1.5: 3,
  2: 4,
  2.5: 5,
  3: 6,
  3.5: 7,
  4: 8,
  4.5: 9,
  5: 10,
};

export const fairYellowRulesTitle = "Fairyellow rules";

export const fairYellowRules = ["FYRule1", "FYRule2", "FYRule3"];

export const countries = [
  { label: "English", value: "en", icon: "🇺🇸" },
  { label: "Dutch", value: "nl", icon: "🇳🇱" },
];
