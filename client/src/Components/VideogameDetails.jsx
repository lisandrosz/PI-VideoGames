import React, { useEffect } from "react";
import { traerDetalle, limpiarDetalle } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0 0 0;
  height: auto;
`;

const Div = styled.div`
  display: flex;
  background-color: #2a2438;
  height: 60%;
  width: 85%;
  margin-bottom: 50px;
`;

const Pdiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const Cdiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const Divdatos = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 0 5px;
`;

const Img = styled.img`
  width: 50%;
  object-fit: cover;
`;

const P = styled.p`
  color: white;
  margin: 10px 0 5px 0;
`;

const H1 = styled.h1`
  color: white;
  font-size: 30px;
  margin: 2px 0 2px 0;
`;

const VideogameDetails = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(traerDetalle(props.match.params.id));
    return () => dispatch(limpiarDetalle());
  }, [dispatch, props.match.params.id]);

  const gameDetail = useSelector((state) => state.detalle);

  return (
    <Container>
      {Object.keys(gameDetail).length !== 0 && (
        <Div>
          <Img src={gameDetail.image} alt="game"></Img>
          <Divdatos>
            <H1>{gameDetail.name}</H1>
            <P>
              <strong>Descripcion:</strong> {gameDetail.description}
            </P>
            <P>
              <strong>Año de lanzamiento:</strong> {gameDetail.released}
            </P>
            <P>
              <strong>Puntaje: </strong>
              {gameDetail.rating}
            </P>
            <Pdiv>
              <P>
                <strong>Plataformas:</strong>
              </P>
              <Cdiv>
                {gameDetail.platforms.map((plat) => {
                  return <P>{plat.platform.name}</P>;
                })}
              </Cdiv>
            </Pdiv>
            <Pdiv>
              <Cdiv>
                <P>
                  <strong>Generos:</strong>
                </P>
                {gameDetail.genres.map((genre) => {
                  return <P>{genre.name}</P>;
                })}
              </Cdiv>
            </Pdiv>
          </Divdatos>
        </Div>
      )}
    </Container>
  );
};

export default VideogameDetails;
