import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartsContainer from "./CartsContainer";
import styled from "styled-components";
import { cambioIndice, cambioPagina } from "../redux/actions";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #352f44;
  height: fit-content;
  padding-bottom: 10px;
`;

const P = styled.p`
  color: white;
  margin: 0 70px 0 70px;
`;

const DIV = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
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
        <P>Pagina actual</P>
        <DIV>
          <button type="button" onClick={prevHandler}>
            Prev
          </button>
          <P>{paginaActual}</P>
          <button type="button" onClick={nextHandler}>
            Next
          </button>
        </DIV>
      </Container>

      <CartsContainer videogames={items} />
    </>
  );
};

export default Paginado;
