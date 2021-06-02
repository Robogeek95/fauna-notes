import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useRouter } from "next/router";

const NoteBar = ({ note }) => {
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  const { noteId } = router.query;

  let noteBg =
    noteId === note.ref["@ref"].id.toString()
      ? "blue.100"
      : focus
      ? "gray.200"
      : "";

  return (
    <>
      <Box
        sx={{ position: "relative" }}
        onMouseOver={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <Flex
          onClick={() => router.push(`${note.ref["@ref"].id}`)}
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
          <span>{note.data.title}</span>
        </Flex>

        {(focus || deleting) && (
          <IconButton
            sx={{ position: "absolute", right: "10px", top: "10px" }}
            size="sm"
            aria-label="delete note"
            icon={<DeleteIcon />}
          />
        )}
      </Box>
    </>
  );
};

export default NoteBar;
