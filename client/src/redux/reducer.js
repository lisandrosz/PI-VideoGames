import {
  TRAER_JUEGOS,
  BUSCAR_JUEGOS,
  TRAER_GENEROS,
  FILTRADO_GENERO,
  FILTRADO_ORIGEN,
} from "./actions";

const initialState = {
  allVideogames: [],
  videogames: [],
  generos: [],
  filtroAplicado: false,
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
    case FILTRADO_GENERO: {
      return {
        ...state,
        videogames: action.payload,
      };
    }
    //
    case FILTRADO_ORIGEN: {
      return {
        ...state,
        videogames: action.payload,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
