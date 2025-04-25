import React from 'react';
import {Fieldset, Container, Field, Input, NativeSelect, For, Text, HStack } from "@chakra-ui/react";


function AddMoviePage() {
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

                    <Field.Root>
                        <Field.Label>Email address</Field.Label>
                        <Input name="email" type="email"/>
                    </Field.Root>

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