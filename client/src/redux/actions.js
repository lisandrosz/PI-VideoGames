import axios from "axios";
import store from "./store";
export const TRAER_JUEGOS = "TRAER_JUEGOS";
export const BUSCAR_JUEGOS = "BUSCAR_JUEGOS";
export const TRAER_GENEROS = "TRAER_GENEROS";
export const CHANGE_GENERO = "CHANGE_GENERO";
export const CHANGE_ORIGEN = "CHANGE_ORIGEN";
export const FILTRADO = "FILTRADO";
export const ORDENADO = "ORDENADO";

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

// export const changeGenero = (id) => {
//   return function (dispatch) {
//     dispatch({ type: CHANGE_GENERO, payload: id });
//     ///////////////////////////////////////////////
//     // Esto lo intente hacer en una funcion aparte pero no funciono
//     let estado = store.getState().allVideogames;
//     let genero = store.getState().filtroGenero;
//     let origen = store.getState().filtroOrigen;
//     let filtrado = [];

//     // Aca hago el filtrado por el genero del juego
//     if (Number(genero) === 0) {
//       filtrado = estado;
//     } else {
//       estado.forEach((game) => {
//         game.genres.forEach((genre) => {
//           if (genre.id === Number(genero)) {
//             filtrado.push(game);
//           }
//         });
//       });
//     }

//     // Ahora realizo el filtrado por el origen (existente o creado)
//     if (origen === "todos") {
//       // Se queda igual
//     } else if (Number(origen) === 1) {
//       filtrado = filtrado.filter((game) => game.id.toString()[0] !== "0");
//     } else {
//       filtrado = filtrado.filter((game) => game.id.toString()[0] === "0");
//     }
//     dispatch({ type: FILTRADO, payload: filtrado });
//   };
// };

// export const changeOrigen = (id) => {
//   return function (dispatch) {
//     dispatch({ type: CHANGE_ORIGEN, payload: id });
//     ///////////////////////////////////////////////
//     // Esto lo intente hacer en una funcion aparte pero no funciono
//     let estado = store.getState().allVideogames;
//     let genero = store.getState().filtroGenero;
//     let origen = store.getState().filtroOrigen;
//     let filtrado = [];

//     // Aca hago el filtrado por el genero del juego
//     if (Number(genero) === 0) {
//       filtrado = estado;
//     } else {
//       estado.forEach((game) => {
//         game.genres.forEach((genre) => {
//           if (genre.id === Number(genero)) {
//             filtrado.push(game);
//           }
//         });
//       });
//     }

//     // Ahora realizo el filtrado por el origen (existente o creado)
//     if (origen === "todos") {
//       // Se queda igual
//     } else if (Number(origen) === 1) {
//       filtrado = filtrado.filter((game) => game.id.toString()[0] !== "0");
//     } else {
//       filtrado = filtrado.filter((game) => game.id.toString()[0] === "0");
//     }
//     dispatch({ type: FILTRADO, payload: filtrado });
//   };
// };

export const filter = (tipoFiltro, valor) => {
  return function (dispatch) {
    if (tipoFiltro === "genero") {
      dispatch({ type: CHANGE_GENERO, payload: valor });
    } else if (tipoFiltro === "origen") {
      dispatch({ type: CHANGE_ORIGEN, payload: valor });
    }

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
          if (genre.id === Number(genero)) {
            filtrado.push(game);
          }
        });
      });
    }

    // Ahora realizo el filtrado por el origen (existente o creado)
    if (origen === "todos") {
      // Se queda igual
    } else if (Number(origen) === 1) {
      filtrado = filtrado.filter((game) => game.id.toString()[0] !== "0");
    } else {
      filtrado = filtrado.filter((game) => game.id.toString()[0] === "0");
    }
    dispatch({ type: FILTRADO, payload: filtrado });
  };
};

// export const ordenar = (valor) => {
//   return function (dispatch) {
//     let estado = store.getState().allVideogames;

//     if (valor === "az") {
//       estado = estado.sort((a, b) => {
//         if (a.name.toLowerCase() < b.name.toLowerCase()) {
//           return -1;
//         }
//         if (a.name.toLowerCase() > b.name.toLowerCase()) {
//           return 1;
//         }
//         return 0;
//       });
//     } else if (valor === "za") {
//       estado = estado.sort((a, b) => {
//         if (a.name.toLowerCase() > b.name.toLowerCase()) {
//           return -1;
//         }
//         if (a.name.toLowerCase() < b.name.toLowerCase()) {
//           return 1;
//         }
//         return 0;
//       });
//     } else if (valor === "mayorRating") {
//       estado = estado.sort((a, b) => b.rating - a.rating);
//     } else if (valor === "menorRating") {
//       estado = estado.sort((a, b) => a.rating - b.rating);
//     } else {
//       // No hago nada
//     }
//     dispatch({ type: ORDENADO, payload: estado });
//   };
// };
