import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi, { API_KEY } from '../../api/httpClient';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${API_KEY}&s=${term}&type=movie`
    );

    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${API_KEY}&s=${term}&type=series`
    );

    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetails = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetails',
  async (id) => {
    const response = await movieApi.get(`?apiKey=${API_KEY}&i=${id}&Plot=full`);

    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies(state, { payload }) {
      state.movies = payload;
    },
    removeSelectedMovieOrShow(state) {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('PENDING - movies');
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('FULFILLED - movies');
      state.movies = payload;
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('REJECTED - movies');
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log('FULFILLED - shows');
      state.shows = payload;
    },
    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
      console.log('FULFILLED - details');
      state.selectedMovieOrShow = payload;
    },
  },
});

export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions;

export const selectAllMovies = (state) => state.movies.movies;
export const selectAllShows = (state) => state.movies.shows;
export const selectMovieOrShow = (state) => state.movies.selectedMovieOrShow;

export default movieSlice.reducer;
