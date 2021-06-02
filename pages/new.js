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
  const [note, setNote] = useState({ title: "untitled" });

  function handleUpdateTitle(e) {
    e.preventDefault();
    setNote({ ...note, title: e.target.value });
  }

  return (
    <>
      <Layout>
        <Grid templateRows="auto 1fr" sx={{ position: "relative" }}>
          {/* nav */}
          <Flex alignItems="center" justifyContent="space-between" p={4}>
            {/* title */}
            <Input value={note.title} mr="5" onChange={handleUpdateTitle} />

            <Button loadingText="Saving">Save</Button>
          </Flex>

          <Content note={note} setNote={setNote} />
        </Grid>
      </Layout>
    </>
  );
}
