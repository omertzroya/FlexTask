import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PopularMovies from './components/PopularMovies';
import MovieDetails from './components/MovieDetails'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PopularMovies />} />
                <Route path="/movie/:id" element={<MovieDetails type="movie" />} />
                <Route path="/tv/:id" element={<MovieDetails type="tv" />} />
            </Routes>
        </Router>
    );
}

export default App;
