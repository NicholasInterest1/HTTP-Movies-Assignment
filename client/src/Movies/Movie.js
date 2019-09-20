import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import styled from "styled-components";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        this.props.history.push("/");
      })
      .then(res => {
        this.props.updateMovies(res.data);
      })
      .catch(err => console.log(err.response));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <TheDiv>
          <TheBtn
            onClick={() =>
              this.props.history.push(`/update-movie/${this.state.movie.id}`)
            }
          >
            Update Movie
          </TheBtn>
          <TheBtn onClick={() => this.deleteMovie(this.state.movie.id)}>
            Delete Movie
          </TheBtn>
        </TheDiv>
      </div>
    );
  }
}

const TheDiv = styled.div`
  margin-left: 375px;
  margin-top: 30px;
`;

const TheBtn = styled.button`
  background-color: black;
  border: 2px dashed red;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  margin-right: 15px;
  padding: 15px;
  width: 30%;
`;
