import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";
import libNotes from "../lib/notes.json";

export default function New() {
  const [markdownMode, setMarkdownMode] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  const { noteId } = router.query;

  useEffect(() => {
    setNotes(libNotes);
  }, []);

  useEffect(() => {
    let noteIndex = notes.findIndex((note) => note.noteId === noteId);
    setNote(notes[noteIndex]);
  }, [noteId]);

  return (
    <Layout
      markdownMode={markdownMode}
      setMarkdownMode={setMarkdownMode}
      notes={notes}
    >
      {!note ? (
        <p>Oops! This Note is not found</p>
      ) : (
        <Content noteContent={note.content} />
      )}
    </Layout>
  );
}
