import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import React, {StrictMode} from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ChakraProvider value={defaultSystem}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider >
    </StrictMode>,
)