export const FETCH_MOVIES = 'FETCH_MOVIES';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FAVORITES = 'SET_FAVORITES';

export const fetchMovies = (category, page, favorites) => ({
    type: FETCH_MOVIES,
    payload: { category, page, favorites },
});

export const setMovies = (movies) => ({
    type: SET_MOVIES,
    payload: movies,
});

export const setFavorites = (favorites) => ({
    type: SET_FAVORITES,
    payload: favorites,
});