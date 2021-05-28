import { query } from "faunadb";
const { Function: Fn, Call } = query;
import { serverClient, serializeFaunaCookie } from "../../utils/fauna-auth";

export default async function signup(req, res) {
  const { email, password, name } = await req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("Email, password and name are required.");
    }

    return serverClient
      .query(Call(Fn("signupUser"), [email, password, name]))
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
    console.log({ error });
    res.status(400).send({ error: { description: error.message } });
  }
}
