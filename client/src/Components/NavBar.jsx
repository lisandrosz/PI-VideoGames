import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { buscarJuegos } from "../redux/actions";
import {
  StyleNavBar,
  P,
  H1,
  HomeDiv,
  Div,
  LinkDiv,
} from "../styles/styleNavBar";

const NavBar = (props) => {
  const [textState, setText] = useState("");
  const dispatch = useDispatch();

  const changeText = (evento) => {
    setText(evento.target.value);
  };

  const clickButton = () => {
    dispatch(buscarJuegos(textState));
  };

  return (
    <StyleNavBar>
      <HomeDiv>
        <H1>Videogames App</H1>
        <LinkDiv>
          <Link to={"/home"}>
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
          placeholder="Buscar videojuego"
          value={textState}
          onChange={changeText}
        ></input>
        <button onClick={clickButton}>Buscar</button>
      </Div>
    </StyleNavBar>
  );
};

export default NavBar;
