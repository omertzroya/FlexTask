import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

const MovieDetails = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const url = `https://api.themoviedb.org/3/${type}/${id}`;
            try {
                const response = await axios.get(url, {
                    params: { language: 'en-US' },
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWRhODc0OTA5N2RhMzQ0YjJhMjRhMzE2YzRhNzJmNyIsIm5iZiI6MTczMzc0NjQxOS42NjEsInN1YiI6IjY3NTZkZWYzYTE4Y2I4Njk1YWZkOGI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SC-puiaKp4lt4rBgn4dUrn6Pxzujy77RnFtZUR_WFf8`,
                        Accept: 'application/json',
                    },
                });
                setDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDetails();
    }, [type, id]);

    if (!details) return <div>Loading...</div>;

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
                    <p><strong>Genres:</strong> {details.genres.map(genre => genre.name).join(', ')}</p>
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
