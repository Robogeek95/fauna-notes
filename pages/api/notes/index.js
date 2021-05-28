import { query } from "faunadb";
const { Paginate, Index, Lambda, Match, Get, Var, Map, Create, Collection } =
  query;
import { serverClient } from "../../../utils/fauna-auth";

export default async function handler(req, res) {
  // get all notes
  if (req.method === "GET") {
    try {
      serverClient
        .query(
          Map(Paginate(Match(Index("all_notes"))), Lambda("X", Get(Var("X"))))
        )
        .then((ret) => {
          res
            .status(200)
            .send({ message: "Fetched notes successfully", data: ret.data });
        })
        .catch((error) => {
          console.log({ error });
          res.status(400).send({ error });
        });
    } catch (error) {
      console.log({ error });
      res.status(400).send({ error: { description: error.message } });
    }
  }
  //   create note
  else if (req.method === "POST") {
    const { title, content } = await req.body;

    try {
      if (!title) {
        throw new Error("Title is required.");
      }

      serverClient
        .query(
          Create(Collection("notes"), {
            data: { title, content },
          })
        )
        .then((ret) => {
          res
            .status(200)
            .send({ message: "created note successfully", data: ret });
        })
        .catch((error) => {
          console.log({ error });
          res.status(400).send({ error });
        });
    } catch (error) {
      console.log({ error });
      res.status(400).send({ error: { description: error.message } });
    }
  }
}
