import { combineReducers } from "redux";
import { LOGOUT } from "../constants";
import { equal } from "../../utils/javascript";
import App from "./app.reducer";
import Api from "./api.reducer";
import Form from "./form.reducer";

const rootReducer = combineReducers({
  app: App,
  api: Api,
  form: Form,
});

const appReducer = (state, action) => {
  if (equal(action.type, LOGOUT)) {
    state = undefined;
  }

  return rootReducer(state, action);
};

export default appReducer;
