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
    const isLoading = useSelector((state) => state.movieDetails.isLoading);

    useEffect(() => {
        dispatch(fetchMovieDetails(type, id));
    }, [type, id, dispatch]);

    if (isLoading || !details) {
        return (
            <div className="netflix-loading">
                <div className="netflix-spinner"></div>
            </div>
        );
    }


    const matchPercentage = Math.floor(details.vote_average * 10);

    return (
        <div className="netflix-movie-details">
            <div 
                className="movie-backdrop" 
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${details.backdrop_path})`
                }}
            >
                <button 
                    className="netflix-back-button" 
                    onClick={() => navigate('/')}
                >
                    ← Back to Browse
                </button>

                <div className="movie-header">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} 
                        alt={details.title || details.name} 
                        className="movie-poster" 
                    />
                    <div className="movie-info">
                        <h1>{details.title || details.name}</h1>
                        <div className="movie-metadata">
                            <span className="match-percentage">{matchPercentage}% Match</span>
                            <span className="release-year">
                                {new Date(details.release_date || details.first_air_date).getFullYear()}
                            </span>
                            {details.runtime && <span>{details.runtime} min</span>}
                            {details.number_of_seasons && <span>{details.number_of_seasons} Seasons</span>}
                        </div>
                        
                        <p className="movie-description">{details.overview}</p>
                        
                        {details.genres && (
                            <div className="movie-genres">
                                <strong>Genres: </strong>
                                {details.genres.map((genre) => genre.name).join(', ')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;