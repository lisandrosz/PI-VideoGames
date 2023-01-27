import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, BotonIngresar } from "../styles/styleLanding";
import { traerJuegos } from "../redux/actions";

const Landing = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(traerJuegos());
  }, []);

  return (
    <Container>
      <Link to={"/home"}>
        <BotonIngresar>Ingresar</BotonIngresar>
      </Link>
    </Container>
  );
};

export default Landing;
