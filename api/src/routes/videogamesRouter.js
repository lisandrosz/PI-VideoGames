const express = require("express");
const router = express.Router();
const {
  crearJuego,
  cargarJuegos,
  buscarJuegoQuery,
  buscarPorID,
} = require("../controllers/controllers");
require("dotenv").config();

// GET /videogames

router.get("/", async (req, res) => {
  let { name } = req.query;
  let resultados;
  try {
    // Me pregunto si viene algo como query
    if (name) {
      resultados = await buscarJuegoQuery(name);
      if (resultados.length < 1) throw new Error("Juego no encontrado");
    } else {
      resultados = await cargarJuegos();
    }
    res.status(200).json(resultados);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET /videogame/{idVideogame}

router.get("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;
    let response = await buscarPorID(idVideogame);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error.message);
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
