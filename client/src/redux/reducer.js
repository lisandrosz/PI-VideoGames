import {
  TRAER_JUEGOS,
  BUSCAR_JUEGOS,
  TRAER_GENEROS,
  CHANGE_GENERO,
  CHANGE_ORIGEN,
  FILTRADO,
  ORDENADO,
} from "./actions";

const initialState = {
  allVideogames: [],
  videogames: [],
  generos: [],
  filtroGenero: 0,
  filtroOrigen: "todos",
  ordenamiento: "defecto",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //
    case TRAER_JUEGOS: {
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    }
    //
    case BUSCAR_JUEGOS: {
      return {
        ...state,
        videogames: action.payload,
      };
    }
    //
    case TRAER_GENEROS: {
      return {
        ...state,
        generos: action.payload,
      };
    }
    //
    case CHANGE_GENERO: {
      return {
        ...state,
        filtroGenero: action.payload,
      };
    }
    //
    case CHANGE_ORIGEN: {
      return {
        ...state,
        filtroOrigen: action.payload,
      };
    }
    //
    case FILTRADO: {
      return {
        ...state,
        videogames: action.payload,
      };
    }
    //
    case ORDENADO: {
      return {
        ...state,
        ordenamiento: action.payload,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
