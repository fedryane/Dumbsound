import React, { useContext, useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

function Login(props) {
  let navigate = useNavigate();

  // modal login
  const [show, setShow] = useState(props.isOpen);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // loading login
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // function of getting data from database
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // define variable state
  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // function for handle insert data to databases (useMutation)
  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/login", body, config);
      console.log(response);

      navigate("/");
      setShow(false);
      setLoadingSubmit(false);

      // condition checking login
      if (response?.status === 201) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }

      // if (response.data.data.status === "admin") {
      //   navigate("/transaction");
      // } else {
      //   navigate("/");
      // }

      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} className="rounded">
        <Modal.Body className="bg-dark">
          <h2 className="ms-2 mb-5 text-white">Login</h2>
          <div className="card-auth px-4">
            {message}
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div class="mb-3 form">
                <input type="email" placeholder="Email" name="email" onChange={handleChange} value={email} required />
              </div>
              <div class="mb-3 form">
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password} required />
              </div>
              <div className="d-grid mt-4">
                {!loadingSubmit ? (
                  <>
                    <button className="btn-style">Login</button>
                  </>
                ) : (
                  <>
                    <button className="btn-red blink" disabled>
                      Loging in
                    </button>
                  </>
                )}
              </div>
            </form>
            <div className="d-flex justify-content-center mt-3">
              <p>
                Already have an account ? Klik <span className="fw-bold">Here</span>{" "}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*  */}
    </>
  );
}

export default Login;
