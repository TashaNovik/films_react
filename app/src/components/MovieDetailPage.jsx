import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Image,
    Text,
    Heading,
    Button,
    Flex,
    VStack,
    HStack,
    Badge,
    Icon,
    IconButton
} from '@chakra-ui/react';
import { MdAccessTime, MdArrowBack } from 'react-icons/md';
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

function MovieDetailPage({ movies, favoriteMovies, toggleFavorite, deleteMovie }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const movie = movies.find(m => m.id === parseInt(id));
    
    const isFavorite = favoriteMovies?.has(movie?.id) || false;
    
    const handleToggleFavorite = () => {
        if (movie && toggleFavorite) {
            toggleFavorite(movie.id);
        }
    };

    const handleDelete = () => {
        if (deleteMovie) {
            deleteMovie(movie.id);
        }
        navigate('/');
    };

    if (!movie) {
        return (
            <Container maxW="container.xl" py={8}>
                <Box textAlign="center">
                    <Text fontSize="xl" color="gray.500">Фильм не найден</Text>
                    <Button mt={4} onClick={() => navigate('/')}>
                        Вернуться на главную
                    </Button>
                </Box>
            </Container>
        );
    } return (
        <Container maxW="container.xl" py={8}>
            <Flex
                direction={{ base: "column", md: "row" }}
                gap={8}
                align="start"
            >{/* Постер фильма */}
                            <Box flexShrink={0}>
                    <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        width="480px"
                        height="480px"
                        maxW="480px"
                        maxH="480px"
                        borderRadius="lg"
                        objectFit="cover"
                    />
                </Box>{/* Информация о фильме */}
                <VStack align="start" flex={1} spacing={6}>                    {
                /* Название и звезда избранного */}
                    <HStack spacing={3} align="center" justifyContent="space-between" width="100%">
                        <Heading size="2xl" color="gray.800" fontWeight="bold">
                            {movie.title}
                        </Heading>
                        <Box 
                            as="button"
                            cursor="pointer"
                            p={2}
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            onClick={handleToggleFavorite}
                        >
                            {isFavorite ? (
                                <FaStar size="24px" color="#F9A62B" />
                            ) : (
                                <FaRegStar size="24px" color="#F9A62B" />
                            )}
                        </Box>
                    </HStack>

                    {/* Жанр, длительность  */}
                    <HStack spacing={4} wrap="wrap" gap={7}>
                        <Badge
                            colorPalette={GetGenreColor(movie.genre)}
                            variant="subtle"
                            borderRadius="full"
                            px={3}
                            py={1}


                        >
                            {movie.genre}
                        </Badge>

                        <Flex alignItems="center" gap={1} color="gray.600" padding={2}>
                            <Icon as={MdAccessTime} />
                            <Text>{movie.duration} минут</Text>
                        </Flex>
                    </HStack>

                    {/* Описание */}
                    <Box>

                        <Text
                            fontSize="md"
                            lineHeight="tall"
                            color="black.600"
                            fontFamily={"Inter, sans-serif"}
                        >
                            {movie.description || "Описание фильма пока не добавлено."}
                        </Text>
                    </Box>
                </VStack>
            </Flex>            
            <Flex >
                <Button
                    ml="auto"
                    mt={20}
                    color="blue.600"
                    variant="outline"
                    _hover={{ bg: "#DEE2F2" }}
                    mr={10}
                    onClick={() => navigate(`/edit/${movie.id}`)}
                >
                    Редактировать
                </Button>
                <Button
                    mt={20}
                    color="blue.600"
                    variant="outline"
                    _hover={{ bg: "#DEE2F2" }}
                    onClick={handleDelete}
                >
                    Удалить
                </Button>
            </Flex>

        </Container>
    );
}

export default MovieDetailPage;
