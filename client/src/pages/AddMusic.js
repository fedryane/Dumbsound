import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container, Alert } from "react-bootstrap";
import TagFile from "../assets/icon/file.png";
import Navbar from "../components/navbar/Navbar";

// importing API from config //
import { API } from "../config/api";

// importing usercontext //
import { UserContext } from "../context/userContext";

const AddMusic = () => {
  const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState(null);
  const [Artist, setArtist] = useState([]); //Save the selected artist id
  const [preview, setPreview] = useState(null); // For image preview
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    year: "",
    attache: "",
    artistId: "",
  });

  const { title, thumbnail, year, attache, artistId } = form;

  // fetching artist
  const artist = async () => {
    const response = await API.get("/artists");
    console.log(response);
    setArtist(response.data.artist);
  };

  // handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.id === "attache" ? e.target.files : e.target.value && e.target.id === "thumbnail" ? e.target.files : e.target.value,
    });
    if (e.target.id === "thumbnail") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      console.log(url);
    }
  };

  // handle submit data on form
  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "multipart/form-data",
        },
      };
      console.log(form);
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("year", form.year);
      formData.set("attache", form.attache[0], form.attache[0].name);
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("artistId", form.artistId);

      //fetching adding music to database
      const response = await API.post("/music", formData, config);
      console.log(response);
      setForm({
        title: "",
        year: "",
        thumbnail: "",
        attache: "",
        artistId: "",
      });
      if (response.data.status === "success") {
        const alert = <Alert>Succes adding some Music</Alert>;
        setMessage(alert);
      } else {
        const alert = <Alert>Failed adding some Music</Alert>;
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

  useEffect(() => {
    artist();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="pt-5">
        {message && message}
        <form className="mt-5 d-grid" onSubmit={(e) => handleSubmit.mutate(e)}>
          <h3 className="text-white mb-4">Add Music</h3>

          <div className="d-flex mb-3">
            <div className="input-group me-3 ">
              <input type="text" placeholder="Title" name="title" onChange={handleChange} className="form-control bg-dark text-white border-form" required />
            </div>

            <div>
              <input id="thumbnail" type="file" placeholder="Attach Thumbnail" name="thumbnail" accept="image/*" onChange={handleChange} required hidden />
              <label for="thumbnail" className="form-attach px-2 py-2 text-white">
                <span>Attach Thumbnail</span> <img alt="" src={TagFile} className="text-end" height={25} />
              </label>
            </div>
          </div>

          <div className="input-group mb-3">
            <input type="number" placeholder="Year" name="year" onChange={handleChange} className="form-control bg-dark text-white border-form" required />
          </div>

          <select onChange={handleChange} name="artistId" className="form-select bg-dark text-white mb-3">
            {Artist.map((item) => (
              <option key={item.id} value={item.id} name="type" className="text-secondary">
                {item.name}
              </option>
            ))}
          </select>

          <div className="input-group">
            <label for="attache" className="form-attach px-2 py-2 text-white">
              <span> Attach Music</span> <img alt="" src={TagFile} className="text-end" height={25} />
            </label>

            <input id="attache" type="file" placeholder="Attach Music" name="attache" onChange={handleChange} accept="audio/*" required hidden />
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
                Adding Music
              </button>
            </>
          )}
        </form>
      </Container>
    </>
  );
};

export default AddMusic;
