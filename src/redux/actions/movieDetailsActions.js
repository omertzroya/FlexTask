export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';
export const SET_MOVIE_DETAILS = 'SET_MOVIE_DETAILS';

export const fetchMovieDetails = (type, id) => ({
    type: FETCH_MOVIE_DETAILS,
    payload: { type, id },
});

export const setMovieDetails = (details) => ({
    type: SET_MOVIE_DETAILS,
    payload: details,
});
