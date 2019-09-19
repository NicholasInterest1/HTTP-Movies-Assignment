import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  const updateMovies = updateMovies => {
    const addMovies = movies.map(movie => {
      if (movie.id === updateMovies.id) return updateMovies;
      else return movie;
    });
    setMovies(addMovies);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => <MovieList {...props} movies={movies} />}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return (
            <UpdateForm
              {...props}
              movies={movies}
              updateMovies={updateMovies}
            />
          );
        }}
      />
    </>
  );
};

export default App;
