import React from 'react';
import { Box, Image} from '@chakra-ui/react';

function MovieCard(props) {

    return (
        <Box borderRadius="md"
             borderWidth="1px"
             borderColor="border.disabled"
             color="fg.disabled"    >
            <Image src={props.movieData.posterUrl}/>

            {props.movieData.title}

        </Box>
    );
}

export default MovieCard;