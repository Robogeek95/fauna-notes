import { IconButton } from "@chakra-ui/button";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { SearchIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Img } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Center, Stack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import React from "react";
import NoteBar from "./noteBar";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import libNotes from "../lib/notes.json";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";

export default function Layout({ children }) {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    setLoading(true);
    const response = await fetch("./api/get-notes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 200) {
      setLoading(false);
      let description = await response.json().then((data) => {
        console.log(data);
        return data.error.description || data.error.message;
      });

      return toast({
        title: "Error",
        description,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    response.json().then((resData) => {
      setLoading(false);
      setNotes(resData.data);
    });
  };

  async function handleLogout() {
    const response = await fetch("/api/logout");

    if (response.status !== 200) {
      let description = await response
        .json()
        .then((data) => data.error.description);
      setError(description);
      return;
    }

    window.localStorage.setItem("logout", Date.now());
  }

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
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : notes && notes.length > 0 ? (
              notes.map((note) => <NoteBar key={note.ts} note={note} />)
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
      {children}
    </Grid>
  );
}
