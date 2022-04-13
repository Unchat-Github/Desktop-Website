import axios from "axios";
import { useEffect, useState } from "react";
import { withSessionSsr } from "../../../@lib/session";
import userOnlyRoute from "../../../@routes/userOnly";
import { Channel, User } from "../../../@types";
import ChannelSidebar from "../../../components/App/ChannelSidebar";
import AppContainer from "../../../components/Containers/AppContainer";

interface Props {
  user: User;
  token: string;
}

export default function MePage({ user, token }: Props) {
  const [channels, setChannels] = useState<Channel[]>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${user.id}/channels`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => setChannels(data));
  }, [token, user.id]);

  return (
    <>
      <AppContainer token={token}>
        <ChannelSidebar channels={channels as Channel[]} user={user} />
      </AppContainer>
    </>
  );
}

export const getServerSideProps = withSessionSsr(userOnlyRoute);
