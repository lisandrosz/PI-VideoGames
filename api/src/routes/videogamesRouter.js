const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

/////////////////////////////////////////////////// FUTUROS CONTROLLERS
const traerJuegos = async (url) => {
  let data;
  await axios
    .get(url)
    .then((res) => (data = res.data))
    .catch((error) => error);
  return data;
};

// GET /videogames

router.get("/", async (req, res) => {
  let resultados = [];
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
  try {
    // Traigo los juegos y los cargo en el array

    while (resultados.length < 100) {
      let data = await traerJuegos(url);
      data.results.map((games) => resultados.push(games));
      url = data.next;
    }

    resultados = resultados.map((game) => {
      return {
        name: game.name,
        image: game.background_image,
        genres: game.genres,
      };
    });

    res.status(200).json(resultados);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
