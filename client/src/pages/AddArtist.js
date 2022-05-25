import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container, Alert } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import { API } from "../config/api";

const AddArtist = () => {
  const navigate = useNavigate();
  const title = "Add Artis";
  document.title = "Dumbsound | " + title;

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    old: "",
    type: "",
    startCareer: "",
  });

  const { name, old, type, startCareer } = form;

  // Handle change data on form
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
      setLoadingSubmit(false);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      // getting API add artist
      const response = await API.post("/artist", body, config);
      console.log(response);
      setForm({
        name: "",
        old: "",
        type: "",
        startCareer: "",
      });
      if (response.data.status === "success") {
        const alert = <Alert>Succes adding Artist</Alert>;
        setMessage(alert);
      } else {
        const alert = <Alert>Failed adding Artist</Alert>;
        setMessage(alert);
      }
      setLoadingSubmit(false);
    } catch (error) {
      console.log(error);
      const alert = <Alert>Gagal</Alert>;
      setMessage(alert);
      setLoadingSubmit(false);
    }
  });

  return (
    <>
      <Navbar title={title} />
      <Container className="pt-5">
        {message && message}
        <form className="mt-5 d-grid" onSubmit={(e) => handleSubmit.mutate(e)}>
          <h3 className="text-start mb-4 text-white">Add Artist</h3>

          <div className="input-group mb-3">
            <input type="text" placeholder="Name" value={name} name="name" onChange={handleChange} className="form-control bg-dark text-white border-form" required />
          </div>

          <div className="input-group mb-3">
            <input type="number" placeholder="Old" name="old" value={old} onChange={handleChange} className="form-control bg-dark text-white border-form" required />
          </div>

          <select type="text" name="type" value={type} onChange={handleChange} className="form-select mb-3 bg-dark text-white border-form">
            <option name="type">Solo</option>
            <option name="type">Band</option>
          </select>

          <div className="input-group mb-3">
            <input type="text" placeholder="Start a Career" name="startCareer" value={startCareer} onChange={handleChange} className="form-control bg-dark text-white border-form" required />
          </div>

          {!loadingSubmit ? (
            <>
              <button type="submit" className="btn-danger text-white fw-bold container my-3 py-1">
                Save
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="btn-orange blink text-white fw-bold container my-3" disable>
                Process....
              </button>
            </>
          )}
        </form>
      </Container>
    </>
  );
};

export default AddArtist;
