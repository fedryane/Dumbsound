import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import Profile from "../../assets/Ellipse 1.png";
import Upgrade from "../../assets/icon/bill.png";
import Logoutlogo from "../../assets/icon/logout.png";
import Logo from "../../assets/logo.png";
import Addmusic from "../../assets/icon/music.png";
import TransactionLogo from "../../assets/pay.svg";
import Addartist from "../../assets/icon/people.png";
import { Link, useNavigate } from "react-router-dom";
import LogoComplain from "../../assets/icon/file.png";
import Login from "../modal/Login";
import { UserContext } from "../../context/userContext";
import Register from "../modal/Register";
import Avatar from "react-avatar";
import "./NavbarAdmin.css";

function Navbar() {
  let navigate = useNavigate();

  // user context
  const [state, dispatch] = useContext(UserContext);

  // Modal state //
  const [showLogin, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Handle Modal //
  const handleLogin = () => setShow(!showLogin);
  const handleRegister = () => setShowRegister(!showRegister);

  // Condition of user //
  const [isLoginn, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // user effect logins //
  useEffect(() => {
    if (state.isLogin === true) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  // admin effect logins //
  useEffect(() => {
    if (state.user.status === "admin") {
      setIsAdmin(true);
    }
  });

  // handling logout //
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/logout");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        {isLoginn ? (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isAdmin ? (
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Avatar name="Admin" color="blue" size="40" round={true} />
                  </a>
                  <ul class="dropdown-menu px-1 bg-dark" aria-labelledby="navbarDropdown">
                    <li className="d-flex align-items-center justify-content-center">
                      <img src={TransactionLogo} alt="" style={{ width: "65px" }} />
                      <Link to="/transaction" className="dropdown-item text-white bg-dark">
                        Transaction
                      </Link>
                    </li>
                    <li className="d-flex align-items-center justify-content-center ms-1 mt-3">
                      <img src={LogoComplain} alt="" style={{ width: "25px" }} />
                      <Link to="/complain" className="dropdown-item text-white bg-dark">
                        Complains
                      </Link>
                    </li>
                    <li className="d-flex align-items-center justify-content-center mt-3">
                      <img src={Addmusic} alt="" style={{ width: "40px" }} />
                      <Link to="/add-music" className="dropdown-item text-white bg-dark">
                        Add Music
                      </Link>
                    </li>
                    <li className="d-flex align-items-center justify-content-center my-3">
                      <img src={Addartist} alt="" style={{ width: "40px" }} />
                      <Link to="/add-artist" className="dropdown-item text-white bg-dark">
                        Add Artist
                      </Link>
                    </li>
                    <li className="d-flex align-items-center justify-content-center">
                      <img src={Logoutlogo} alt="" style={{ width: "40px" }} />
                      <a class="dropdown-item text-white bg-dark" href="#" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Avatar name="Fedryan" color="orangered" size="40" round={true} />
                  </a>
                  <ul className="dropdown-menu px-2 bg-dark" aria-labelledby="navbarDropdown">
                    <li className="d-flex align-items-center justify-content-center">
                      <img src={Upgrade} alt="" style={{ width: "40px" }} />
                      <Link to="/upgrade" className="dropdown-item text-white bg-dark">
                        Upgrade
                      </Link>
                    </li>

                    <li className="d-flex align-items-center justify-content-center ms-1 mt-3">
                      <img src={LogoComplain} alt="" style={{ width: "25px" }} />
                      <Link to="/user-complain" className="dropdown-item text-white bg-dark">
                        Complain
                      </Link>
                    </li>

                    <li className="d-flex align-items-center justify-content-center mt-3">
                      <img src={Logoutlogo} alt="" style={{ width: "40px" }} />
                      <a className="dropdown-item text-white bg-dark" href="#" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <button className="btn-style btn btn-outline-light me-2 px-5" type="button" onClick={handleLogin}>
                        Login
                      </button>
                    </li>
                    <li class="nav-item ms-3">
                      <button class="btn-style-register btn btn-danger me-2 " type="button" onClick={handleRegister}>
                        Register
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {showLogin ? <Login isOpen={showLogin} /> : null}
            {showRegister ? <Register isOpen={showRegister} /> : null}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
