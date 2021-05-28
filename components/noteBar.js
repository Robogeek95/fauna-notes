import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";

const NoteBar = ({ note }) => {
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  const { noteId } = router.query;
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setDeleting(true);
    const response = await fetch(
      `./api/notes/${note.ref["@ref"].id.toString()}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status !== 200) {
      setDeleting(false);
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
      setDeleting(false);
      toast({
        title: "Success",
        description: resData.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });

    // if the current note in view was deleted go home
    if (noteId === note.ref["@ref"].id.toString()) {
      router.push("/");
    }
  };

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
            isLoading={deleting}
            onClick={handleDelete}
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
