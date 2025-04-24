import React from 'react';
import { Box, Container, Heading, HStack, Link, Spacer } from '@chakra-ui/react';

function Header() {
    // В реальном приложении активная ссылка будет определяться роутером
    const activeLink = "Все фильмы"; // Просто для примера

    return (
        <Box as="header" bg="white" boxShadow="sm"> {/* Белый фон и легкая тень */}
            <Container maxW="container.xl" py={3}> {/* Ограничиваем ширину и добавляем верт. отступы */}
                <HStack spacing={10}> {/* Горизонтальный стек с отступами */}
                    {/* Заголовок "Главная" */}
                    <Heading as="h1" size="md" color="gray.500" fontWeight="normal">
                        Главная
                    </Heading>

                    {/* Навигация */}
                    <HStack as="nav" spacing={6}>
                        <Link
                            href="#"
                            fontWeight={activeLink === 'Все фильмы' ? 'semibold' : 'medium'} // Жирный для активной
                            color={activeLink === 'Все фильмы' ? 'blue.600' : 'gray.700'} // Синий для активной
                            _hover={{ color: 'blue.500' }} // Цвет при наведении
                        >
                            Все фильмы
                        </Link>
                        <Link
                            href="#"
                            fontWeight={activeLink === 'Избранное' ? 'semibold' : 'medium'}
                            color={activeLink === 'Избранное' ? 'blue.600' : 'gray.700'}
                            _hover={{ color: 'blue.500' }}
                        >
                            Избранное
                        </Link>
                        <Link
                            href="#"
                            fontWeight={activeLink === 'Добавить фильм' ? 'semibold' : 'medium'}
                            color={activeLink === 'Добавить фильм' ? 'blue.600' : 'gray.700'}
                            _hover={{ color: 'blue.500' }}
                        >
                            Добавить фильм
                        </Link>
                    </HStack>

                    {/* Spacer можно использовать для расталкивания элементов, если нужно */}
                    {/* <Spacer /> */}
                </HStack>
            </Container>
        </Box>
    );
}

export default Header;