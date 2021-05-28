import { query } from "faunadb";
const { Collection, Ref, Get } = query;
import { serverClient } from "../../../utils/fauna-auth";

export default async function handler(req, res) {
  // get note
  if (req.method === "GET") {
    const { noteId } = req.query;

    try {
      serverClient
        .query(Get(Ref(Collection("notes"), noteId)))
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
}
