import React from "react";
import { useSelector } from "react-redux";
import { CardsContainer } from "../styles/styleContainer";
import Card from "./Card";

const CartsContainer = (props) => {
  const videogames = useSelector((state) => state.videogames);

  if (videogames) {
    return (
      <CardsContainer>
        {videogames.map((game) => (
          <Card
            name={game.name}
            image={game.image}
            genres={game.genres}
            key={game.name}
          />
        ))}
      </CardsContainer>
    );
  }
};

export default CartsContainer;
