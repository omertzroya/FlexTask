import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { movieDetailsReducer } from './reducers/movieDetailsReducer';
import { popularMoviesReducer } from './reducers/popularMoviesReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    movieDetails: movieDetailsReducer,
    popularMovies: popularMoviesReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;