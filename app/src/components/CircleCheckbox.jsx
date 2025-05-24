import React from 'react';
// Добавляем Heading в импорты
import {Box, Text, Flex, Heading} from '@chakra-ui/react';
import {Checkbox} from "@chakra-ui/react";


function CircleCheckbox({colorPalette, borderColor, label, isChecked, onChange}) {
    return (
        <Flex>
            <Checkbox.Root colorPalette={colorPalette} onChange={onChange} checked={isChecked}>
                <Checkbox.HiddenInput />
                <Checkbox.Control  
                    rounded="full" 
                    borderColor={borderColor}
                    bg={isChecked ? borderColor : 'transparent'}
                    _checked={{
                        bg: borderColor,
                        borderColor: borderColor,
                        color: 'white'
                    }}
                >
                    <Checkbox.Indicator color={isChecked ? 'white' : 'transparent'} />
                </Checkbox.Control>
                <Checkbox.Label>{label}</Checkbox.Label>
            </Checkbox.Root>
        </Flex>
    );
}

export default CircleCheckbox;