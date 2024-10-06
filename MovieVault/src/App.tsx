import axios from "axios";
import "./styles.scss";

import { useEffect, useState } from "react";

// Pages

// Components
import React from "react";
import Navigation from "./features/Navigation/components/Navigation";
import AppRouter from "./features/Router/AppRouter";
import { theme } from "./watch-components/theme/theme";
import { ThemeProvider } from "@mui/material";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [searchData, setSearchData] = useState(null);

  const sendReauthenticate = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "https://watchvaultapi.netlify.app/.netlify/functions/api/user/reauthenticate",
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      });

      setIsLogged(true);
      setUserData(res.data);
    } catch (error) {
      setUserData({});
      setIsLogged(false);
      console.log(error);
    }
  };

  useEffect(() => {
    sendReauthenticate();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;

{
  /* <Routes>
          <Route
            path="/"
            element={<HomePage isLogged={isLogged} userData={userData} />}
          ></Route>

          <Route path="/register" element={<RegisterPage />}></Route>

          <Route path="/*" element={<ErrorPage />} />

          <Route path="/forgot-password" element={<ResetEmail />}></Route>

          <Route
            path="/login"
            element={
              <LoginPage
                isLogged={isLogged}
                setIsLogged={setIsLogged}
                setUserData={setUserData}
              />
            }
          ></Route>

          <Route path="/reset-password" element={<ResetPasswordPage />}></Route>

          <Route
            path="/account-info"
            element={<AccountPage userData={userData} />}
          ></Route>

          <Route path="/movie/:id" element={<MoviePage />}></Route>

          <Route path="/error404" element={<ErrorPage />}></Route>

          <Route path="/user/:userName" element={<UserPage />}></Route>

          <Route
            path="/email-verification"
            element={<EmailVerificationPage />}
          ></Route>

          <Route
            path="/search"
            element={<SearchPage searchData={searchData} />}
          ></Route>
          <Route
            path="/top-250"
            element={<TopPage userData={userData} />}
          ></Route>
          <Route path="/phone-app" element={<ComingSoon />}></Route>
          <Route path="/desktop-app" element={<ComingSoon />}></Route>
        </Routes>
        <Footer /> */
}
