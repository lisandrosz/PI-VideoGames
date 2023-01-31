import React, { useEffect } from "react";
import CartsContainer from "./CartsContainer";
import store from "../redux/store";
import { useDispatch } from "react-redux";
import { traerJuegos } from "../redux/actions";
import Filtrado from "./Filtrados";

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
      <CartsContainer />
    </>
  );
};

export default Home;
