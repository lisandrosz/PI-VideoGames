import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartsContainer from "./CartsContainer";
import styled from "styled-components";

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
  const itemsPorPagina = 15;
  let videogames = useSelector((state) => state.videogames);
  const [items, setItems] = useState([...videogames].splice(0, itemsPorPagina));
  const [paginaActual, setPaginaActual] = useState(1);

  const nextHandler = () => {
    const cantidadPaginas = Math.ceil(videogames.length / itemsPorPagina);
    const nextPage = paginaActual + 1;
    const firstIndex = nextPage * itemsPorPagina;

    if (paginaActual === cantidadPaginas || paginaActual > cantidadPaginas) {
      return;
    }

    setItems([...videogames].splice(firstIndex, itemsPorPagina));
    setPaginaActual(nextPage);
  };

  const prevHandler = () => {
    const prevPage = paginaActual - 1;

    if (prevPage < 1) return;

    const firstIndex = prevPage * itemsPorPagina;
    setItems([...videogames].splice(firstIndex, itemsPorPagina));
    setPaginaActual(prevPage);
  };

  //   const handler = (direccion) => {
  //     if (direccion === "next") {
  //       const cantidadPaginas = Math.ceil(videogames.length / itemsPorPagina);
  //       const nextPage = paginaActual + 1;
  //       const firstIndex = nextPage * itemsPorPagina;

  //       if (paginaActual === cantidadPaginas || paginaActual > cantidadPaginas) {
  //         return;
  //       }

  //       setItems([...videogames].splice(firstIndex, itemsPorPagina));
  //       setPaginaActual(nextPage);
  //     } else if (direccion === "prev") {
  //       const prevPage = paginaActual - 1;

  //       if (prevPage < 1) return;

  //       const firstIndex = prevPage * itemsPorPagina;
  //       setItems([...videogames].splice(firstIndex, itemsPorPagina));
  //       setPaginaActual(prevPage);
  //     } else {
  //       setItems([...videogames].splice(paginaActual, itemsPorPagina));
  //       return;
  //     }
  //   };

  //   handler();
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
