import { withSessionApi } from "../../../@lib/session";

export default withSessionApi(async (req, res) => {
  req.session.user = {
    username: "mark_",
    avatar: "https://avatars.dicebear.com/api/avataaars/mark_.png",
    id: "5862179431002406735",
  };
  await req.session.save();
  res.redirect("/app");
});
