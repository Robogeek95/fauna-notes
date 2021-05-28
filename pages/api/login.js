import { query } from "faunadb";
const { Match, Index, Login } = query;
import { serverClient, serializeFaunaCookie } from "../../utils/fauna-auth";

export default async function signin(req, res) {
  const { email, password } = await req.body;

  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    return serverClient
      .query(
        Login(Match(Index("users_by_email"), email), {
          password,
        })
      )
      .then((loginRes) => {
        if (!loginRes.secret) {
          throw new Error("No secret present in login query response.");
        }

        const cookieSerialized = serializeFaunaCookie(loginRes.secret);

        res.setHeader("Set-Cookie", cookieSerialized);
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
