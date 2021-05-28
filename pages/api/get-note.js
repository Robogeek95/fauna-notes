import { query } from "faunadb";
const { Collection, Ref, Get } = query;
import { serverClient } from "../../utils/fauna-auth";

export default async function getNote(req, res) {
  const { noteId } = req.body;

  try {
    if (!noteId) {
      throw new Error("noteId is required.");
    }

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
