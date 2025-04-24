import { Box, Container } from '@chakra-ui/react'

function App() {
    return (
        <Box bg="gray.50" minH="100vh"> {/* Используем Box как основной контейнер с фоном */}
            {/* Место для Header */}
            <Box as="header" bg="white" boxShadow="sm" p={4}>
                Header Placeholder
            </Box>

            {/* Основной контент */}
            <Container maxW="container.xl" py={8}> {/* Ограничиваем ширину контента */}
                <Box as="main">
                    Main Content Placeholder
                </Box>
            </Container>

            {/* Место для Footer */}
            <Box as="footer" bg="gray.800" color="white" p={4} mt={8}>
                Footer Placeholder
            </Box>
        </Box>
    )
}

export default App