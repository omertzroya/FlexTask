import { SET_MOVIES, SET_FAVORITES } from '../actions/popularMoviesActions';

const initialState = {
    movies: [],
    favorites: [],
};

export const popularMoviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES:
            return { ...state, movies: action.payload };
        case SET_FAVORITES:
            return { ...state, favorites: action.payload };
        default:
            return state;
    }
};