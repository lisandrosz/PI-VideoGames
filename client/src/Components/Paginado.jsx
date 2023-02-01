import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartsContainer from "./CartsContainer";
import styled from "styled-components";
import { cambioIndice, cambioPagina } from "../redux/actions";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cc5151;
  height: 60px;
  margin-bottom: 10px;
`;

const P = styled.p`
  color: white;
  margin: 0 10px 0 10px;
`;

const Paginado = (props) => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const indice = useSelector((state) => state.indice);
  const paginaActual = useSelector((state) => state.paginaActual);

  const itemsPorPagina = 15;

  // const items = () => {
  //   return videogames.slice(indice, indice + itemsPorPagina);
  // };
  const items = videogames.slice(indice, indice + itemsPorPagina);

  const nextHandler = () => {
    if (items.length === itemsPorPagina) {
      dispatch(cambioPagina(paginaActual + 1));
      dispatch(cambioIndice(indice + itemsPorPagina));
    }
  };

  const prevHandler = () => {
    if (indice > 0) {
      dispatch(cambioPagina(paginaActual - 1));
      dispatch(cambioIndice(indice - itemsPorPagina));
    } else {
      return;
    }
  };

  return (
    <>
      <Container>
        <button type="button" onClick={prevHandler}>
          Prev
        </button>
        <P>{paginaActual}</P>
        <button type="button" onClick={nextHandler}>
          Next
        </button>
      </Container>

      <CartsContainer videogames={items} />
    </>
  );
};

export default Paginado;
