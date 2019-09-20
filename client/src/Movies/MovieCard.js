import React from "react";
import styled from "styled-components";

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <TheH2>{title}</TheH2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
      {stars.map(star => (
        <div key={star}>{star}</div>
      ))}
    </div>
  );
};

export default MovieCard;

const TheH2 = styled.h2`
  text-decoration: none;
  font-size: 2.5rem;
  align-items: center;
`;
