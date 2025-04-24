import React from 'react';
import { Box, Text } from '@chakra-ui/react'; // Импортируем пару базовых компонентов

function FilterBar() {
    // Возвращаем только простой Box с текстом
    return (
        <Box border="1px dashed red" p={4}> {/* Добавим рамку для наглядности */}
            <Text>Это минимальный FilterBar</Text>
        </Box>
    );
}

export default FilterBar;