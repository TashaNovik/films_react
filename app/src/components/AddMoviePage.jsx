import React, {useState} from 'react';
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
    Flex, Icon
} from "@chakra-ui/react";
import CircleCheckbox from "./CircleCheckbox.jsx";
import {FiFile} from "react-icons/fi";

const genres = [
    {label: 'Боевик', value: 'action', color: 'red.500'},
    {label: 'Триллер', value: 'thriller', color: 'green.500'},
    {label: 'Комедия', value: 'comedy', color: 'blue.500'},
    {label: 'Драма', value: 'drama', color: 'black.500'},
];

function AddMoviePage() {
    const [fileName, setFileName] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleGenreChange = (value) => {
        setSelectedGenres((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };


    return (
        <Container maxW="container.xl" py={8}>
            <Text as='b'>
                <label>Добавить фильм</label>
            </Text>
            <Fieldset.Root borderRadius="md"
                           borderWidth="1px"
                           borderColor="border.disabled"
                           color="fg.disabled">
                <Fieldset.Content>
                    <HStack spacing={3} align="center">
                        <label htmlFor="film-title">Название фильма</label>
                        <Input id="film-title" name="name" htmlSize={35} width="auto"/>
                    </HStack>

                    <HStack spacing={3} align="center">
                        <label htmlFor="film-title">Жанр</label>
                        {genres.map((genre) => (
                            <CircleCheckbox
                                key={genre.value}
                                checked={selectedGenres.includes(genre.value)}
                                onChange={() => handleGenreChange(genre.value)}
                                label={genre.label}
                                color={genre.color}
                            />
                        ))}
                    </HStack>

                    <HStack spacing={3} align="center">
                        <label htmlFor="film-title">Длительность</label>
                        <Input id="film-title" name="name" htmlSize={10} width="auto"/>
                        мин.
                    </HStack>

                    <HStack align="start" spacing={3}>
                        <label htmlFor="description">Описание</label>
                        <Textarea
                            id="description"
                            name="description"
                            minH="120px"
                            width="400px" // или 100% если нужно растянуть
                            resize="vertical"

                        />
                    </HStack>

                    <HStack spacing={3} align="center" mt={4}>
                        <label>Загрузить фото</label>
                        <Button as="label" variant="outline" cursor="pointer">
                            Выбрать файл
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        {fileName && (
                            <Button
                                variant="ghost"
                                leftIcon={<Icon as={FiFile} />}
                                isDisabled
                                px={3}
                                fontWeight="normal"
                                color="gray.700"
                                bg="gray.50"
                                _hover={{ bg: "gray.100" }}
                            >
                                {fileName}
                            </Button>
                        )}
                    </HStack>

                    <Flex minH="100vh" align="center" justify="center">
                        <Button
                            bg="rgba(74, 97, 221, 0.7)"
                            color="white"
                            _hover={{bg: 'rgba(74, 97, 221, 0.9)'}} // чуть насыщеннее при наведении
                            _active={{bg: 'rgba(74, 97, 221, 1)'}}  // полностью насыщенный при клике

                        >
                            Добавить фильм
                        </Button>
                    </Flex>
                </Fieldset.Content>

            </Fieldset.Root>
        </Container>
    )

}

export default AddMoviePage;