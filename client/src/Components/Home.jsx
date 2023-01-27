import React from "react";
import { Link } from "react-router-dom";
import CartsContainer from "./CartsContainer";

const Home = (props) => {
  return (
    <>
      <h1>Soy el Home</h1>

      <Link to={"/details"}>Videogame details</Link>

      <CartsContainer />
    </>
  );
};

export default Home;
