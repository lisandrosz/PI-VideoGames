import { TRAER_JUEGOS } from "./actions";

const initialState = {
  videogames: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TRAER_JUEGOS: {
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
