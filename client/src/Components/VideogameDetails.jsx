import React, { useEffect } from "react";
import { traerDetalle, limpiarDetalle } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const VideogameDetails = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(traerDetalle(props.match.params.id));
    return () => dispatch(limpiarDetalle());
  }, [dispatch, props.match.params.id]);

  const gameDetail = useSelector((state) => state.detalle);

  return (
    <>
      {Object.keys(gameDetail).length !== 0 && (
        <>
          <h1>{gameDetail.name}</h1>
          <img src={gameDetail.image} alt="game" width="200" height="100"></img>
          <p>Descripcion:{gameDetail.description}</p>
          <p>Release: {gameDetail.released}</p>
          <p>Rating: {gameDetail.rating}</p>
          <div>
            <hr />
            <p>Plataformas:</p>
            {gameDetail.platforms.map((plat) => {
              return <p>{plat.platform.name}</p>;
            })}
            <hr />
          </div>

          <div>
            <hr />
            <p>Generos:</p>
            {gameDetail.genres.map((genre) => {
              return <p>{genre.name}</p>;
            })}
            <hr />
          </div>
        </>
      )}
    </>
  );
};

export default VideogameDetails;
