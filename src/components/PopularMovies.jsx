import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setFavorites } from '../redux/actions/popularMoviesActions';
import { useNavigate } from 'react-router-dom';
import './PopularMovies.css';

const PopularMovies = () => {
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('popular');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector((state) => state.popularMovies.movies);
    const favorites = useSelector((state) => state.popularMovies.favorites);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        dispatch(setFavorites(storedFavorites));
    }, [dispatch]);

    useEffect(() => {
        setPage(1);
    }, [category]);

    useEffect(() => {
        dispatch(fetchMovies(category, page, favorites));
    }, [category, page, favorites, dispatch]);

    const nextPage = () => setPage((prevPage) => prevPage + 1);
    const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

    const toggleFavorite = (movie) => {
        let updatedFavorites;
        if (favorites.some((fav) => fav.id === movie.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
        } else {
            updatedFavorites = [...favorites, movie];
        }
        dispatch(setFavorites(updatedFavorites));
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
