import { getToken } from "./../@lib/api";
import { GetServerSidePropsContext } from "next";
export default async function userOnlyRoute(req: GetServerSidePropsContext) {
  const { user } = req.req.session;

  if (!user)
    return {
      redirect: {
        destination: "/forms/login",
        permanent: false,
      },
    };

  const token = await getToken();

  return {
    props: { user, token },
  };
}
