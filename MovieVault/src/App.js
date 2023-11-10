import axios from "axios";
import "./styles.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import MoviePage from "./pages/MoviePage";
import TopPage from "./pages/TopPage";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";
import UserPage from "./pages/UserPage";
import ComingSoon from "./pages/ComingSoon";

// Components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";

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
    <div className="App">
      <Router>
        <MediaQuery maxWidth={500}>
          <MobileNavigation
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            setUserData={setUserData}
            searchData={searchData}
            setSearchData={setSearchData}
          />
        </MediaQuery>

        <MediaQuery minWidth={501}>
          <Navigation
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            setUserData={setUserData}
            searchData={searchData}
            setSearchData={setSearchData}
          />
        </MediaQuery>

        <Routes>
          <Route
            path="/"
            element={<HomePage isLogged={isLogged} userData={userData} />}
          ></Route>

          <Route path="/register" element={<RegisterPage />}></Route>

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

          <Route
            path="/account-info"
            element={<AccountPage userData={userData} />}
          ></Route>

          <Route path="/movie/:id" element={<MoviePage />}></Route>

          <Route path="/error404" element={<ErrorPage />}></Route>

          <Route path="/user/:userName" element={<UserPage />}></Route>

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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
