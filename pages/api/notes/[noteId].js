import { query } from "faunadb";
const { Collection, Ref, Get, Update, Delete } = query;
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
  // update note
  else if (req.method === "PUT") {
    const { noteId } = req.query;
    const { title, content } = req.body;

    try {
      serverClient
        .query(
          Update(Ref(Collection("notes"), noteId), { data: { title, content } })
        )
        .then((ret) => {
          res
            .status(200)
            .send({ message: "Updated note successfully", data: ret });
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
  // delete note
  else if (req.method === "DELETE") {
    const { noteId } = req.query;

    try {
      serverClient
        .query(Delete(Ref(Collection("notes"), noteId)))
        .then((ret) => {
          res
            .status(200)
            .send({ message: "Deleted note successfully", data: ret });
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
