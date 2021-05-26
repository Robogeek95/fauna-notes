import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "#002754",
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function App({ Component }) {
  return (
    <ChakraProvider theme={theme}>
      <Component />
    </ChakraProvider>
  );
}

export default App;
