import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";
import libNotes from "../lib/notes.json";

export default function New() {
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

  function handleUpdateTitle(e) {
    e.preventDefault();
    setNote({ ...note, title: e.target.value });
  }

  return (
    <Layout>
      <Grid templateRows="auto 1fr" sx={{ position: "relative" }}>
        {/* nav */}
        <Flex alignItems="center" justifyContent="space-between" p={4}>
          {/* title */}
          <Input
            value={note ? note.title : "untitled"}
            mr="5"
            onChange={handleUpdateTitle}
          />

          <Button>Save</Button>
        </Flex>

        {!note ? (
          <p>Oops! This Note is not found</p>
        ) : (
          <Content noteContent={note.content} setNoteContent={setNote} />
        )}
      </Grid>
    </Layout>
  );
}
