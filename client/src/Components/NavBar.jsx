import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buscarJuegos, botonHome, buscado } from "../redux/actions";
import {
  StyleNavBar,
  P,
  H1,
  HomeDiv,
  Div,
  LinkDiv,
} from "../styles/styleNavBar";

const NavBar = (props) => {
  const allVideogames = useSelector((state) => state.allVideogames);

  const [textState, setText] = useState("");
  const dispatch = useDispatch();

  const changeText = (evento) => {
    setText(evento.target.value);
  };

  const clickButton = () => {
    setText("");
    dispatch(buscarJuegos(textState));
  };

  const clickHome = () => {
    setText("");
    dispatch(buscado(false));
    dispatch(botonHome([...allVideogames]));
  };

  return (
    <StyleNavBar>
      <HomeDiv>
        <H1>Videogames App</H1>
        <LinkDiv>
          <Link to={"/home"} onClick={clickHome}>
            <P>Home</P>
          </Link>
          <Link to={"/creategame"}>
            <P>Crear Juego</P>
          </Link>
        </LinkDiv>
      </HomeDiv>

      <Div>
        <input
          type="text"
          placeholder="Buscar videojuego..."
          value={textState}
          onChange={changeText}
        ></input>
        <button onClick={clickButton}>Buscar</button>
      </Div>
    </StyleNavBar>
  );
};

export default NavBar;
