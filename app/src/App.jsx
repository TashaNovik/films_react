import { Box, Container } from '@chakra-ui/react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MovieGrid  from "./components/MovieGrid.jsx";

function App() {
    return (
        <Box bg="gray.50" minH="100vh">
            <Header />

            {/* Основной контент */}
            <Container maxW="container.xl" py={8}>
                {/* 👇 Добавьте FilterBar здесь */}
                <FilterBar />

                <Box as="main">
                    <MovieGrid/>
                </Box>
            </Container>

            {/* Место для Footer */}
            <Box as="footer" bg="black" color="white" p={8} mt={16}>
                Фильмограф
            </Box>
        </Box>
    )
}

export default App