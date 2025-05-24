import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import FavoriteMovieItem from './FavoriteMovieItem';

function FavoriteMovieList({ movies, toggleFavorite }) {
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
    }    return (
        <Box bg="white" overflow="hidden">
            <VStack spacing={0} align="stretch">
                {validFavoriteMovies.map((movie) => (
                    <FavoriteMovieItem 
                        key={movie.id} 
                        movieData={movie}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </VStack>
        </Box>
    );
}

export default FavoriteMovieList;
