import React from 'react';
import {Box, Image, Badge, Icon, IconButton, Text, Flex} from '@chakra-ui/react';
import {MdAccessTime} from "react-icons/md";
import {FaStar, FaRegStar} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


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
    const { movieData, isFavorite, toggleFavorite } = props;
    const navigate = useNavigate();

    // Обработчик клика для переключения состояния
    const handleToggleFavorite = () => {
        toggleFavorite(movieData.id);
    };

    // Обработчик клика по названию фильма
    const handleTitleClick = () => {
        navigate(`/movie/${movieData.id}`);
    };

    // Определяем aria-label в зависимости от состояния
    const buttonAriaLabel = isFavorite ? "Убрать из избранного" : "Добавить в избранное";
    return (

        <Box borderRadius="md"
             borderWidth="1px"
             borderColor="border.disabled"
             color="fg.disabled">            <
                Image src={movieData.posterUrl}
                   borderRadius="md"
                   objectFit="cover"
                   width="100%"
                   aspectRatio={16 / 9}
            />            <Text
                fontWeight="bold"
                fontSize="lg"
                lineHeight="tight"
                isTruncated
                mb={3}
                ml={4}
                mt={4}
                cursor="pointer"
                color="blue.600"
                _hover={{ color: "blue.800", textDecoration: "underline" }}
                onClick={handleTitleClick}
            >{movieData.title}
            </Text>

            <Flex
                alignItems="center"
            justifyContent="space-between">                
            <Badge colorPalette={GetGenreColor(movieData.genre)} variant="subtle" borderRadius="full" ml={4}>
                    {movieData.genre}
                </Badge>
                <Flex
                gap={3}>
                    <Icon size="lg" color="black">
                        <MdAccessTime/>
                    </Icon>
                    {movieData.duration} мин.
                </Flex>
                <IconButton
                    aria-label={buttonAriaLabel}
                    onClick={handleToggleFavorite}
                    variant="ghost"
                    color="yellow.400"
                    size="md"
                    fontSize="20px"
                    mr={4}
                >
                            {isFavorite ? (
                                <FaStar size="24px" color="#F9A62B" />
                            ) : (
                                <FaRegStar size="24px" color="#F9A62B" />
                            )}
                </IconButton>
            </Flex>
        </Box>
    );
}

export default MovieCard;