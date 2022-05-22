import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaStar, FaThumbsUp, FaFilm, FaCalendar } from 'react-icons/fa';
import {
  fetchAsyncMovieOrShowDetails,
  removeSelectedMovieOrShow,
  selectMovieOrShow,
} from '../../store/movies/movieSlice';

import './MovieDetail.scss';

const MovieDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector(selectMovieOrShow);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetails(params.imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, params.imdbID]);

  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <FaStar /> : {data.imdbRating}
              </span>
              <span>
                IMDB Votes <FaThumbsUp /> : {data.imdbVotes}
              </span>
              <span>
                Runtime <FaFilm /> : {data.Runtime}
              </span>
              <span>
                Year <FaCalendar /> : {data.Year}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Genres</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Launguages</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
