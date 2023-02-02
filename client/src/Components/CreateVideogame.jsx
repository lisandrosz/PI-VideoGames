import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
      errors.released = "Debe poner una fecha valida (yyyy/mm/dd) ";
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
    <>
      <form onSubmit={submitHandler}>
        <h2>FORMULARIO CREACION JUEGO</h2>

        <div>
          <label name="name">Titulo: </label>
          <input
            type="text"
            onChange={changeHandler}
            value={form.name}
            name="name"
          />
        </div>
        {errors.name && <p>{errors.name}</p>}

        <div>
          <label name={"description"}>Descripcion: </label>
          <input
            type="text"
            name="description"
            onChange={changeHandler}
            value={form.description}
          />
        </div>
        {errors.description && <p>{errors.description}</p>}

        <div>
          <label name="released">Fecha de lanzamiento: </label>
          <input
            type="text"
            name="released"
            onChange={changeHandler}
            value={form.released}
          />
        </div>
        {errors.released && <p>{errors.released}</p>}

        <div>
          <label name="rating">Puntaje: </label>
          <input
            type="text"
            name="rating"
            onChange={changeHandler}
            value={form.rating}
          />
        </div>
        {errors.rating && <p>{errors.rating}</p>}

        <div>
          <p>Seleccionar generos:</p>
          <label name="genres">
            {generos.map((genero) => {
              return (
                <>
                  <br />
                  <input
                    type="checkbox"
                    name={genero.name}
                    value={genero.id}
                    id={genero.id}
                    onChange={checkGenreHandler}
                  />
                  <label name={genero.name} for={genero.id}>
                    {genero.name}
                  </label>
                </>
              );
            })}
          </label>
          {errors.genres && <p>{errors.genres}</p>}
        </div>

        <div>
          <label name={"platforms"}>
            Seleccionar plataformas:
            <br />
            <input
              type="checkbox"
              name="Pc"
              value="PC"
              id="00"
              onChange={checkPlatHandler}
            />
            <label name="pc" for="00">
              Pc
            </label>
            <input
              type="checkbox"
              name="PlayStation 5"
              value="PlayStation 5"
              id="05"
              onChange={checkPlatHandler}
            />
            <label name="PlayStation 5" for="05">
              PlayStation 5
            </label>
            <input
              type="checkbox"
              name="PlayStation 4"
              value="PlayStation 4"
              id="04"
              onChange={checkPlatHandler}
            />
            <label name="PlayStation 4" for="04">
              PlayStation 4
            </label>
            <input
              type="checkbox"
              name="PlayStation 3"
              value="PlayStation 3"
              id="03"
              onChange={checkPlatHandler}
            />
            <label name="PlayStation 3" for="03">
              PlayStation 3
            </label>
            <input
              type="checkbox"
              name="PlayStation 2"
              value="PlayStation 2"
              id="02"
              onChange={checkPlatHandler}
            />
            <label name="PlayStation 2" for="02">
              PlayStation 2
            </label>
            <input
              type="checkbox"
              name="PlayStation 1"
              value="PlayStation 1"
              id="01"
              onChange={checkPlatHandler}
            />
            <label name="PlayStation 1" for="01">
              PlayStation 1
            </label>
            <input
              type="checkbox"
              name="Xbox Series S/X"
              value="Xbox Series S/X"
              id="06"
              onChange={checkPlatHandler}
            />
            <label name="Xbox Series S/X" for="06">
              Xbox Series S/X
            </label>
            <input
              type="checkbox"
              name="Xbox One"
              value="Xbox One"
              id="07"
              onChange={checkPlatHandler}
            />
            <label name="Xbox One" for="07">
              Xbox One
            </label>
            <input
              type="checkbox"
              name="Xbox 360"
              value="Xbox 360"
              id="08"
              onChange={checkPlatHandler}
            />
            <label name="Xbox 360" for="08">
              Xbox 360
            </label>
            <input
              type="checkbox"
              name="Nintendo Switch"
              value="Nintendo Switch"
              id="09"
              onChange={checkPlatHandler}
            />
            <label name="Nintendo Switch" for="09">
              Nintendo Switch
            </label>
            <input
              type="checkbox"
              name="Nintendo Wii"
              value="Nintendo Wii"
              id="010"
              onChange={checkPlatHandler}
            />
            <label name="Nintendo Wii" for="010">
              Nintendo Wii
            </label>
          </label>
        </div>
        {errors.platforms && <p>{errors.platforms}</p>}

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Enviar
        </button>
      </form>
    </>
  );
};

export default CreateActivity;
