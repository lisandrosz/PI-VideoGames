import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, BotonIngresar, H1 } from "../styles/styleLanding";
import { traerJuegos, traerGeneros } from "../redux/actions";

const Landing = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(traerJuegos());
    dispatch(traerGeneros());
  }, [dispatch]);

  return (
    <Container>
      <H1>Bienvenido a la Videogames App</H1>
      <Link to={"/home"}>
        <BotonIngresar>Ingresar</BotonIngresar>
      </Link>
    </Container>
  );
};

export default Landing;
