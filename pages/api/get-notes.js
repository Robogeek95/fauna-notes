import { query } from "faunadb";
const { Paginate, Index, Lambda, Match, Get, Var, Map } = query;
import { serverClient } from "../../utils/fauna-auth";

export default async function getNotes(req, res) {
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
