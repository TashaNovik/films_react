import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Fieldset,
    Container,
    Field,
    Input,
    NativeSelect,
    For,
    Text,
    HStack,
    Textarea,
    Button,
    FileUpload,
    Flex,
    Icon,
    Box,
    Image,
    Grid,
    VStack
} from "@chakra-ui/react";
import CircleCheckbox from "./CircleCheckbox.jsx";
import { Heading } from '@chakra-ui/react';



const genres = [
    { label: 'Боевик', value: 'action', color: 'red.500' },
    { label: 'Триллер', value: 'thriller', color: 'green.500' },
    { label: 'Комедия', value: 'comedy', color: 'blue.500' },
    { label: 'Драма', value: 'drama', color: 'black.500' },
];



function AddMoviePage({ isEdit = false, movies = [], addMovie, updateMovie }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        duration: '',
        description: '',
        posterUrl: ''
    });// Загружаем данные фильма для редактирования
    useEffect(() => {
        if (isEdit && id && movies.length > 0) {
            const movie = movies.find(m => String(m.id) === String(id));
            if (movie) {
                setFormData({
                    title: movie.title || '',
                    genre: movie.genre || '',
                    duration: movie.duration || '',
                    description: movie.description || '',
                    posterUrl: movie.posterUrl || ''
                });
                setSelectedGenres(movie.genre ? [movie.genre] : []);
                if (movie.posterUrl) {
                    setPreviewUrl(movie.posterUrl);
                    // Получаем имя файла из URL
                    const parts = movie.posterUrl.split('/');
                    setFileName(parts[parts.length - 1]);
                    setSelectedFile(null); // Нет локального файла, только URL
                }
            }
        }
    }, [isEdit, id, movies]);

    // Cleanup effect для освобождения URL объектов
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleGenreChange = (value) => {
        setSelectedGenres((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };
    const handleFileChange = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setSelectedFile(file);
            setFileName(file.name);

            // Создаем URL для превью изображения
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

        }
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const createPosterUrl = (file) => {
        if (!file) return '';
        // Возвращаем URL для превью изображения
        return URL.createObjectURL(file);
    };

    const handleSubmit = () => {        // Валидация
        if (!formData.title.trim()) {
            alert('Пожалуйста, введите название фильма');
            return;
        }

        if (selectedGenres.length === 0) {
            alert('Пожалуйста, выберите жанр');
            return;
        }

        if (!formData.duration || formData.duration <= 0) {
            alert('Пожалуйста, введите корректную длительность фильма');
            return;
        }

        // Подготавливаем данные для сохранения
        const movieData = {
            title: formData.title.trim(),
            genre: genres.find(g => selectedGenres.includes(g.value))?.label || selectedGenres[0],
            duration: parseInt(formData.duration),
            description: formData.description.trim() || '',
            posterUrl: selectedFile ? createPosterUrl(selectedFile) : formData.posterUrl // <-- исправлено
        };
        try {
            if (isEdit && updateMovie) {
                updateMovie(id, movieData);
            } else if (addMovie) {
                addMovie(movieData);
            }

            // Очищаем превью URL если он был создан
            if (previewUrl && selectedFile) {
                URL.revokeObjectURL(previewUrl);
            }

            // Переходим на главную страницу
            navigate('/');
        } catch (error) {
            console.error('Ошибка при сохранении фильма:', error);
            alert('Произошла ошибка при сохранении фильма');
        }
    };
    return (
        <Container maxW="container.xl" py={8}>

            <Heading fontWeight="bold" fontSize="2xl" color="gray.800">
                {isEdit ? 'Редактировать фильм' : 'Добавить фильм'}
            </Heading>
            <Flex
                width="785px"
                height="731px"
                border="2px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={6}
                mt={4}
                mx="auto"
                flexDirection="column"
            >
                <Fieldset.Root flex="12" display="flex" flexDirection="column">
                    <Fieldset.Content flex="1" display="flex" flexDirection="column"><HStack spacing={3} align="center">
                        <label htmlFor="film-title" style={{ minWidth: 200 }}>Название фильма</label>
                        <Input
                            id="film-title"
                            name="name"
                            htmlSize={35}
                            width="auto"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                    </HStack>
                        <HStack spacing={3} align="center">
                            <label htmlFor="film-title" style={{ minWidth: 200 }}>Жанр</label>
                            {genres.map((genre) => (
                                <CircleCheckbox
                                    key={genre.value}
                                    isChecked={selectedGenres.includes(genre.value)}
                                    onChange={() => handleGenreChange(genre.value)}
                                    label={genre.label}
                                    borderColor={genre.color}
                                    id={`genre-${genre.value}`}
                                />
                            ))}
                        </HStack>
                        <HStack spacing={3} align="center">
                            <label htmlFor="film-duration" style={{ minWidth: 200 }} >Длительность</label>
                            <Input
                                id="film-duration"
                                name="duration"
                                htmlSize={6}
                                width="auto"
                                value={formData.duration}
                                onChange={(e) => handleInputChange('duration', e.target.value)}
                            />
                            мин.
                        </HStack>                    <HStack align="start" spacing={3}>
                            <label htmlFor="description" style={{ minWidth: 200 }} >Описание</label>
                            <Textarea
                                id="description"
                                name="description"
                                minH="120px"
                                width="400px"
                                resize="vertical"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </HStack>                        <HStack spacing={3} align="center" mt={4}>
                            <label style={{ minWidth: 200 }}>Загрузить фото</label>
                            <FileUpload.Root
                                maxFiles={1}
                                accept={{
                                    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
                                }}
                                onFileAccept={(details) => handleFileChange(details.files)}
                            >
                                <FileUpload.HiddenInput />
                                <HStack spacing={3} align="center">
                                    <FileUpload.Trigger asChild>
                                        <Button variant="outline" size="sm">
                                            Выбрать файл
                                        </Button>
                                    </FileUpload.Trigger>
                                    <FileUpload.ItemGroup>
                                        <FileUpload.Items padding={'6.5px'} />
                                    </FileUpload.ItemGroup>
                                </HStack>
                            </FileUpload.Root>
                        </HStack>
                        {/* Превью выбранного изображения */}
                        {/* {previewUrl && (
                            <HStack spacing={3} align="center" mt={4}>
                                <label style={{ minWidth: 200 }}>Превью:</label>
                                <Box>
                                    <Image
                                        src={previewUrl}
                                        alt="Превью постера"
                                        maxW="200px"
                                        maxH="200px"
                                        objectFit="cover"
                                        borderRadius="md"
                                        border="1px solid"
                                        borderColor="gray.300"
                                    />
                                    <Text fontSize="sm" color="gray.600" mt={2}>
                                        Файл: {fileName}
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        URL: {createPosterUrl(selectedFile)}
                                    </Text> 
                                </Box>
                            </HStack>
                        )} */}
                        <Flex justify="center" mt="auto" pt={6}>
                            <Button
                                bg="rgba(74, 97, 221, 0.7)"
                                color="white"
                                _hover={{ bg: 'rgba(74, 97, 221, 0.9)' }}
                                _active={{ bg: 'rgba(74, 97, 221, 1)' }}
                                onClick={handleSubmit}
                            >
                                {isEdit ? 'Сохранить' : 'Добавить фильм'}
                            </Button>
                        </Flex>
                    </Fieldset.Content>

                </Fieldset.Root>
            </Flex>
        </Container>
    )

}

export default AddMoviePage;