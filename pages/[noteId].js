import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";
import notes from "../lib/notes.json";

export default function New() {
  const [markdownMode, setMarkdownMode] = useState(false);
  const [note, setNote] = useState("");
  const router = useRouter();

  const { noteId } = router.query;

  useEffect(() => {
    let noteIndex = notes.findIndex((note) => note.noteId === noteId);
    setNote(notes[noteIndex]);
  }, [noteId]);

  if (!note) {
    return <p>Note not found</p>;
  }

  return <Content noteContent={note.content} />;
}
