import React, {useState} from 'react';
import {Flex, Heading, Spacer, HStack} from '@chakra-ui/react';
import CircleCheckbox from "./CircleCheckbox.jsx";

function FilterBar( {selectedGenres, setSelectedGenres} ) {

    return (
        <Flex
            alignItems="center"
            width="100%" p={4}>
            <Heading fontWeight="bold" fontSize="2xl" color="gray.800">
                Фильмы
            </Heading>
            <Spacer/>
            <HStack spacing={4}>
                <CircleCheckbox label="Боевик" colorPalette="red" borderColor="red"
                                isChecked={selectedGenres.includes('Боевик')}
                                onChange={e => {
                                    if (e.target.checked) {
                                        setSelectedGenres([...selectedGenres, 'Боевик']);
                                    } else {
                                        setSelectedGenres(selectedGenres.filter(g => g !== 'Боевик'));
                                    }
                                }}>
                </CircleCheckbox>

                <CircleCheckbox label="Триллер" colorPalette="green" borderColor="green"
                                isChecked={selectedGenres.includes('Триллер')}
                                onChange={e => {
                                    if (e.target.checked) {
                                        setSelectedGenres([...selectedGenres, 'Триллер']);
                                    } else {
                                        setSelectedGenres(selectedGenres.filter(g => g !== 'Триллер'));
                                    }
                                }}>
                </CircleCheckbox>

                <CircleCheckbox label="Комедия" colorPalette="blue" borderColor="blue"
                                isChecked={selectedGenres.includes('Комедия')}
                                onChange={e => {
                                    if (e.target.checked) {
                                        setSelectedGenres([...selectedGenres, 'Комедия']);
                                    } else {
                                        setSelectedGenres(selectedGenres.filter(g => g !== 'Комедия'));
                                    }
                                }}>
                </CircleCheckbox>

                <CircleCheckbox label="Драма" colorPalette="black" borderColor="black"
                                isChecked={selectedGenres.includes('Драма')}
                                onChange={e => {
                                    if (e.target.checked) {
                                        setSelectedGenres([...selectedGenres, 'Драма']);
                                    } else {
                                        setSelectedGenres(selectedGenres.filter(g => g !== 'Драма'));
                                    }
                                }}>
                </CircleCheckbox>

            </HStack>


        </Flex>
    );
}

export default FilterBar;