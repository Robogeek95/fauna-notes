import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Content from "../components/content";
import Layout from "../components/layout";
import libNotes from "../lib/notes.json";
import { withAuthSync } from "../utils/auth";

function Dashboard() {
  return (
    <>
      <Layout>
        <Flex justifyContent="center" alignItems="center">
          <Text textAlign="center" sx={{ fontSize: "30px", color: "gray200" }}>
            Select a note or create a new one
          </Text>
        </Flex>
      </Layout>
    </>
  );
}

export default withAuthSync(Dashboard);
