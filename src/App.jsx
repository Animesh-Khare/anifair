/* eslint-disable react-hooks/exhaustive-deps */
import { ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./themes/theme";
import AllRoutes from "./routes";
import { clearStateFn, loadStateFn } from "./utils/localStorage";
import { useDispatch } from "react-redux";
import { SET_APP_DATA } from "./redux/constants";
import { useLayoutEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const access_token = loadStateFn();
  useLayoutEffect(() => {
    if (!access_token) {
      clearStateFn();
    } else {
      const data = {
        loginData: {
          companyName: loadStateFn("companyName"),
          workGoal: loadStateFn("workGoal"),
          accountType: loadStateFn("accountType"),
          redirectSignupPartial: JSON.parse(
            loadStateFn("redirectSignupPartial"),
          ),
          logoUrl: loadStateFn("logoUrl"),
        },
      };
      dispatch({
        type: SET_APP_DATA,
        payload: data,
      });
    }
  }, [access_token]);
  return (
    <ThemeProvider theme={theme}>
      <AllRoutes />
    </ThemeProvider>
  );
};
export default App;
