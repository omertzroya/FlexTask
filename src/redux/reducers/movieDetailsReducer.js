import { SET_MOVIE_DETAILS, FETCH_MOVIE_DETAILS } from '../actions/movieDetailsActions';

const initialState = {
    details: null,
    isLoading: false,
};

export const movieDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIE_DETAILS:
            return { ...state, isLoading: true, details: null }; // התחלת טעינה
        case SET_MOVIE_DETAILS:
            return { ...state, details: action.payload, isLoading: false }; // סיום טעינה
        default:
            return state;
    }
};
