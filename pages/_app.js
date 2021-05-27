import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../components/layout";
import libNotes from "../lib/notes.json";
import { useEffect } from "react";

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
  const [markdownMode, setMarkdownMode] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(libNotes);
  }, []);

  function handleNoteChange(e) {
    e.preventDefault();
    setNote(e.target.text);
  }

  function handleSearch(values, actions) {
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout
        search={handleSearch}
        markdownMode={markdownMode}
        setMarkdownMode={setMarkdownMode}
        notes={notes}
      >
        <Component />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
