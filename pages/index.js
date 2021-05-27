import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";

export default function Home() {
  const [markdownMode, setMarkdownMode] = useState(false);
  const [note, setNote] = useState("");

  function handleNoteChange(e) {
    e.preventDefault();
    setNote(e.target.text);
  }

  return (
    <>
      {/* <Content note={note} handleNoteChange={handleNoteChange} /> */}
      <Flex justifyContent="center" alignItems="center">
        <Text textAlign="center" sx={{ fontSize: "30px", color: "gray200" }}>
          Select a note or create a new one
        </Text>
      </Flex>
    </>
  );
}
