import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useEffect, useState } from "react";

export default function Content({ noteContent, setNoteContent }) {
  function handleNoteChange(e) {
    e.preventDefault();
    setNoteContent({ note: e.target.text });
  }

  return (
    <>
      {/* content */}
      <Box p={4}>
        <Textarea
          placeholder="Start typing"
          onChange={handleNoteChange}
          value={noteContent}
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
      {!noteContent && (
        <Box
          sx={{
            position: "absolute",
            top: "140px",
            pl: 8,
            color: "gray.400",
          }}
        >
          <p>markdown is supported</p>
        </Box>
      )}
    </>
  );
}
