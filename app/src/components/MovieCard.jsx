import React from 'react';
import {Box, Image, Badge, Icon} from '@chakra-ui/react';
import { MdAccessTime } from "react-icons/md";



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

        </Box>
    );
}

export default MovieCard;