import {
  SET_APP_DATA,
  SET_PAGE_LOADER,
  SET_COMPANY_DATA,
  ADD_QUESTION,
  SET_REPLY,
  SET_REPORT,
  SET_LOGO,
} from "../constants";

const initialState = {
  auth: {},
  pages: {},
  company: {},
};

const App = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_APP_DATA:
      return {
        ...state,
        auth: { ...state?.auth, ...payload },
      };
    case SET_COMPANY_DATA:
      return {
        ...state,
        company: { ...state?.company, ...payload },
      };
    case ADD_QUESTION:
      return {
        ...state,
        company: {
          ...state?.company,
          questions: {
            ...state?.company?.questions,
            question: [payload, ...state?.company?.questions?.question],
            totalCount: state?.company?.questions?.totalCount + 1,
          },
        },
      };
    case SET_REPLY:
      const newData = [...state?.company?.detailReviews?.data];
      const indexData = newData[payload.index];
      newData[payload.index] = { ...indexData, response: payload.info };
      return {
        ...state,
        company: {
          ...state?.company,
          detailReviews: {
            ...state?.company?.detailReviews,
            data: newData,
          },
        },
      };
    case SET_LOGO:
      return {
        ...state,
        auth: {
          ...state?.auth,
          loginData: {
            ...state?.auth?.loginData,
            logoUrl: payload,
          },
        },
      };
    case SET_REPORT:
      const newReport = [...state?.company?.reviews?.data];
      const indexReport = newReport[payload.index];
      newReport[payload.index] = { ...indexReport, isReported: payload.info };
      return {
        ...state,
        company: {
          ...state?.company,
          reviews: {
            ...state?.company?.reviews,
            data: newReport,
          },
        },
      };
    case SET_PAGE_LOADER:
      return {
        ...state,
        pages: { ...state?.pages, ...payload },
      };
    default:
      return state;
  }
};

export default App;
