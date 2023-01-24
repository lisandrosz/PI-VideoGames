const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Gender, Videogame } = require("../db");

const cargarJuegos = async () => {
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
  let respuesta;

  // Primero traigo los juegos cargados en mi DB
  respuesta = await Videogame.findAll({
    attributes: ["name", "background_image"],
    include: {
      model: Gender,
      through: {
        attributes: [],
      },
    },
  });

  // Ahora traigo los juegos desde la API

  let juegosAPI;
  await axios
    .get(url)
    .then((res) => (juegosAPI = res.data))
    .catch((error) => (respuesta = error.message));

  while (respuesta.length < 100) {
    juegosAPI.results.map((games) => respuesta.push(games));
    url = respuesta.next;
  }

  respuesta = respuesta.map((game) => {
    return {
      name: game.name,
      image: game.background_image,
      genres: game.genres,
      genders: game.genders,
    };
  });

  return respuesta;
};

const cargaDB = async () => {
  let genres;
  let respuesta;

  await axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((response) => (genres = response.data.results))
    .catch((error) => (respuesta = error.message));

  genres = genres.map((genre) => {
    return {
      id: genre.id,
      name: genre.name,
    };
  });

  Gender.bulkCreate(genres).then(() =>
    console.log("Generos agregados a la Base de datos")
  );

  respuesta = genres;

  return respuesta;
};

const consultaDB = async () => {
  const respuesta = await Gender.findAll();
  console.log("Consultado desde la DB");

  return respuesta;
};

const crearJuego = async (
  name,
  description,
  releaseDate,
  rating,
  genres,
  plataforms,
  background_image
) => {
  let juegoCreado = await Videogame.create({
    name,
    description,
    releaseDate,
    rating,
    plataforms,
    background_image,
  });

  genres = JSON.parse(genres);
  genres.map(async (id) => {
    await juegoCreado.addGenders(id);
  });

  return juegoCreado;
};

module.exports = {
  cargaDB,
  consultaDB,
  crearJuego,
  cargarJuegos,
};
