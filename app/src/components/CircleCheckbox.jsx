import React from 'react';
// Добавляем Heading в импорты
import {Box, Text, Flex, Heading} from '@chakra-ui/react';
import {Checkbox} from "@chakra-ui/react";


function CircleCheckbox(props) {
    return (
        <Flex>
            <Checkbox.Root colorPalette={props.colorPalette}>
                <Checkbox.HiddenInput />
                <Checkbox.Control  rounded="full" borderColor={props.borderColor} >
                    <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>{props.label}</Checkbox.Label>
            </Checkbox.Root>
        </Flex>
    );
}

export default CircleCheckbox;