import React, { useEffect } from "react";
import store from "../redux/store";
import { useDispatch } from "react-redux";
import { traerJuegos } from "../redux/actions";
import Filtrado from "./Filtrados";
import Paginado from "./Paginado";

const Home = (props) => {
  const dispatch = useDispatch();
  const estado = store.getState().videogames;

  useEffect(() => {
    if (estado.length < 1) {
      dispatch(traerJuegos());
    }
  }, [dispatch, estado]);

  return (
    <>
      <Filtrado />
      <Paginado />
    </>
  );
};

export default Home;
