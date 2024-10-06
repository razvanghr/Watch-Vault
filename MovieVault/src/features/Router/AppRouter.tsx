import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/components/Navigation";
import Home from "../Home/components/Home";

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
