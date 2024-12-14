import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_MOVIES, setMovies, setFavorites } from '../actions/popularMoviesActions';

function* fetchMovies(action) {
    const { category, page, favorites } = action.payload;
    let url = 'https://api.themoviedb.org/3/movie/popular';

    if (category === 'airing-now') {
        url = 'https://api.themoviedb.org/3/tv/airing_today';
    } else if (category === 'favorites') {
        yield put(setMovies(favorites));
        return;
    }

    try {
        const response = yield call(axios.get, url, {
            params: { language: 'en-US', page },
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWRhODc0OTA5N2RhMzQ0YjJhMjRhMzE2YzRhNzJmNyIsIm5iZiI6MTczMzc0NjQxOS42NjEsInN1YiI6IjY3NTZkZWYzYTE4Y2I4Njk1YWZkOGI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SC-puiaKp4lt4rBgn4dUrn6Pxzujy77RnFtZUR_WFf8`,
                Accept: 'application/json',
            },
        });
        yield put(setMovies(response.data.results));
    } catch (error) {
        console.error(error);
    }
}

export function* watchPopularMovies() {
    yield takeLatest(FETCH_MOVIES, fetchMovies);
}