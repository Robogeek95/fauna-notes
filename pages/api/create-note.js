import { query } from "faunadb";
const { Create, Collection } = query;
import { serverClient } from "../../utils/fauna-auth";

export default async function createNote(req, res) {
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
