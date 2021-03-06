import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Center, Text } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";

export default function New() {
  const toast = useToast();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { noteId } = router.query;
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (noteId) {
      getNote();
    }
  }, [noteId]);

  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`./api/notes/${noteId}`, {
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
      setNote(resData.data);
    });
  };

  function handleUpdateTitle(e) {
    e.preventDefault();
    setNote({ ...note, title: e.target.value });
  }

  // creates a new note
  const handleUpdate = async () => {
    setUpdating(true);
    const { title, content } = note;
    const response = await fetch(`./api/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.status !== 200) {
      setUpdating(false);
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
      // send a feedback alert
      setUpdating(false);
      toast({
        title: "Success",
        description: resData.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <Layout>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : note ? (
        <Grid templateRows="auto 1fr" sx={{ position: "relative" }}>
          {/* nav */}
          <Flex alignItems="center" justifyContent="space-between" p={4}>
            {/* title */}
            <Input
              value={note ? note.title : "untitled"}
              mr="5"
              onChange={handleUpdateTitle}
            />

            <Button
              isLoading={updating}
              loadingText="Saving"
              onClick={handleUpdate}
            >
              Save
            </Button>
          </Flex>

          <Content note={note} setNote={setNote} />
        </Grid>
      ) : (
        <p>Oops! This Note is not found</p>
      )}
    </Layout>
  );
}
