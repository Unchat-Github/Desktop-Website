import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "../../../@lib/api";
import { withSessionSsr } from "../../../@lib/session";
import { Channel, Message, User } from "../../../@types";
import ChannelSidebar from "../../../components/App/ChannelSidebar";
import AppContainer from "../../../components/Containers/AppContainer";

interface Props {
  user: User;
  token: string;
  channel: Channel;
  data: Message[];
}

export default function MePage({ user, token, channel, data }: Props) {
  const [channels, setChannels] = useState<Channel[]>();
  const [messages, setMessages] = useState(data);
  const [content, setContent] = useState<string>();

  const messageBoxRef = useRef<any>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${user.id}/channels`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => setChannels(data));
  }, [token, user.id]);

  useEffect(() => {
    const socket = io("http://localhost:5000/");
    socket.on("connect", () => {
      console.log(`⚡ Connected to WebSocket : ${socket.id} ⚡`);
    });

    socket.on("MESSAGE_CREATE", (payload) => {
      setMessages([...messages, payload]);
    });
  }, [messages]);

  const handleMessage = async () => {
    axios.post(
      `http://localhost:3000/channels/${channel.id}/messages`,
      { content, author: user.id },
      {
        headers: {
          authorization: token,
        },
      }
    );
    messageBoxRef.current.value = "";
    setContent(undefined);
    const dom = document.getElementById("message_box") as HTMLElement;
    dom.style.height = "2.75rem";
  };

  useEffect(() => {
    const textarea = document.getElementById("message_box") as HTMLElement;

    textarea.addEventListener(
      "input",
      (e) => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.scrollTop = textarea.scrollHeight;
        window.scrollTo(
          // @ts-expect-error
          window.scrollLeft,
          textarea.scrollTop + textarea.scrollHeight
        );
      },
      false
    );
  }, []);

  return (
    <>
      <AppContainer token={token}>
        <div className="flex justify-center items-center absolute inset-x-0 bottom-4">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              {" "}
              {messages?.map((msg) => (
                <div
                  className="flex items-center space-x-1 hover:bg-main-200 py-1 px-2 rounded w-[55rem]"
                  key={msg.id + 1}
                >
                  <img
                    src={msg.author.avatar}
                    alt={`${msg.author.username} Avatar`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center space-x-1">
                      <p className="text-gray-100 text-base hover:underline cursor-pointer">
                        {msg.author.username}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-lg text-gray-200 w-[50rem]">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <textarea
              className="outline-none px-1 py-1 rounded-md bg-main-300 text-gray-100 w-[55rem] h-fit resize-none block overflow-hidden"
              spellCheck={true}
              onKeyDown={(e) => {
                if (e.code == "Enter") {
                  e.preventDefault();
                  if (!content) return;
                  handleMessage();
                }
              }}
              onChange={(E) => {
                setContent(E.target.value);
              }}
              value={content}
              id="message_box"
              ref={messageBoxRef}
            />
          </div>
        </div>
        <ChannelSidebar channels={channels as Channel[]} user={user} />
      </AppContainer>
    </>
  );
}

export const getServerSideProps = withSessionSsr(async function ChannelRoute(
  ctx
) {
  const { req } = ctx;
  const { user } = req.session;
  if (!user)
    return {
      redirect: {
        destination: "/forms/signup",
        permanent: true,
      },
    };

  const token = await getToken();

  const { data: channel } = await axios.get(
    `http://localhost:3000/channels/${ctx.query.id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  const { data } = await axios.get(
    `http://localhost:3000/channels/${ctx.query.id}/messages?limit=50`,
    {
      headers: {
        authorization: token,
        skip: 0,
      },
    }
  );

  if (!channel)
    return {
      redirect: {
        destination: "/404",
        permanent: true,
      },
    };

  return {
    props: { user, channel, token, data },
  };
});
