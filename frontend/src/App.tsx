import { Fragment, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import SessionHandler from "./components/SessionHandler";
import Home from "./pages/home";

const PrivateRoute = () => {
  const email = useAppSelector((state: RootState) => state.user.email);
  return email ? <Home /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/todo" element={<PrivateRoute />} /> */}
          <Route path="/home" element={<PrivateRoute />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <SessionHandler />
      </Fragment>
    </Router>
  );
}

export default App;
