import { all } from 'redux-saga/effects';
import { watchMovieDetails } from './movieDetailsSaga';
import { watchPopularMovies } from './popularMoviesSaga';

export default function* rootSaga() {
    yield all([
        watchMovieDetails(),
        watchPopularMovies(),
    ]);
}
