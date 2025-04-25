// /src/components/AddFilmFormLayout.jsx
// Этот компонент фокусируется только на верстке (layout) формы

import React from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Radio,
    HStack, // Для горизонтального расположения
    Textarea,
    Button,
    VStack, // Для общего вертикального расположения
    Grid,   // Для выравнивания лейблов и полей
    GridItem,
    Text    // Для текста "мин."
} from '@chakra-ui/react';

// Доступные жанры для отображения радио-кнопок
const availableGenres = [
    { label: 'Боевик', value: 'action', colorScheme: 'orange' },
    { label: 'Триллер', value: 'thriller', colorScheme: 'green' },
    { label: 'Комедия', value: 'comedy', colorScheme: 'blue' },
    { label: 'Драма', value: 'drama', colorScheme: 'gray' }, // Используем gray для стандартного вида
];

// Стили для круглых радио-кнопок (применяем к каждой)
const circularRadioSx = {
    '.chakra-radio__control': { // Целимся во внутренний кружок
        borderRadius: 'full',   // Делаем его круглым
        // Можно добавить border, если нужно, цвет возьмется из colorScheme
        // borderWidth: '1px',
    },
};

function AddFilmFormLayout() {
    return (
        <Box maxWidth="container.md" mx="auto" p={6}> {/* Центрируем и ограничиваем ширину */}
            <Heading mb={8} textAlign="center">Добавить фильм</Heading> {/* Заголовок страницы */}

            {/* Контейнер формы с рамкой и тенью */}
            <Box
                p={8} // Увеличим внутренние отступы
                borderWidth={1}
                borderRadius="xl" // Более скругленные углы
                boxShadow="lg"     // Более заметная тень
                bg="white"
            >
                {/* VStack для вертикального расположения секций формы */}
                <VStack spacing={6} align="stretch"> {/* Увеличим отступ между секциями */}

                    {/* Используем Grid для выравнивания лейблов и полей */}
                    {/* templateColumns: лейбл 150px, поле - оставшееся место */}
                    <Grid templateColumns={{ base: "1fr", md: "150px 1fr" }} gap={5} alignItems="center">

                        {/* --- Название фильма --- */}
                        <GridItem>
                            {/* Убираем стандартный margin у FormLabel для точного выравнивания в Grid */}
                            <FormLabel htmlFor="film-title" m={0}>Название фильма</FormLabel>
                        </GridItem>
                        <GridItem>
                            {/* FormControl связывает Label и Input */}
                            <FormControl id="film-title">
                                <Input placeholder="Введите название" />
                            </FormControl>
                        </GridItem>

                        {/* --- Жанр --- */}
                        <GridItem>
                            <FormLabel m={0}>Жанр</FormLabel> {/* Не нужен htmlFor, т.к. связан с FormControl/fieldset */}
                        </GridItem>
                        <GridItem>
                            {/* Используем fieldset для семантической группировки радио-кнопок */}
                            <FormControl as="fieldset">
                                {/* RadioGroup управляет выбором */}
                                <RadioGroup defaultValue="action"> {/* Пример значения по умолчанию */}
                                    {/* HStack для горизонтального расположения радио-кнопок */}
                                    <HStack spacing={4} wrap="wrap">
                                        {availableGenres.map((genre) => (
                                            <Radio
                                                key={genre.value}
                                                value={genre.value}
                                                colorScheme={genre.colorScheme} // Задаем цвет для активного состояния
                                                sx={circularRadioSx} // Применяем стили для круглой формы
                                            >
                                                {genre.label}
                                            </Radio>
                                        ))}
                                    </HStack>
                                </RadioGroup>
                            </FormControl>
                        </GridItem>

                        {/* --- Длительность --- */}
                        <GridItem>
                            <FormLabel htmlFor="film-duration" m={0}>Длительность</FormLabel>
                        </GridItem>
                        <GridItem>
                            <FormControl id="film-duration">
                                {/* HStack для инпута и текста "мин." */}
                                <HStack spacing={2}>
                                    <Input
                                        placeholder="120"
                                        width="100px" // Ограничиваем ширину поля
                                        type="number" // Используем number для числового ввода
                                    />
                                    <Text color="gray.600">мин.</Text>
                                </HStack>
                            </FormControl>
                        </GridItem>

                        {/* --- Описание --- */}
                        {/* Выравниваем лейбл по верху для многострочного поля */}
                        <GridItem alignSelf="start">
                            <FormLabel htmlFor="film-description" mt={1}>Описание</FormLabel>
                        </GridItem>
                        <GridItem>
                            <FormControl id="film-description">
                                <Textarea
                                    placeholder="Добавьте описание фильма..."
                                    rows={5} // Увеличим количество строк
                                />
                            </FormControl>
                        </GridItem>

                        {/* --- Загрузка фото --- */}
                        <GridItem>
                            <FormLabel htmlFor="film-poster" mt={1}>Загрузить фото</FormLabel>
                        </GridItem>
                        <GridItem>
                            {/* Просто верстаем кнопку, логика загрузки здесь не нужна */}
                            <FormControl id="film-poster">
                                <Button variant="outline"> {/* Кнопка с обводкой */}
                                    Выбрать файл
                                </Button>
                                {/* Здесь можно добавить Text для отображения имени файла, если нужно */}
                                {/* <Text ml={3} as="span" fontSize="sm" color="gray.500">poster.jpg</Text> */}
                            </FormControl>
                        </GridItem>

                    </Grid> {/* Конец Grid */}

                    {/* --- Кнопка Добавить --- */}
                    <Button
                        colorScheme="purple" // Используем другой цвет для акцента
                        size="lg" // Кнопка побольше
                        alignSelf={{ base: "stretch", md: "flex-start" }} // Растягиваем на мобильных, слева на десктопе
                        mt={4} // Добавим отступ сверху
                    >
                        Добавить фильм
                    </Button>

                </VStack> {/* Конец VStack */}
            </Box> {/* Конец контейнера формы */}
        </Box> // Конец общего контейнера страницы
    );
}

export default AddFilmFormLayout;