import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../redux/actions/movieDetailsActions';
import './MovieDetails.css';

const MovieDetails = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const details = useSelector((state) => state.movieDetails.details);
    const isLoading = useSelector((state) => state.movieDetails.isLoading); // מצב טעינה מה-redux

    useEffect(() => {
        dispatch(fetchMovieDetails(type, id));
    }, [type, id, dispatch]);

    if (isLoading || !details) {
        return <div>Loading...</div>; // מסך טעינה
    }

    return (
        <div className="movie-details-container">
            <button onClick={() => navigate('/')} className="back-button">Back to Home</button>

            <div className="movie-details-header">
                <img
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt={details.title || details.name}
                    className="movie-details-poster"
                />
                <div className="movie-details-info">
                    <h1>{details.title || details.name}</h1>
                    <p><strong>Release Date:</strong> {details.release_date || details.first_air_date}</p>
                    <p><strong>Rating:</strong> {details.vote_average} / 10</p>
                    <p><strong>Overview:</strong> {details.overview}</p>
                </div>
            </div>

            <div className="movie-details-extra">
                {details.genres && (
                    <p><strong>Genres:</strong> {details.genres.map((genre) => genre.name).join(', ')}</p>
                )}
                {details.runtime && (
                    <p><strong>Runtime:</strong> {details.runtime} minutes</p>
                )}
                {details.number_of_seasons && (
                    <p><strong>Seasons:</strong> {details.number_of_seasons}</p>
                )}
                {details.number_of_episodes && (
                    <p><strong>Episodes:</strong> {details.number_of_episodes}</p>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
