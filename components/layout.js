import { Button } from "@chakra-ui/button";
import { Img } from "@chakra-ui/image";
import { Center, Stack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/layout";
import React from "react";
import NoteBar from "./noteBar";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/spinner";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <Grid templateColumns={"2fr 6fr"} h="100vh">
      {/* sidebar */}
      <Grid templateRows="1fr auto">
        <Grid templateRows="auto 1fr" bg="#f1f1f1">
          <Stack
            p={4}
            spacing="6"
            sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}
          >
            <Img src="/logo.svg" height="64px" width="108px" />
            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => router.push("/new")}
            >
              Create a new note
            </Button>
          </Stack>

          <Stack sx={{ overflowY: "scroll" }} px={3}>
            <span>No notes</span>
          </Stack>
        </Grid>

        <Flex py="2" alignItems="center" justifyContent="center" bg="gray.200">
          <Button colorScheme="pink">Logout</Button>
        </Flex>
      </Grid>

      {/* main */}
      {children}
    </Grid>
  );
}
