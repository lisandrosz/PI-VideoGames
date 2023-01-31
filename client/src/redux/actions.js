import axios from "axios";
import store from "./store";
export const TRAER_JUEGOS = "TRAER_JUEGOS";
export const BUSCAR_JUEGOS = "BUSCAR_JUEGOS";
export const TRAER_GENEROS = "TRAER_GENEROS";
export const FILTRADO_GENERO = "FILTRADO_GENERO";
export const FILTRADO_ORIGEN = "FILTRADO_ORIGEN";

export const traerJuegos = () => {
  return function (dispatch) {
    axios.get("http://localhost:3001/videogames").then((response) => {
      dispatch({ type: TRAER_JUEGOS, payload: response.data });
    });
  };
};

export const buscarJuegos = (name) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/videogames?name=${name}`)
      .then((response) => {
        dispatch({ type: BUSCAR_JUEGOS, payload: response.data });
      });
  };
};

export const traerGeneros = () => {
  return function (dispatch) {
    axios.get("http://localhost:3001/genres").then((response) => {
      dispatch({ type: TRAER_GENEROS, payload: response.data });
    });
  };
};

export const filtradoGenero = (id) => {
  return function (dispatch) {
    const estado = store.getState().allVideogames;
    let filtrado = [];

    if (Number(id) === 0) {
      dispatch({ type: FILTRADO_GENERO, payload: estado });
    } else {
      estado.forEach((game) => {
        game.genres.forEach((genre) => {
          if (genre.id === Number(id)) {
            filtrado.push(game);
          }
        });
      });
      dispatch({ type: FILTRADO_GENERO, payload: filtrado });
    }
  };
};

export const filtradoOrigen = (id) => {
  return function (dispatch) {
    // const filtroAplicado = store.getState().filtroAplicado;
    let estado;

    // if (filtroAplicado) {
    //   estado = store.getState().videogames;
    // } else {
    //   estado = store.getState().allVideogames;
    // }

    estado = store.getState().allVideogames;

    if (Number(id) === 1) {
      estado = estado.filter((game) => game.id.toString()[0] !== "0");
    } else if (Number(id) === 0) {
      estado = estado.filter((game) => game.id.toString()[0] === "0");
    }

    dispatch({ type: FILTRADO_ORIGEN, payload: estado });
  };
};
