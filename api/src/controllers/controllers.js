const axios = require("axios");
const { response } = require("express");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;
const { Gender, Videogame } = require("../db");

const cargarJuegos = async () => {
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
  let respuesta;
  let juegosAPI;

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

  while (respuesta.length < 100) {
    await axios
      .get(url)
      .then((res) => {
        res.data.results.map((games) => respuesta.push(games));
        url = res.data.next;
      })
      .catch((error) => (respuesta = error.message));
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

const buscarJuegoQuery = async (name) => {
  let respuesta;

  // Primero busco dentro de mi DB si existe el juego buscado
  respuesta = await Videogame.findAll({
    where: {
      name: {
        // Uso iLike porque no es case sensitive
        [Op.iLike]: "%" + name + "%",
      },
    },
  });

  // Ahora busco en la API si existen juegos con ese nombre
  let busquedaAPI;
  await axios
    .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    .then((response) => (busquedaAPI = response.data.results));

  // Mapeo para solo enviar solo los 15 que me pide la ruta
  busquedaAPI.map((game) => {
    if (respuesta.length < 15) {
      respuesta.push(game);
    }
  });

  return respuesta;
};

const buscarPorID = async (id) => {
  let detalleJuego;
  // Me pregunto si el id empieza con "0"
  if (id[0] === "0") {
    // Busco en mi db
    id = Number(id);
    detalleJuego = await Videogame.findByPk(id, {
      include: {
        model: Gender,
        through: {
          attributes: [],
        },
      },
    }).catch((error) => (detalleJuego = error.message));
  } else {
    // Busco en la API
    id = Number(id);
    detalleJuego = await axios
      .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then((response) => {
        return (detalleJuego = {
          name: response.data.name,
          image: response.data.background_image,
          description: response.data.description,
          released: response.data.released,
          rating: response.data.rating,
          platforms: response.data.platforms,
          genres: response.data.genres,
        });
      })
      .catch((error) => (detalleJuego = error.message));
  }

  return detalleJuego;
};

module.exports = {
  cargaDB,
  consultaDB,
  crearJuego,
  cargarJuegos,
  buscarJuegoQuery,
  buscarPorID,
};
