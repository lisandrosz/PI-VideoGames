import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #a5c9ca;
  flex-direction: column;
  align-items: center;

  border: 5px solid #395b64;
  border-radius: 5px;
  font-family: "Roboto Slab", serif;

  -webkit-box-shadow: 16px 11px 24px 1px rgba(34, 87, 126, 0.41);
  -moz-box-shadow: 16px 11px 24px 1px rgba(34, 87, 126, 0.41);
  box-shadow: 16px 11px 24px 1px rgba(34, 87, 126, 0.41);
`;

const Card = (props) => {
  return (
    <Container>
      <h1>{props.name}</h1>
      <img src={props.image} alt="game image" width="200" height="100"></img>
      {/* <p>{props.genres}</p> */}
      <div>
        <hr />
        {props.genres.map((genre) => {
          return <p>{genre.name}</p>;
        })}
        <hr />
      </div>

      <hr />
      {/* <Link to={"/details"}>Videogame details</Link> */}
    </Container>
  );
};

export default Card;
