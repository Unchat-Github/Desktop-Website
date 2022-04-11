import { getToken } from "./../@lib/api";
import { GetServerSidePropsContext } from "next";
export async function tokenOnly(req: GetServerSidePropsContext) {
  const token = await getToken();
  return {
    props: { token },
  };
}
