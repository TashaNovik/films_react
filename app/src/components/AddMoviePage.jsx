import React, {useState} from 'react';
import {Fieldset, Container, Field, Input, NativeSelect, For, Text, HStack } from "@chakra-ui/react";
import CircleCheckbox from "./CircleCheckbox.jsx";

const genres = [
    { label: 'Боевик', value: 'action', color: 'red.500' },
    { label: 'Триллер', value: 'thriller' , color: 'green.500' },
    { label: 'Комедия', value: 'comedy' , color: 'blue.500' },
    { label: 'Драма', value: 'drama' , color: 'black.500' },
];

function AddMoviePage() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const handleGenreChange = (value) => {
        setSelectedGenres((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    return (
        <Container maxW="container.xl" py={8}>
            <Text as='b'>
                <label>Добавить фильм</label>
            </Text>
            <Fieldset.Root borderRadius="md"
                           borderWidth="1px"
                           borderColor="border.disabled"
                           color="fg.disabled">
                <Fieldset.Content>
                    <HStack spacing={3} align="center">
                        <label htmlFor="film-title">Название фильма</label>
                        <Input id="film-title" name="name" htmlSize={35} width="auto" />
                    </HStack>

                    <HStack spacing={3} align="center">
                        <label htmlFor="film-title">Жанр</label>
                        {genres.map((genre) => (
                            <CircleCheckbox
                                key={genre.value}
                                checked={selectedGenres.includes(genre.value)}
                                onChange={() => handleGenreChange(genre.value)}
                                label={genre.label}
                                color={genre.color}
                            />
                        ))}
                    </HStack>

                    <Field.Root>
                        <Field.Label>Country</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field name="country">
                                <For each={["United Kingdom", "Canada", "United States"]}>
                                    {(item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    )}
                                </For>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator/>
                        </NativeSelect.Root>
                    </Field.Root>
                </Fieldset.Content>


            </Fieldset.Root>
        </Container>
    )
        ;
}

export default AddMoviePage;