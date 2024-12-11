import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PopularMovies.css';

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('popular');
    const [favorites, setFavorites] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [category]);

    useEffect(() => {
        const fetchMovies = () => {
            let url = 'https://api.themoviedb.org/3/movie/popular';

            if (category === 'airing-now') {
                url = 'https://api.themoviedb.org/3/tv/airing_today';
            } else if (category === 'favorites') {
                setMovies(favorites);
                return;
            }

            const getMovies = {
                method: 'GET',
                url: url,
                params: { language: 'en-US', page: page },
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWRhODc0OTA5N2RhMzQ0YjJhMjRhMzE2YzRhNzJmNyIsIm5iZiI6MTczMzc0NjQxOS42NjEsInN1YiI6IjY3NTZkZWYzYTE4Y2I4Njk1YWZkOGI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SC-puiaKp4lt4rBgn4dUrn6Pxzujy77RnFtZUR_WFf8`,
                    Accept: 'application/json',
                },
            };

            axios(getMovies)
                .then((response) => {
                    if (category !== 'favorites') {
                        setMovies(response.data.results);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        fetchMovies();
    }, [page, category, favorites]);

    const nextPage = () => setPage((prevPage) => prevPage + 1);
    const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

    const toggleFavorite = (movie) => {
        let updatedFavorites;
        if (favorites.some((fav) => fav.id === movie.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
        } else {
            updatedFavorites = [...favorites, movie];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleMovieClick = (item) => {
        const itemId = item.id;
        const itemType = category === 'airing-now' ? 'tv' : 'movie';
        navigate(`/${itemType}/${itemId}`);
    };

    const handleKeyDown = (event) => {
        if (category !== 'favorites') {
            if (event.key === 'ArrowDown' && selectedIndex < movies.length - 1) {
                setSelectedIndex(selectedIndex + 1);
            }
            if (event.key === 'ArrowUp' && selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
            }
            if (event.key === 'ArrowRight') {
                nextPage();
            }
            if (event.key === 'ArrowLeft') {
                prevPage();
            }
        }

        if (event.key === 'Enter') {
            handleMovieClick(movies[selectedIndex]);
        }
        if (event.key === 'Escape') {
            setSelectedIndex(0);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, movies]);

    return (
        <div className="popular-movies-container">
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Movies (Page {page})</h1>
            <div className="filter-buttons">
                <button onClick={() => setCategory('popular')}>Popular</button>
                <button onClick={() => setCategory('airing-now')}>Airing Now</button>
                <button onClick={() => setCategory('favorites')}>My Favorites</button>
            </div>

            <div className="movie-list">
                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        className={`movie-card ${selectedIndex === index ? 'selected' : ''}`}
                        onClick={() => handleMovieClick(movie)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={category === 'airing-now' ? movie.name : movie.title}
                            className="movie-poster"
                        />
                        <h3 className="movie-title">
                            {category === 'airing-now' ? movie.name : movie.title}
                        </h3>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(movie);
                            }}
                            className="favorite-button"
                        >
                            {favorites.some((fav) => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                ))}
            </div>

            {category !== 'favorites' && (
                <div className="pagination">
                    <button onClick={prevPage} disabled={page === 1} className="page-button">
                        Previous
                    </button>
                    <button onClick={nextPage} className="page-button">
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PopularMovies;
