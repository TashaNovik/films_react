import {Box, Container} from '@chakra-ui/react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MovieGrid from "./components/MovieGrid.jsx";
import {useState} from "react";
import { Routes, Route, Link, BrowserRouter  } from 'react-router-dom';
import AddMoviePage from "./components/AddMoviePage.jsx";


function App() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    return (
        <Box bg="gray.50" minH="100vh">
            <Header/>
            <Routes>
                <Route path="/" element={
                    <Container maxW="container.xl" py={8}>
                        {/* 👇 Добавьте FilterBar здесь */}
                        <FilterBar selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>

                        <Box as="main">
                            <MovieGrid selectedGenres={selectedGenres}/>
                        </Box>
                    </Container>
                } />
                <Route path="/favorites" element={
                    <Container maxW="container.xl" py={8}>
                        Содержимое страницы - Избранное
                    </Container>
                } />
                <Route path="/add" element={<AddMoviePage/>} />
            </Routes>

            {/* Место для Footer */}
            <Box as="footer" bg="black" color="white" p={8} mt={16}>
                Фильмограф
            </Box>
        </Box>
    )
}

export default App