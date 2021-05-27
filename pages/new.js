import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";

export default function New() {
  const [markdownMode, setMarkdownMode] = useState(false);
  const [note, setNote] = useState("");

  function handleNoteChange(e) {
    e.preventDefault();
    setNote(e.target.text);
  }

  return (
    <>
      <Content note={note} handleNoteChange={handleNoteChange} />
    </>
  );
}
