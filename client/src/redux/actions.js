import axios from "axios";
import store from "./store";
export const TRAER_JUEGOS = "TRAER_JUEGOS";
export const BUSCAR_JUEGOS = "BUSCAR_JUEGOS";
export const TRAER_GENEROS = "TRAER_GENEROS";
export const CHANGE_GENERO = "CHANGE_GENERO";
export const CHANGE_ORIGEN = "CHANGE_ORIGEN";
export const FILTRADO = "FILTRADO";
// export const FILTRADO_GENERO = "FILTRADO_GENERO";
// export const FILTRADO_ORIGEN = "FILTRADO_ORIGEN";

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

export const changeGenero = (id) => {
  return function (dispatch) {
    dispatch({ type: CHANGE_GENERO, payload: id });
  };
};

export const changeOrigen = (id) => {
  return function (dispatch) {
    dispatch({ type: CHANGE_ORIGEN, payload: id });
  };
};

export const filtrado = () => {
  return function (dispatch) {
    let estado = store.getState().allVideogames;
    let genero = store.getState().filtroGenero;
    let origen = store.getState().filtroOrigen;
    let filtrado = [];

    // Aca hago el filtrado por el genero del juego
    if (Number(genero) === 0) {
      filtrado = estado;
    } else {
      estado.forEach((game) => {
        game.genres.forEach((genre) => {
          if (genre.id === Number(id)) {
            filtrado.push(game);
          }
        });
      });
    }

    // Ahora realizo el filtrado por el origen (existente o creado)
    if (origen === "todos") {
      dispatch({ type: FILTRADO, payload: filtrado });
    } else if (Number(origen) === 1) {
      filtrado = filtrado.filter((game) => game.id.toString()[0] !== "0");
      dispatch({ type: FILTRADO, payload: filtrado });
    } else {
      filtrado = filtrado.filter((game) => game.id.toString()[0] === "0");
      dispatch({ type: FILTRADO, payload: filtrado });
    }
  };
};

// export const filtradoGenero = (id) => {
//   return function (dispatch) {
//     const estado = store.getState().allVideogames;
//     let filtrado = [];

//     if (Number(id) === 0) {
//       dispatch({ type: FILTRADO_GENERO, payload: estado });
//     } else {
//       estado.forEach((game) => {
//         game.genres.forEach((genre) => {
//           if (genre.id === Number(id)) {
//             filtrado.push(game);
//           }
//         });
//       });
//       dispatch({ type: FILTRADO_GENERO, payload: filtrado });
//     }
//   };
// };

// export const filtradoOrigen = (id) => {
//   return function (dispatch) {
//     let estado;

//     estado = store.getState().allVideogames;

//     if (Number(id) === 1) {
//       estado = estado.filter((game) => game.id.toString()[0] !== "0");
//     } else if (Number(id) === 0) {
//       estado = estado.filter((game) => game.id.toString()[0] === "0");
//     }

//     dispatch({ type: FILTRADO_ORIGEN, payload: estado });
//   };
// };
