import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";
import libNotes from "../lib/notes.json";

export default function Home() {
  const [markdownMode, setMarkdownMode] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(libNotes);
  }, []);

  return (
    <>
      <Layout
        markdownMode={markdownMode}
        setMarkdownMode={setMarkdownMode}
        notes={notes}
      >
        <Flex justifyContent="center" alignItems="center">
          <Text textAlign="center" sx={{ fontSize: "30px", color: "gray200" }}>
            Select a note or create a new one
          </Text>
        </Flex>
      </Layout>
    </>
  );
}
