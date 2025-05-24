import React, {useState} from 'react';
import {Box, Container, Heading, HStack, Spacer} from '@chakra-ui/react';
import {Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import {Link as ChakraLink} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';


function Header() {
    const [activeLink, setActiveLink] = useState('Все фильмы');


    return (
        <Box as="header" bg="white" boxShadow="sm"> {/* Белый фон и легкая тень */}
            <Container maxW="container.xl" py={3}> {/* Ограничиваем ширину и добавляем верт. отступы */}
                <HStack spacing={10}> {/* Горизонтальный стек с отступами */}
                    {/* Навигация */}
                    <HStack as="nav" spacing={6}>
                        <ChakraLink as={RouterLink}
                                    to="/"
                                    href="#"
                                    fontWeight={activeLink === 'Все фильмы' ? 'semibold' : 'medium'} // Жирный для активной
                                    color={activeLink === 'Все фильмы' ? 'blue.600' : 'gray.700'} // Синий для активной
                                    _hover={{color: 'blue.500'}} // Цвет при наведении
                                    onClick={() => {
                                        setActiveLink('Все фильмы')
                                    }}
                        >
                            Все фильмы
                        </ChakraLink>
                        <ChakraLink as={RouterLink}
                                    to="/favorites"
                                    href="#"
                                    fontWeight={activeLink === 'Избранное' ? 'semibold' : 'medium'}
                                    color={activeLink === 'Избранное' ? 'blue.600' : 'gray.700'}
                                    _hover={{color: 'blue.500'}}
                                    onClick={() => {
                                        setActiveLink('Избранное')
                                    }}
                        >
                            Избранное
                        </ChakraLink>
                        <ChakraLink as={RouterLink}
                                    to="/add"
                                    href="#"
                                    fontWeight={activeLink === 'Добавить фильм' ? 'semibold' : 'medium'}
                                    color={activeLink === 'Добавить фильм' ? 'blue.600' : 'gray.700'}
                                    _hover={{color: 'blue.500'}}
                                    onClick={() => {
                                        setActiveLink('Добавить фильм')
                                    }}
                        >
                            Добавить фильм
                        </ChakraLink>
                    </HStack>
                </HStack>
            </Container>
        </Box>
    );
}

export default Header;