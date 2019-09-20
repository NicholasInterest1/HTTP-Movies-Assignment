import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const initialInfo = {
  title: "",
  director: "",
  metascore: "",
  stars: []
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
    if (e.target.name !== "stars") {
      setmovie({
        ...movie,
        [e.target.name]: e.target.value
      });
    } else{
        setmovie({
            ...movie,
            [e.target.name]: e.target.value.split(",")
        })
    }
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
      <TheH2>Update movie</TheH2>
      <form onSubmit={handleSubmit}>
        <TheInput
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder=" Movie Title"
          value={movie.title}
        />

        <TheInput
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Movie Director"
          value={movie.director}
        />

        <TheInput
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Movie Metascore"
          value={movie.metascore}
        />

        <TheInput
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Movie Stars"
          value={movie.stars}
        />

        <Btn>Update Movie</Btn>
      </form>
    </div>
  );
};

export default UpdateForm;

const TheH2 = styled.h2`
  display: flex;
  justify-content: center;
`;

const TheInput = styled.input`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-left: 800px;
  border: 2px dashed red;
`;
const Btn = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 837px;
`;
