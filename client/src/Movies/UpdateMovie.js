import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);
  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`http://localhost:5000/api/movies/`)
      .then(response => {
        console.log(response.data);
        console.log(props.savedList);
        const movieInArr = response.data.find(movie => `${movie.id}` === id);
        if (movieInArr) setMovie(movieInArr);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.movies, props.match.params.id]);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if(e.target.name === 'metascore') {
      value = parseInt(value);
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
        .then(response => {
          console.log(response);
          setMovie(initialMovie);
          props.history.push('/');
        })
        .catch(error => {
          console.log(error.response);
        });
  };

  return (
    <div className='updateMovieClass'>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='Title'
          value={movie.title}
        />
        <br />
        <input
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='Director'
          value={movie.director}
        />
        <br />
        <input
          type='text'
          name='metascore'
          onChange={changeHandler}
          placeholder='Metascore'
          value={movie.metascore}
        />
        <br />
        <input
          type='text'
          name='stars'
          onChange={changeHandler}
          placeholder='Stars'
          value={movie.stars}
        />
        <br />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
