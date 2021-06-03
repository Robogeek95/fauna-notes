import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";

export default function Content({ note, setNote }) {
  function handleNoteChange(e) {
    e.preventDefault();
    setNote({ ...note, content: e.target.value });
  }

  return (
    <>
      {/* content */}
      <Box p={4}>
        <Textarea
          placeholder="Start typing"
          onChange={handleNoteChange}
          value={note.content}
          sx={{
            height: "100%",
            border: "none",
            resize: "none",
            ":focus": {
              outline: "none",
              border: "none",
              boxShadow: "none",
            },
          }}
        />
      </Box>
    </>
  );
}
