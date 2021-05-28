import { query } from "faunadb";
const { Logout } = query;
import { serverClient, serializeFaunaCookie } from "../../utils/fauna-auth";

export default async function logout(req, res) {
  try {
    return serverClient
      .query(Logout(true))
      .then((logoutRes) => {
        res.status(200).end();
      })
      .catch((error) => {
        console.log({ error });
        res.status(400).send({ error });
      });
  } catch (error) {
    res.status(400).send({ error });
  }
}
