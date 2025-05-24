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

// Доступные изображения в папке assets
const availableImages = [
    'Gentlemen.png',
    'Gladiator.png',
    'Larry_Crown.png',
    'Mad_Max.png',
    'Matrix.png',
    'Million_baby.png',
    'Once_in_HW.png',
    'Purpose.png',
    'Renegades.png'
];

function AddMoviePage({ isEdit = false, movies = [], addMovie, updateMovie }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [imageSource, setImageSource] = useState('existing'); // 'existing' или 'upload'
    const [selectedExistingImage, setSelectedExistingImage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        duration: '',
        description: ''
    });    // Загружаем данные фильма для редактирования
    useEffect(() => {
        if (isEdit && id && movies.length > 0) {
            const movie = movies.find(m => m.id === parseInt(id));
            if (movie) {
                setFormData({
                    title: movie.title || '',
                    genre: movie.genre || '',
                    duration: movie.duration || '',
                    description: movie.description || ''
                });
                // Устанавливаем выбранный жанр
                const genreValue = genres.find(g => g.label === movie.genre)?.value;
                if (genreValue) {
                    setSelectedGenres([genreValue]);
                }
                // Проверяем, есть ли у фильма постер из существующих изображений
                if (movie.posterUrl) {
                    const imageName = movie.posterUrl.split('/').pop();
                    if (availableImages.includes(imageName)) {
                        setImageSource('existing');
                        setSelectedExistingImage(imageName);
                    }
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
    };    const handleFileChange = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setSelectedFile(file);
            setFileName(file.name);
            
            // Создаем URL для превью изображения
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            
            // Сбрасываем выбор существующего изображения
            setSelectedExistingImage('');
        }
    };

    const handleExistingImageSelect = (imageName) => {
        setSelectedExistingImage(imageName);
        // Сбрасываем загруженный файл
        setSelectedFile(null);
        setFileName('');
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl('');
        }
    };

    const handleImageSourceChange = (value) => {
        setImageSource(value);
        // Сбрасываем все выборы при смене источника
        if (value === 'existing') {
            setSelectedFile(null);
            setFileName('');
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl('');
            }
        } else {
            setSelectedExistingImage('');
        }
    };const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };    const createPosterUrl = (file) => {
        // Если выбрано существующее изображение
        if (imageSource === 'existing' && selectedExistingImage) {
            return `/src/assets/${selectedExistingImage}`;
        }
        
        // Если загружен новый файл
        if (file) {
            const fileExtension = file.name.split('.').pop();
            const fileName = formData.title
                .replace(/[^a-zA-Zа-яА-Я0-9]/g, '_') // заменяем специальные символы на подчеркивания
                .replace(/_{2,}/g, '_') // убираем множественные подчеркивания
                .toLowerCase();
            
            return `/src/assets/${fileName}.${fileExtension}`;
        }
        
        // Дефолтный постер
        return '/src/assets/react.svg';
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
            posterUrl: createPosterUrl(selectedFile)
        };

        try {
            if (isEdit && updateMovie) {
                updateMovie(id, movieData);
                if (imageSource === 'upload' && selectedFile) {
                    alert(`Фильм успешно обновлен!\nПримечание: Для отображения изображения поместите файл ${selectedFile.name} в папку src/assets/`);
                } else {
                    alert('Фильм успешно обновлен!');
                }
            } else if (addMovie) {
                addMovie(movieData);
                if (imageSource === 'upload' && selectedFile) {
                    alert(`Фильм успешно добавлен!\nПримечание: Для отображения изображения поместите файл ${selectedFile.name} в папку src/assets/`);
                } else {
                    alert('Фильм успешно добавлен!');
                }
            }
            
            // Очищаем превью URL если он был создан
            if (previewUrl) {
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
                
    {/* <Fieldset.Root size="lg" disabled>
      <Field.Root>
        <HStack>
        <Field.Label width={40}>Street address</Field.Label>
        <Input name="address" /></HStack>
      </Field.Root>
      <Field.Root>
        <HStack>
        <Field.Label>Country</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field name="country">
            <For each={["United Kingdom", "Canada", "United States"]}>
              {(item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )}
            </For>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        </HStack>
      </Field.Root>
    </Fieldset.Root> */}
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
                            <label htmlFor="film-duration"  style={{ minWidth: 200 }} >Длительность</label>
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
                            <label htmlFor="description"  style={{ minWidth: 200 }} >Описание</label>
                            <Textarea
                                id="description"
                                name="description"
                                minH="120px"
                                width="400px"
                                resize="vertical"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </HStack>                        <VStack align="start" spacing={4} mt={4}>
                            <HStack spacing={3} align="center">
                                <label style={{ minWidth: 200 }}>Выбор изображения</label>
                                <HStack spacing={3}>
                                    <Button
                                        size="sm"
                                        variant={imageSource === 'existing' ? 'solid' : 'outline'}
                                        colorScheme={imageSource === 'existing' ? 'blue' : 'gray'}
                                        onClick={() => handleImageSourceChange('existing')}
                                    >
                                        Из доступных
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={imageSource === 'upload' ? 'solid' : 'outline'}
                                        colorScheme={imageSource === 'upload' ? 'blue' : 'gray'}
                                        onClick={() => handleImageSourceChange('upload')}
                                    >
                                        Загрузить новое
                                    </Button>
                                </HStack>
                            </HStack>

                            {imageSource === 'existing' && (
                                <VStack align="start" spacing={3} w="100%">
                                    <HStack spacing={3} align="center">
                                        <label style={{ minWidth: 200 }}>Доступные изображения</label>
                                    </HStack>
                                    <Box ml="200px" w="100%">
                                        <Grid templateColumns="repeat(auto-fill, minmax(120px, 1fr))" gap={3} maxW="500px">
                                            {availableImages.map((imageName) => (
                                                <Box
                                                    key={imageName}
                                                    border="2px solid"
                                                    borderColor={selectedExistingImage === imageName ? "blue.500" : "gray.300"}
                                                    borderRadius="md"
                                                    p={2}
                                                    cursor="pointer"
                                                    _hover={{ borderColor: "blue.400" }}
                                                    onClick={() => handleExistingImageSelect(imageName)}
                                                >
                                                    <Image
                                                        src={`/src/assets/${imageName}`}
                                                        alt={imageName}
                                                        w="100%"
                                                        h="80px"
                                                        objectFit="cover"
                                                        borderRadius="sm"
                                                    />
                                                    <Text fontSize="xs" textAlign="center" mt={1} noOfLines={1}>
                                                        {imageName}
                                                    </Text>
                                                </Box>
                                            ))}
                                        </Grid>
                                    </Box>
                                </VStack>
                            )}

                            {imageSource === 'upload' && (
                                <HStack spacing={3} align="center">
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
                            )}
                        </VStack>                        {/* Превью выбранного изображения */}
                        {(previewUrl || selectedExistingImage) && (
                            <HStack spacing={3} align="center" mt={4}>
                                <label style={{ minWidth: 200 }}>Превью:</label>
                                <Box>
                                    <Image
                                        src={previewUrl || `/src/assets/${selectedExistingImage}`}
                                        alt="Превью постера"
                                        maxW="200px"
                                        maxH="200px"
                                        objectFit="cover"
                                        borderRadius="md"
                                        border="1px solid"
                                        borderColor="gray.300"
                                    />
                                    {selectedFile && (
                                        <>
                                            <Text fontSize="sm" color="gray.600" mt={2}>
                                                Файл: {fileName}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                URL: {createPosterUrl(selectedFile)}
                                            </Text>
                                        </>
                                    )}
                                    {selectedExistingImage && (
                                        <>
                                            <Text fontSize="sm" color="gray.600" mt={2}>
                                                Изображение: {selectedExistingImage}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                URL: /src/assets/{selectedExistingImage}
                                            </Text>
                                        </>
                                    )}
                                </Box>
                            </HStack>
                        )}
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