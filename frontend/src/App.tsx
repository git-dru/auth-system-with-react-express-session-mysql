import { Fragment } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
