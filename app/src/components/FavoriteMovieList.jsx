import React from 'react';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';

function FavoriteMovieList({ movies, favoriteMovies, toggleFavorite }) {
    // Фильтруем только те фильмы, которые действительно существуют (не undefined)
    const validFavoriteMovies = movies.filter(movie => movie != null);

    if (!validFavoriteMovies || validFavoriteMovies.length === 0) {
        return (
            <Box textAlign="center" py={8}>
                <Text fontSize="lg" color="gray.500">
                    Вы пока не добавили фильмы в избранное
                </Text>
                <Text fontSize="sm" color="gray.400" mt={2}>
                    Добавьте фильмы в избранное на главной странице
                </Text>
            </Box>
        );
    }

    return (
        <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            rowGap={4}
            columnGap={4}
            p={4}
        >
            {validFavoriteMovies.map((movie) => (
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

export default FavoriteMovieList;
