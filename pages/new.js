import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";
import libNotes from "../lib/notes.json";

export default function New() {
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

  return (
    <>
      <Layout
        markdownMode={markdownMode}
        setMarkdownMode={setMarkdownMode}
        notes={notes}
      >
        <Content note={note} handleNoteChange={handleNoteChange} />
      </Layout>
    </>
  );
}
