import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import "./App.css";

// importing pages
import Home from "./pages/Home";
import AddMusic from "./pages/AddMusic";
import Transaction from "./pages/Transaction";
import AddArtist from "./pages/AddArtist";
import Upgrade from "./pages/Upgrade";
import AdminComplain from "./pages/AdminComplain";
import UserComplain from "./pages/UserComplain";

// Init token on axios every time the app is refreshed here ...
import { setAuthToken, API } from "../src/config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();

  // Init user context //
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/transaction");
      } else if (state.user.status === "customer") {
        navigate("/");
      }
    }
  }, [state]);

  // Create function for "check user token"
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/transaction" element={<Transaction />} />
      <Route exact path="/add-music" element={<AddMusic />} />
      <Route exact path="/add-artist" element={<AddArtist />} />
      <Route exact path="/upgrade" element={<Upgrade />} />
      <Route exact path="/complain" element={<AdminComplain />} />
      <Route exact path="/user-complain" element={<UserComplain />} />
      <Route exact path="/logout" element={<Home />} />
    </Routes>
  );
}

export default App;
