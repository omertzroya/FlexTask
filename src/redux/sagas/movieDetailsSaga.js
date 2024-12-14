import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_MOVIE_DETAILS, setMovieDetails } from '../actions/movieDetailsActions';

function* fetchMovieDetails(action) {
    const { type, id } = action.payload;
    const url = `https://api.themoviedb.org/3/${type}/${id}`;

    try {
        const response = yield call(axios.get, url, {
            params: { language: 'en-US' },
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWRhODc0OTA5N2RhMzQ0YjJhMjRhMzE2YzRhNzJmNyIsIm5iZiI6MTczMzc0NjQxOS42NjEsInN1YiI6IjY3NTZkZWYzYTE4Y2I4Njk1YWZkOGI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SC-puiaKp4lt4rBgn4dUrn6Pxzujy77RnFtZUR_WFf8`,
                Accept: 'application/json',
            },
        });
        yield put(setMovieDetails(response.data));
    } catch (error) {
        console.error(error);
    }
}

export function* watchMovieDetails() {
    yield takeLatest(FETCH_MOVIE_DETAILS, fetchMovieDetails);
}