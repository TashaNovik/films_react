import React from 'react';
// Добавляем Heading в импорты
import {Box, Text, Flex, Heading} from '@chakra-ui/react';
import {Checkbox} from "@chakra-ui/react";
import {HiCheckCircle} from "react-icons/hi";
import CircleCheckbox from "./CircleCheckbox.jsx";

function FilterBar() {
    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={6}
            flexWrap="wrap"
            gap={4}

        >
            <Heading as="h2" size="xl" fontWeight="bold">
                Фильмы
            </Heading>
            {/*<Text>*/}
            {/*    Место для чекбоксов</Text>*/}
            <CircleCheckbox label="Драма"></CircleCheckbox>
            <CircleCheckbox label="Боевик"></CircleCheckbox>
            <CircleCheckbox label="Триллер"></CircleCheckbox>
            <CircleCheckbox label="Комедия"></CircleCheckbox>
        </Flex>
    );
}

export default FilterBar;