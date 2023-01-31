import React from "react";
import { CardsContainer } from "../styles/styleContainer";
import Card from "./Card";

const CartsContainer = (props) => {
  // const videogames = useSelector((state) => state.videogames);

  const videogames = props.videogames;

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
