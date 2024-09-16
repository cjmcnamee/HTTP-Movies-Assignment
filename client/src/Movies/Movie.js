import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      props: props
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

  updateMovie = (e, movieId) => {
    e.preventDefault();
    this.props.history.push(`/update-movie/${movieId}`)
  }

  deleteMovie = (e, movieId) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movieId}`)
        .then(response => {
          this.props.history.push('/');
        })
        .catch(error => {
          console.log(error);
        });
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

console.log(this.state.movie);

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="update-button" onClick={e => this.updateMovie(e, this.state.movie.id)}>
          Update
        </div>
        <div className="delete-button" onClick={e => this.deleteMovie(e, this.state.movie.id)}>
          Delete
        </div>
      </div>
    );
  }
}
