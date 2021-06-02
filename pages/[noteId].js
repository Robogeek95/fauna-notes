import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Grid } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";

export default function New() {
  const [note, setNote] = useState("");
  const router = useRouter();
  const { noteId } = router.query;

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

          <Button loadingText="Saving">Save</Button>
        </Flex>

        <Content note={note} setNote={setNote} />
      </Grid>
    </Layout>
  );
}
