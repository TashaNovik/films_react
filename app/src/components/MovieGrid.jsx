import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import MovieCard from './MovieCard';

function getMovies() {
    return [
        {
            "id": 1,
            "title": "Матрица",
            "posterUrl": 'src/assets/Matrix.png', // Замените на реальный путь или URL
            "genre": "Боевик",
            "duration": 136,
            "rating": 5 // Предположим, что закрашенная звезда - это рейтинг 5/5
        },
        {
            "id": 2,
            "title": "Безумный Макс",
            "posterUrl": 'src/assets/Mad_Max.png', // Замените на реальный путь или URL
            "genre": "Боевик",
            "duration": 88,
            "rating": 4 // Может быть другой рейтинг
        },
        {
            "id": 3,
            "title": "Джентльмены",
            "posterUrl": 'src/assets/Gentlemen.png', // Замените на реальный путь или URL
            "genre": "Драма", // Внимание: на скрине жанр "Драма", не "Комедия"
            "duration": 113,
            "rating": 4
        },
        {
            "id": 4,
            "title": "Отступники",
            "posterUrl": 'src/assets/Renegades.png', // Замените на реальный путь или URL
            "genre": "Триллер",
            "duration": 151,
            "rating": 5
        },
        {
            "id": 5,
            "title": "Гладиатор",
            "posterUrl": 'src/assets/Gladiator.png', // Замените на реальный путь или URL
            "genre": "Боевик",
            "duration": 155,
            "rating": 5
        },
        {
            "id": 6,
            "title": "Однажды в Голливиде",
            "posterUrl": 'src/assets/Once_in_HW.png', // Замените на реальный путь или URL
            "genre": "Драма",
            "duration": 161,
            "rating": 4
        },
        {
            "id": 7,
            "title": "Предложение",
            "posterUrl": 'src/assets/Purpose.png', // Замените на реальный путь или URL
            "genre": "Комедия",
            "duration": 108,
            "rating": 3 // Пример рейтинга
        },
        {
            "id": 8,
            "title": "Малышка на миллион",
            "posterUrl": 'src/assets/Million_baby.png', // Замените на реальный путь или URL
            "genre": "Драма",
            "duration": 132,
            "rating": 5
        },
        {
            "id": 9,
            "title": "Ларри Краун",
            "posterUrl": 'src/assets/Larry_Crown.png', // Замените на реальный путь или URL
            "genre": "Комедия",
            "duration": 98,
            "rating": 3
        }
    ]
}

function MovieGrid({ selectedGenres}) {
    // genres=['Боевик', 'Драма'];
    let movies = getMovies();
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
                <MovieCard key={movie.id} movieData={movie} />
            ))}
        </SimpleGrid>
    );
}

export default MovieGrid;