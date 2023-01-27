import React from "react";
import { Link } from "react-router-dom";
import {
  StyleNavBar,
  P,
  H1,
  HomeDiv,
  Div,
  LinkDiv,
} from "../styles/styleNavBar";

const NavBar = (props) => {
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
        <input type="text" placeholder="Buscar videojuego"></input>
        <button>Buscar</button>
      </Div>
    </StyleNavBar>
  );
};

export default NavBar;
