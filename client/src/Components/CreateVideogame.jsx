import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #2a2438;
  margin: 10px 0 10px 160px;
  height: auto;
  width: 80%;
`;

const Pdiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Cdiv = styled.div`
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LabelCheck = styled.label`
  color: white;
  margin: 0 20px 5px 2px;
`;

const Input = styled.input`
  margin: 0 0 20px 5px;
  width: 50%;
  height: 30px;
`;

const LabelInput = styled.label`
  color: white;

  display: inline-block;
  width: 160px;
`;

const H1 = styled.h2`
  color: white;
  font-size: 30px;
  margin: 15px 0 15px 0;
`;

const P = styled.p`
  color: white;
`;

const PError = styled.p`
  color: red;
  margin: -2px 0 2px 0px;
`;

const SubmitButton = styled.button`
  margin: 10px 0 15px 0;
  height: 40px;
  width: 80px;
  border-radius: 5px;
  font-size: 17px;
`;

const CreateActivity = (props) => {
  const generos = useSelector((state) => state.generos);

  const [form, setForm] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  const validate = (form) => {
    let errors = {};

    if (!form.name) {
      errors.name = "Agrega un titulo";
    } else if (form.name.length <= 3) {
      errors.name = "El titulo debe ser mas largo";
    } else if (form.name.length > 20) {
      errors.name = "El titulo es demasiado largo";
    }

    if (!form.description) {
      errors.description = "Agrega una descripcion ";
    } else if (form.description.length <= 10) {
      errors.name = "La descripcion debe ser mas larga";
    } else if (form.description.length > 100) {
      errors.name = "La descripcion es demasiado larga";
    }

    if (!form.released) {
      errors.released = "Debe agregar una fecha";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.released)) {
      errors.released = "Debe poner una fecha valida (yyyy-mm-dd) ";
    }

    if (!form.rating) {
      errors.rating = "Agrega una puntuacion ";
    } else if (!/^[0-5]$/.test(form.rating)) {
      errors.name = "La puntuacion debe estar entre 0 y 5";
    }

    if (form.genres.length <= 0) {
      errors.genres = "Debe agregar al menos 1 genero";
    }

    if (form.platforms.length <= 0) {
      errors.platforms = "Debe agregar al menos 1 plataforma";
    }

    return errors;
  };

  const changeHandler = (event) => {
    const target = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [target]: value });
    // Esto lo paso asi por el delay
    setErrors(validate({ ...form, [target]: value }));
  };

  const checkGenreHandler = (evento) => {
    const id = evento.target.id;
    const checked = evento.target.checked;
    if (checked) {
      let copiaGenres = [...form.genres];
      copiaGenres.push(Number(id));
      setForm({ ...form, genres: copiaGenres });
      setErrors(validate({ ...form, genres: copiaGenres }));
    } else {
      let copiaGenres = [...form.genres];
      copiaGenres = copiaGenres.filter((genreID) => genreID !== Number(id));
      setForm({ ...form, genres: copiaGenres });
      setErrors(validate({ ...form, genres: copiaGenres }));
    }
  };

  const checkPlatHandler = (evento) => {
    const name = evento.target.name;
    const id = evento.target.id;
    const checked = evento.target.checked;
    if (checked) {
      let copiaPlat = [...form.platforms];
      copiaPlat.push({
        platform: {
          id,
          name,
        },
      });
      setForm({ ...form, platforms: copiaPlat });
      setErrors(validate({ ...form, platforms: copiaPlat }));
    } else {
      let copiaPlat = [...form.platforms];
      copiaPlat = copiaPlat.filter((plat) => plat.platform.id !== id);
      setForm({ ...form, platforms: copiaPlat });
      setErrors(validate({ ...form, platforms: copiaPlat }));
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const newGame = { ...form };

    await axios
      .post("http://localhost:3001/videogames", newGame)
      .then((res) => {
        alert("Juego creado con exito");
      })
      .catch((error) => alert(error.message));

    setForm({
      name: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    event.target.reset();
  };

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <H1>FORMULARIO CREACION JUEGO</H1>

        <div>
          {errors.name && <PError>{errors.name}</PError>}
          <LabelInput name="name">Titulo: </LabelInput>
          <Input
            type="text"
            onChange={changeHandler}
            value={form.name}
            name="name"
          />
        </div>

        <div>
          {errors.description && <PError>{errors.description}</PError>}
          <LabelInput name={"description"}>Descripcion: </LabelInput>
          <Input
            type="text"
            name="description"
            onChange={changeHandler}
            value={form.description}
          />
        </div>

        <div>
          {errors.released && <PError>{errors.released}</PError>}
          <LabelInput name="released">Fecha de lanzamiento: </LabelInput>
          <Input
            type="text"
            name="released"
            onChange={changeHandler}
            value={form.released}
          />
        </div>

        <div>
          {errors.rating && <PError>{errors.rating}</PError>}
          <LabelInput name="rating">Puntaje: </LabelInput>
          <Input
            type="text"
            name="rating"
            onChange={changeHandler}
            value={form.rating}
          />
        </div>

        <Pdiv>
          <P>Seleccionar generos:</P>
          <label name="genres">
            {generos.map((genero) => {
              return (
                <Cdiv>
                  <input
                    type="checkbox"
                    name={genero.name}
                    value={genero.id}
                    id={genero.id}
                    onChange={checkGenreHandler}
                  />
                  <LabelCheck name={genero.name} for={genero.id}>
                    {genero.name}
                  </LabelCheck>
                </Cdiv>
              );
            })}
          </label>
          {errors.genres && <PError>{errors.genres}</PError>}
        </Pdiv>

        <Pdiv>
          <label name={"platforms"}>
            <P>Seleccionar plataformas:</P>
            <input
              type="checkbox"
              name="Pc"
              value="PC"
              id="00"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="pc" for="00">
              Pc
            </LabelCheck>
            <input
              type="checkbox"
              name="PlayStation 5"
              value="PlayStation 5"
              id="05"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="PlayStation 5" for="05">
              PlayStation 5
            </LabelCheck>
            <input
              type="checkbox"
              name="PlayStation 4"
              value="PlayStation 4"
              id="04"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="PlayStation 4" for="04">
              PlayStation 4
            </LabelCheck>
            <input
              type="checkbox"
              name="PlayStation 3"
              value="PlayStation 3"
              id="03"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="PlayStation 3" for="03">
              PlayStation 3
            </LabelCheck>
            <input
              type="checkbox"
              name="PlayStation 2"
              value="PlayStation 2"
              id="02"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="PlayStation 2" for="02">
              PlayStation 2
            </LabelCheck>
            <input
              type="checkbox"
              name="PlayStation 1"
              value="PlayStation 1"
              id="01"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="PlayStation 1" for="01">
              PlayStation 1
            </LabelCheck>
            <input
              type="checkbox"
              name="Xbox Series S/X"
              value="Xbox Series S/X"
              id="06"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="Xbox Series S/X" for="06">
              Xbox Series S/X
            </LabelCheck>
            <input
              type="checkbox"
              name="Xbox One"
              value="Xbox One"
              id="07"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="Xbox One" for="07">
              Xbox One
            </LabelCheck>
            <input
              type="checkbox"
              name="Xbox 360"
              value="Xbox 360"
              id="08"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="Xbox 360" for="08">
              Xbox 360
            </LabelCheck>
            <input
              type="checkbox"
              name="Nintendo Switch"
              value="Nintendo Switch"
              id="09"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="Nintendo Switch" for="09">
              Nintendo Switch
            </LabelCheck>
            <input
              type="checkbox"
              name="Nintendo Wii"
              value="Nintendo Wii"
              id="010"
              onChange={checkPlatHandler}
            />
            <LabelCheck name="Nintendo Wii" for="010">
              Nintendo Wii
            </LabelCheck>
          </label>
        </Pdiv>
        {errors.platforms && <PError>{errors.platforms}</PError>}

        <SubmitButton type="submit" disabled={Object.keys(errors).length > 0}>
          Enviar
        </SubmitButton>
      </form>
    </Container>
  );
};

export default CreateActivity;
