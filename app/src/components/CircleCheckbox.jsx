import React from 'react';
// Добавляем Heading в импорты
import {Box, Text, Flex, Heading} from '@chakra-ui/react';
import {Checkbox, CheckboxProps, useStyleConfig} from "@chakra-ui/react";



function CircleCheckbox(props) {
    return (
        <Flex>
            <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control  rounded="full" borderColor="green.500" >
                    <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>{props.label}</Checkbox.Label>
            </Checkbox.Root>
        </Flex>
    );
}

export default CircleCheckbox;