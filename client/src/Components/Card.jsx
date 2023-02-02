import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #2a2438;
  flex-direction: column;
  align-items: center;
  width: 325px;
  height: auto;
  margin: 10px;
  border: 5px solid #dbd8e3;
  border-radius: 15px;
  font-family: "Roboto Slab", serif;

  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  /* -webkit-box-shadow: 16px 11px 24px 1px rgba(34, 87, 126, 0.41);
  -moz-box-shadow: 16px 11px 24px 1px rgba(34, 87, 126, 0.41);
  box-shadow: 16px 11px 24px 1px rgba(34, 87, 126, 0.41); */
`;

const Img = styled.img`
  object-fit: cover;
  width: 325px;
  height: 200px;
  border-radius: 15px 15px 0 0;
`;

const Imgdiv = styled.div``;

const H1 = styled.h1`
  color: white;
  font-size: 24px;
  margin: 2px 0 2px 0;
`;

const Gdiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2px 0 2px 0;
`;

const Gp = styled.p`
  color: white;
`;

const Card = (props) => {
  return (
    <Container>
      <Link style={{ textDecoration: "none" }} to={`/details/${props.id}`}>
        <Imgdiv>
          <Img src={props.image} alt="game"></Img>
        </Imgdiv>
        <H1>{props.name}</H1>
        <div>
          <Gdiv>
            {props.genres.map((genre) => {
              return <Gp>{genre.name}</Gp>;
            })}
          </Gdiv>
        </div>
      </Link>
    </Container>
  );
};

export default Card;
