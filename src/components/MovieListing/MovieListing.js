import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { selectAllMovies, selectAllShows } from '../../store/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';

import './MovieListing.scss';
import { Settings } from '../common/settings';

const MovieListing = () => {
  const movies = useSelector(selectAllMovies);
  const shows = useSelector(selectAllShows);

  let renderMovies = '';
  let renderShows = '';
  renderMovies =
    movies.Response === 'True' ? (
      movies.Search.map((movie, idx) => <MovieCard key={idx} data={movie} />)
    ) : (
      <div className="error">
        <h3>{movies.Error}</h3>
      </div>
    );
  renderShows =
    shows.Response === 'True' ? (
      shows.Search.map((show, idx) => <MovieCard key={idx} data={show} />)
    ) : (
      <div className="error">
        <h3>{shows.Error}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...Settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">
          <Slider {...Settings}>{renderShows}</Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
