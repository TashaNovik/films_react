import React from 'react';
import { Box, Image, Text, Flex, IconButton, Separator, VStack  } from '@chakra-ui/react';
import { MdAccessTime, MdDelete } from 'react-icons/md';

function FavoriteMovieItem({ movieData, toggleFavorite }) {
    const handleRemoveFromFavorites = () => {
        toggleFavorite(movieData.id);
    };

    return (
        <Box>
            <Flex
                alignItems="center"
                py={4}
                px={2}
                gap={4}
            >
                {/* Круглое фото постера */}
                <Image 
                    src={movieData.posterUrl}
                    alt={movieData.title}
                    boxSize="60px"
                    borderRadius="full"
                    objectFit="cover"
                    flexShrink={0}
                />

                {/* Название фильма */}
                <VStack ml="6">
                     <Text
                        fontFamily={"Inter, sans-serif"}
                        fontSize="sm"
                        flex={1}
                        color={"black"}
                        mr="auto"
                    
                    >
                        {movieData.title}
                    </Text>

                    {/* Длительность с иконкой */}
                    <Flex
                        alignItems="center"
                        gap={1}
                        fontSize="sm"
                        mr="auto"
                        mt="2.5"
                    >
                        <MdAccessTime size="16" />
                        <Text>{movieData.duration} мин.</Text>
                    </Flex>
                </VStack>
                {/* Кнопка удалить */}
                <IconButton
                    aria-label="Удалить из избранного"
                    icon={<MdDelete />}
                    onClick={handleRemoveFromFavorites}
                    variant="ghost"
                    colorScheme="red"
                    color="gray.400"
                    size="sm"
                    ml="auto"
                    _hover={{ color: "black"}}
                >
                    Удалить
                </IconButton>
            </Flex>
            
            {/* Серая разделительная линия */}
            <Separator  borderColor="#EEEEEE" />
        </Box>
    );
}

export default FavoriteMovieItem;
