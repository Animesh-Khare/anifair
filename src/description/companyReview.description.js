import { email, mobile, notEmptyOrNull } from "../utils/constant";

export const totalRating = "totalRating";

export const greenRating = "greenRating";

export const setTotalRating = "setTotalRating";

export const setGreenRating = "setGreenRating";

export const extraRecommendations = "extraRecommendations";

export const extraQuestions = "extraQuestions";

export const voteForThis = "voteForThis";

export const unVoteForThis = "unVoteForThis";

export const aboutCompany = "aboutCompany";

export const placeReview = "placeReview";

export const noQuestionFound = "noQuestionFound";

export const attribute = [
  {
    name: "overallScore",
    isRequired: true,
    pattern: notEmptyOrNull,
    error: ["fieldRequired"],
  },
  {
    name: "greenScore",
    isRequired: true,
    pattern: notEmptyOrNull,
    error: ["fieldRequired"],
  },
  {
    name: "firstName",
    pointNumber: "firstName",
    type: "text",
    variant: "outlined",
    isRequired: true,
    pattern: notEmptyOrNull,
    error: ["fieldRequired"],
    gridXs: 12,
    showStar: true,
  },
  {
    name: "lastName",
    pointNumber: "lastName",
    type: "text",
    variant: "outlined",
    isRequired: true,
    pattern: notEmptyOrNull,
    error: ["fieldRequired"],
    gridXs: 12,
    showStar: true,
  },
  {
    name: "email",
    pointNumber: "email",
    type: "email",
    variant: "outlined",
    isRequired: true,
    pattern: email,
    error: ["emailRequired", "invalidEmail"],
    gridXs: 12,
    showStar: true,
  },
  {
    name: "phoneNumber",
    pointNumber: "mobileNumber",
    type: "phone",
    isRequired: true,
    pattern: mobile,
    error: ["mobileNumRequired", "invalidMobileNumber"],
    showStar: true,
  },
  {
    name: "city",
    pointNumber: "city",
    type: "autoComplete",
    isRequired: true,
    pattern: notEmptyOrNull,
    placeholder: "city",
    options: [],
    error: ["cityRequired"],
    gridXs: 12,
    showStar: true,
  },
];

export const defaultValues = {
  firstName: "",
  phoneNumber: "",
  overallScore: 0,
  greenScore: 0,
  city: "",
  email: "",
};

export const formPath = {
  parent: "company_review",
  child: "company_recommendation",
  childObject: "extra_questions",
  anotherChildObject: "company_basic_info",
};
