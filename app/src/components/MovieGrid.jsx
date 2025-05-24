import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import MovieCard from './MovieCard';

function MovieGrid({ movies, selectedGenres, favoriteMovies, toggleFavorite }) {
    const filteredMovies = selectedGenres.length > 0
        ? movies.filter(movie => selectedGenres.includes(movie.genre))
        : movies;


    if (!filteredMovies || filteredMovies.length === 0) {
        return <Box>Нет фильмов для отображения.</Box>;
    }

    return (

        <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            rowGap={4}
            columnGap={4}
            p={4}
        >            
            {filteredMovies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movieData={movie}
                    isFavorite={favoriteMovies.has(movie.id)}
                    toggleFavorite={toggleFavorite}
                />
            ))}
        </SimpleGrid>
    );
}

export default MovieGrid;