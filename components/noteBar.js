import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import proptypes from "prop-types";
import { useRouter } from "next/router";

const NoteBar = ({ note }) => {
  const [focus, setFocus] = useState(false);
  const router = useRouter();

  const { noteId } = router.query;

  let noteBg =
    noteId === note.noteId ? "blue.100" : focus ? "gray.200" : "";

  return (
    <>
      <Flex
        onClick={() => router.push(note.noteId)}
        onMouseOver={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        alignItems="center"
        justifyContent="space-between"
        h="50px"
        px={4}
        py={2}
        bg={noteBg}
        // bg={focus ? "gray.200" : ""}
        sx={{
          borderRadius: "5px",
          cursor: "pointer",
          textTransform: "capitalize",
        }}
      >
        <span>{note.title}</span>
        {focus && (
          <IconButton
            size="sm"
            aria-label="delete note"
            icon={<DeleteIcon />}
          />
        )}
      </Flex>
    </>
  );
};

export default NoteBar;
