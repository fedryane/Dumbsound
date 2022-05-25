const express = require("express");

// ------------- init express routes--------------------//
const router = express.Router();

// ---------------------------------------------------------------- import constollers ---------------------------------------------------------------- //
const { addUsers, deleteUser, updateUser, getUser, getUsers } = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const { register, login, checkAuth } = require("../controllers/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const { getAllMusic, getMusic, updateMusic, deleteMusic, addMusic } = require("../controllers/music");
const { getArtists, getArtist, updateArtist, deleteArtist, addArtist } = require("../controllers/artist");
const { addTransaction, getTransactions, getTransaction, notification, deleteTransaction } = require("../controllers/transaction");

// ---------------------------------------------------------------- router controllers user ----------------------------------------------------------------//

router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

//---------------------------------------------------------------- router controllers music ----------------------------------------------------------------//

router.post("/music", auth, uploadFile(), addMusic);
router.get("/musics", auth, getAllMusic);
router.get("/music/:id", auth, getMusic);
router.patch("/music/:id", auth, uploadFile(), updateMusic);
router.delete("/music/:id", auth, deleteMusic);

// -------------------------------------------------------------- router controllers artist -------------------------------------------------------------//

router.post("/artist", auth, addArtist);
router.get("/artists", auth, getArtists);
router.get("/artist/:id", auth, getArtist);
router.patch("/artist/:id", auth, updateArtist);
router.delete("/artist/:id", auth, deleteArtist);

// -------------------------------------------------------------- router controllers transactions -------------------------------------------------------------//
router.get("/transactions", auth, getTransactions);
router.post("/transaction", auth, addTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);
router.post("/notification", notification);
// -------------------------------------------------------------- router controllers auth ------------------------------------------------------- //
router.post("/register", register);
router.post("/login", login);

//----------------------------------------------------------------- routes check-auth -----------------------------------------------------------//
router.get("/check-auth", auth, checkAuth);

// --------------------------------------------------------------- exports module router ------------------------------------------------------ //
module.exports = router;
