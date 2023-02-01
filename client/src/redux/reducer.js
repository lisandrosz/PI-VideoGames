import {
  TRAER_JUEGOS,
  BUSCAR_JUEGOS,
  TRAER_GENEROS,
  CHANGE_GENERO,
  CHANGE_ORIGEN,
  FILTRADO,
  ORDENADO,
  CAMBIO_INDICE,
  PAGINA_ACTUAL,
  BOTON_HOME,
  BUSCADO,
} from "./actions";

const initialState = {
  allVideogames: [],
  videogames: [],
  generos: [],
  filtroGenero: 0,
  filtroOrigen: "todos",
  ordenamiento: "defecto",
  indice: 0,
  paginaActual: 1,
  buscado: {
    condicion: false,
    juegos: [],
  },
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
        buscado: { ...state.buscado, juegos: action.payload },
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
    //
    case CAMBIO_INDICE: {
      return {
        ...state,
        indice: action.payload,
      };
    }
    //
    case PAGINA_ACTUAL: {
      return {
        ...state,
        paginaActual: action.payload,
      };
    }
    //
    case BOTON_HOME: {
      return {
        ...state,
        videogames: action.payload,
      };
    }
    //
    case BUSCADO: {
      return {
        ...state,
        buscado: { ...state.buscado, condicion: action.payload },
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
