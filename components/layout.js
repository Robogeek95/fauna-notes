import { IconButton } from "@chakra-ui/button";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { SearchIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Img } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import React from "react";
import NoteBar from "./noteBar";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function Layout({
  markdownMode,
  setMarkdownMode,
  children,
  notes,
}) {
  const router = useRouter();
  const { noteId } = router.query;
  const [note, setNote] = useState({});

  function handleLogout() {
    router.push("/login");
  }

  function handleUpdateTitle(e) {
    e.preventDefault();
    setNote({ ...note, title: e.target.value });
  }

  useEffect(() => {
    if (noteId) {
      let noteIndex = notes.findIndex((note) => note.noteId === noteId);
      setNote(notes[noteIndex]);
    }
  }, [noteId]);

  return (
    <Grid templateColumns={"2fr 6fr"} h="100vh">
      {/* sidebar */}
      <Grid templateRows="1fr auto">
        <Grid templateRows="auto 1fr" bg="#f1f1f1">
          <Stack
            p={4}
            spacing="6"
            sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}
          >
            <Img src="/logo.svg" height="64px" width="108px" />
            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => router.push("/new")}
            >
              Create a new note
            </Button>
          </Stack>

          <Stack sx={{ overflowY: "scroll" }} px={3}>
            {notes && notes.length > 0 ? (
              notes.map((note) => <NoteBar note={note} />)
            ) : (
              <span>No notes</span>
            )}
          </Stack>
        </Grid>

        <Flex py="2" alignItems="center" justifyContent="center" bg="gray.200">
          <Button colorScheme="pink" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Grid>

      {/* main */}
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

        {children}
      </Grid>
    </Grid>
  );
}
