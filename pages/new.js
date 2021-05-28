import { AlertIcon } from "@chakra-ui/alert";
import { Alert } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Grid } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function New() {
  const toast = useToast();
  const router = useRouter();
  const [note, setNote] = useState({ title: "untitled" });
  const [saving, setSaving] = useState(false);

  function handleUpdateTitle(e) {
    e.preventDefault();
    setNote({ ...note, title: e.target.value });
  }

  // creates a new note
  const handleCreate = async () => {
    setSaving(true);
    const { title, content } = note;
    console.log({ title, content });
    const response = await fetch("./api/create-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.status !== 200) {
      setSaving(false);
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
      setSaving(false);
      toast({
        title: "Success",
        description: resData.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      // navigate to the page for created note
      router.push(`/${resData.data.ts}`);
    });
  };

  return (
    <>
      <Layout>
        <Grid templateRows="auto 1fr" sx={{ position: "relative" }}>
          {/* nav */}
          <Flex alignItems="center" justifyContent="space-between" p={4}>
            {/* title */}
            <Input value={note.title} mr="5" onChange={handleUpdateTitle} />

            <Button
              isLoading={saving}
              loadingText="Saving"
              onClick={handleCreate}
            >
              Save
            </Button>
          </Flex>

          <Content note={note} setNoteContent={setNote} />
        </Grid>
      </Layout>
    </>
  );
}
