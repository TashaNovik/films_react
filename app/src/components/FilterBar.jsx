import React from 'react';
// Добавляем Heading в импорты
import {Box, Text, Flex, Heading, Spacer, HStack} from '@chakra-ui/react';
import {Checkbox} from "@chakra-ui/react";
import {HiCheckCircle} from "react-icons/hi";
import CircleCheckbox from "./CircleCheckbox.jsx";

function FilterBar() {
    return (
        <Flex
            alignItems="center"
            width="100%" p={4}


        >
            <Heading as="h2" size="xl" fontWeight="bold">
                Фильмы
            </Heading>
            <Spacer/>
            <HStack spacing={4}>
                <CircleCheckbox label="Боевик" colorPalette="red" borderColor="red"></CircleCheckbox>
                <CircleCheckbox label="Триллер" colorPalette="green" borderColor="green"></CircleCheckbox>
                <CircleCheckbox label="Комедия" colorPalette="blue" borderColor="blue"></CircleCheckbox>
                <CircleCheckbox label="Драма" colorPalette="black" borderColor="black"></CircleCheckbox>
            </HStack>
        </Flex>
    );
}

export default FilterBar;