import React from "react";
import styled from "styled-components";
import { filtradoGenero, filtradoOrigen } from "../redux/actions";
import { useDispatch } from "react-redux";

const Container = styled.div`
  background-color: gray;
  height: 60px;
`;

const Filtrado = (props) => {
  const dispatch = useDispatch();

  const filtroGenero = (evento) => {
    dispatch(filtradoGenero(evento.target.value));
  };

  const filtroOrigen = (evento) => {
    dispatch(filtradoOrigen(evento.target.value));
  };

  return (
    <Container>
      <select name="generos" onChange={filtroGenero} id={1}>
        <option value={0}>Todos los generos</option>
        <option value={4}>Accion</option>
        <option value={51}>Indie</option>
        <option value={3}>Aventura</option>
        <option value={5}>RPG</option>
        <option value={10}>Estrategia</option>
        <option value={2}>Shooter</option>
        <option value={40}>Casual</option>
        <option value={14}>Simulacion</option>
        <option value={7}>Puzzle</option>
        <option value={11}>Arcade</option>
        <option value={83}>Plataformas</option>
        <option value={1}>Carreras</option>
        <option value={59}>Multijugadores</option>
        <option value={15}>Deportes</option>
        <option value={6}>Pelea</option>
        <option value={19}>Familiares</option>
        <option value={28}>Juegos de mesa</option>
        <option value={34}>Educativos</option>
        <option value={17}>Cartas</option>
      </select>

      <select name="origen" id="2" onChange={filtroOrigen}>
        <option value={false}>Todos los videojuegos</option>
        <option value={1}>Videojuego existente</option>
        <option value={0}>Videojuego creado</option>
      </select>
    </Container>
  );
};

export default Filtrado;
