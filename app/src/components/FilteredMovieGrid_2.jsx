import React, { useState, useMemo } from 'react';
import { Box, VStack, HStack, SimpleGrid, Text, Checkbox} from '@chakra-ui/react';
import MovieCard from './MovieCard';


function FilteredMovieGrid_2({ allMovies, availableGenres }) {

    // Состояние для хранения выбранных жанров (массив строк)
    const [selectedGenres, setSelectedGenres] = useState([]);

    // Обработчик клика по чекбоксу жанра
    const handleGenreChange = (event) => {
        const genre = event.target.value;
        const isChecked = event.target.checked;

        // Обновляем состояние selectedGenres
        setSelectedGenres(prevSelected =>
            isChecked
                ? [...prevSelected, genre] // Если отметили - добавляем в массив
                : prevSelected.filter(g => g !== genre) // Если сняли - удаляем из массива
        );
    };

    const filteredMovies = useMemo(() => {
        if (selectedGenres.length === 0) {
            return allMovies;
        }
        return allMovies.filter(movie =>
            selectedGenres.includes(movie.genre)
        );
    }, [allMovies, selectedGenres]);

    return (

        <VStack spacing={6} align="stretch">

            {/* Фильтры (чекбоксы) */}
            {/* HStack располагает чекбоксы в ряд */}
            <HStack spacing={4} wrap="wrap" justify="center">
                {/* Проходим по массиву доступных жанров и создаем чекбокс для каждого */}
                {availableGenres.map((genre) => (
                    <Checkbox
                        key={genre}
                        value={genre}
                        isChecked={selectedGenres.includes(genre)} // Отмечен, если жанр в selectedGenres
                        onChange={handleGenreChange} // Назначаем обработчик
                    >
                        {genre} {/* Текст рядом с чекбоксом */}
                    </Checkbox>
                ))}
            </HStack>

            {/* Сетка фильмов */}
            {/* Проверяем, есть ли фильмы после фильтрации */}
            {filteredMovies.length > 0 ? (
                // Если есть - отображаем сетку
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                    {/* Проходим по отфильтрованному массиву и рендерим карточку для каждого фильма */}
                    {filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movieData={movie} />
                    ))}
                </SimpleGrid>
            ) : (
                // Если после фильтрации фильмов не осталось - показываем сообщение
                <Text textAlign="center" py={10} color="gray.500">
                    Фильмы не найдены.
                </Text>
            )}

        </VStack>
    );
}

export default FilteredMovieGrid_2;