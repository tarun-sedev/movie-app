import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import MovieListing from '../MovieListing/MovieListing';
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../store/movies/movieSlice';

const Home = () => {
  const firstRenderRef = useRef(true);
  const dispatch = useDispatch();
  const movieText = 'Harry';
  const showText = 'Friends';

  useEffect(() => {
    if (!firstRenderRef.current) {
      return;
    }
    firstRenderRef.current = false;
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
