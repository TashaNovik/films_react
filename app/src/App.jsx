import { Box, Container } from '@chakra-ui/react'
import Header from './components/Header' // <-- Импортируйте Header

function App() {
    return (
        <Box bg="gray.50" minH="100vh">
            {/* 👇 Замените плейсхолдер на компонент Header */}
            <Header />

            {/* Основной контент */}
            <Container maxW="container.xl" py={8}>
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