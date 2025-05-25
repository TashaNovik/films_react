import {Box, Container} from '@chakra-ui/react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MovieGrid from "./components/MovieGrid.jsx";
import {useState} from "react";
import { Routes, Route, Link, BrowserRouter  } from 'react-router-dom';
import AddMoviePage from "./components/AddMoviePage.jsx";
import {Heading} from "@chakra-ui/react";
import FavoriteMovieList from "./components/FavoriteMovieList.jsx";
import MovieDetailPage from "./components/MovieDetailPage.jsx";
import { moviesData } from './data/moviesData';


function App() {
    const [movies, setMovies] = useState(moviesData);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState(new Set());    const toggleFavorite = (movieId) => {
        setFavoriteMovies(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(movieId)) {
                newFavorites.delete(movieId);
            } else {
                newFavorites.add(movieId);
            }
            return newFavorites;
        });
    };

    const addMovie = (movieData) => {
        const newMovie = {
            ...movieData,
            id: Math.max(...movies.map(m => m.id)) + 1,
            posterUrl: movieData.posterUrl || '/src/assets/react.svg', // дефолтный постер
            rating: 0
        };
        setMovies(prev => [...prev, newMovie]);
    };
    const deleteMovie = (movieId) => {
        setMovies(prev => prev.filter(movie => movie.id !== movieId));
    };

    const updateMovie = (movieId, movieData) => {
        setMovies(prev => prev.map(movie => 
            movie.id === parseInt(movieId) 
                ? { ...movie, ...movieData }
                : movie
        ));
    };return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Header/>
            <Box flex="1">
                <Routes>
                    <Route path="/" element={
                        <Container maxW="container.xl" py={8}>
                            {/* 👇 Добавьте FilterBar здесь */}
                            <FilterBar selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
                            <Box as="main">
                                <MovieGrid 
                                    movies={movies}
                                    selectedGenres={selectedGenres}
                                    favoriteMovies={favoriteMovies}
                                    toggleFavorite={toggleFavorite}
                                />
                            </Box>
                        </Container>
                    } />
                    <Route path="/favorites" element={
                        <Container maxW="container.xl" py={8}>
                            <Heading fontWeight="bold" fontSize="2xl" color="gray.800">
                                            Избранное
                                        </Heading>                        <FavoriteMovieList
                                movies={Array.from(favoriteMovies).map(id => movies.find(movie => movie.id === id)).filter(Boolean)}
                                toggleFavorite={toggleFavorite}
                            />
                        </Container>                    } />                <Route path="/add" element={<AddMoviePage addMovie={addMovie} />} />
                    <Route path="/edit/:id" element={<AddMoviePage isEdit={true} movies={movies} updateMovie={updateMovie} />} />
                    <Route path="/movie/:id" element={<MovieDetailPage movies={movies} favoriteMovies={favoriteMovies} toggleFavorite={toggleFavorite} deleteMovie={deleteMovie} />} />
                </Routes>
            </Box>

            {/* Footer - всегда внизу */}
            <Box as="footer" bg="black" color="white" p={8} mt="auto">
                Фильмограф
            </Box>
        </Box>
    )
}

export default App