import React, { useState, useContext } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function Register(props) {
  const title = "Register";
  document.title = "DumbSound | " + title;
  const [show, setShow] = useState(props.isOpen);

  // handle register modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   const [state, dispatch] = useContext(UserContext); // useContext
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: "",
  });

  // define state variable
  const { email, password, fullname, gender, phone, address } = form;

  // handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Json format data
      const body = JSON.stringify(form);
      console.log(body);
      // Insert data user to database
      const response = await API.post("/register", body, config);

      console.log(response);

      // condition register success
      if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="bg-dark">
          <h2 className="mb-4 text-white">Register</h2>
          <div className="card-auth px-3">
            {message}
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div class="mb-3 mt-5 form">
                <input type="email" placeholder="Email" name="email" onChange={handleChange} value={email} required />
              </div>
              <div class="mb-3 form">
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Full Name" name="fullname" onChange={handleChange} value={fullname} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Gender" name="gender" onChange={handleChange} value={gender} required />
              </div>
              <div class="mb-3 form">
                <input type="number" placeholder="Phone" name="phone" onChange={handleChange} value={phone} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Address" name="address" onChange={handleChange} value={address} required />
              </div>
              <div className="d-grid">
                {!loadingSubmit ? (
                  <>
                    <button className="btn-style mt-3">Register</button>
                  </>
                ) : (
                  <>
                    <button className="btn-red blink" disabled>
                      Wait...
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

export default Register;
