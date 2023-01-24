const express = require("express");
const router = express.Router();
const axios = require("axios");
const { crearJuego, cargarJuegos } = require("../controllers/controllers");
require("dotenv").config();
const { API_KEY } = process.env;

// GET /videogames

router.get("/", async (req, res) => {
  try {
    let resultados = await cargarJuegos();
    res.status(200).json(resultados);
  } catch (error) {
    console.log(error);
  }
});

// POST /videogames

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      releaseDate,
      rating,
      genres,
      plataforms,
      background_image,
    } = req.body;

    let juegoCreado = await crearJuego(
      name,
      description,
      releaseDate,
      rating,
      genres,
      plataforms,
      background_image
    );

    res.status(200).json(juegoCreado);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
