import React, { useState, useEffect } from "react";
import axios from "axios";

const initialInfo = {
  title: "",
  director: "",
  metascore: "",
};

const UpdateForm = props => {
  const [movie, setmovie] = useState(initialInfo);

  const { match, movies } = props;
  useEffect(() => {
    const id = match.params.id;
    const movieToUpdate = movies.find(movie => `${movie.id}` === id);
    if (movieToUpdate) {
      setmovie(movieToUpdate);
    }
  }, [match, movies]);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "director") {
      value = parseInt(value, 10);
    }

    setmovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.updateMovies(res.data);
        props.history.push(`/movies/${movie.id}`);
        setmovie(initialInfo);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder=" Movie Title"
          value={movie.name}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Movie Director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Movie Metascore"
          value={movie.metascore}
        />

        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateForm;