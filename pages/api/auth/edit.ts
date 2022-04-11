import axios from "axios";
import { withSessionApi } from "../../../@lib/session";
export default withSessionApi(async (req, res) => {
  if (req.method !== "POST")
    return res.status(400).send({ message: "bad body request" });
  req.session.user = {
    username: req.session.user?.username as string,
    avatar: req.query.avatar as string,
    id: req.session.user?.id as string,
  };
  await req.session.save();

  const { data } = await axios({
    method: "PATCH",
    data: {
      avatar: req.query.avatar,
      username: req.session.user.username,
      status: "Hey! I just joined unchat",
    },
    headers: {
      authorization: req.headers.authorization as string,
    },
    url: `http://localhost:3000/users/${req.session.user.id}`,
  });

  res.status(200).send(data);
});
