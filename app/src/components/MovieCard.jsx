import React, { useState } from 'react';
import {Box, Image, Badge, Icon, IconButton} from '@chakra-ui/react';
import { MdAccessTime } from "react-icons/md";
import { FaStar, FaRegStar } from 'react-icons/fa';





function GetGenreColor(genre) {
    switch (genre) {
        case "Боевик":
            return "red";
        case "Триллер":
            return "green";
        case "Комедия":
            return "blue";
        case "Драма":
            return "black";
        default:
            return "gray";
    }
}

function MovieCard(props) {
// 1. Состояние для отслеживания, выбрана ли звезда
    const [isFavorite, setIsFavorite] = useState(false);

    // 2. Обработчик клика для переключения состояния
    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    // 3. Определяем aria-label в зависимости от состояния
    const buttonAriaLabel = isFavorite ? "Убрать из избранного" : "Добавить в избранное";
    return (
        <Box borderRadius="md"
             borderWidth="1px"
             borderColor="border.disabled"
             color="fg.disabled">
            <Image src={props.movieData.posterUrl}/>

            {props.movieData.title}
            <Badge colorPalette={GetGenreColor(props.movieData.genre)} variant="subtle" borderRadius="full">
                {props.movieData.genre}
            </Badge>
            <Icon size="lg" color="black">
                <MdAccessTime/>
            </Icon>
            {props.movieData.duration} мин.
            <IconButton
                aria-label={buttonAriaLabel}
                onClick={handleToggleFavorite}
                variant="ghost"
                color="yellow.400"
                size="md"
                fontSize="20px"
            >
                {isFavorite ? <FaStar /> : <FaRegStar />}
            </IconButton>

        </Box>
    );
}

export default MovieCard;