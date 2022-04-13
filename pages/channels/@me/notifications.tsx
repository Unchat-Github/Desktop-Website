import { withSessionSsr } from "../../../@lib/session";
import userOnly from "../../../@routes/userOnly";
import { User, Notification } from "../../../@types/index";
import AppContainer from "../../../components/Containers/AppContainer";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { getToken } from "../../../@lib/api";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";

interface Props {
  user: User;
  token: string;
  data: { notifications: Notification[] };
}

export default function UserNotifications({ user, token, data }: Props) {
  const [notifications, setNotifications] = useState(data.notifications);

  useEffect(() => {
    const socket = io("http://localhost:5000/");
    socket.on("NOTIFICATION_CREATE", (payload) =>
      setNotifications([...notifications, payload])
    );
  }, [notifications]);

  return (
    <>
      <AppContainer token={token}>
        <div className="flex items-center justify-center mt-32">
          <div className="flex flex-col items-start space-y-3">
            <Link href={"/channels/@me"}>
              <button className="bg-main-200 hover:bg-main-300 rounded-md text-white px-1 py-1">
                Go back
              </button>
            </Link>
            <div className="grid grid-cols-1 gap-3">
              {notifications?.map((notif, index) => (
                <div
                  key={index + 1}
                  className="w-[50rem] bg-main-300 px-1 py-1 rounded-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start space-y-1">
                      <div className="flex items-center space-x-1">
                        <img
                          src={notif.author.avatar}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <p className="text-white text-lg font-semibold">
                          {notif.author.username}
                        </p>
                      </div>
                      <p className="text-lg text-gray-300">
                        {notif.type == "friend" && "Has sent a friend request"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 px-3">
                      <IoIosCheckmarkCircle
                        className="text-green-600 hover:text-green-700 cursor-pointer"
                        size={28}
                      />
                      <IoIosCloseCircle
                        className="text-rose-600 hover:text-rose-700 cursor-pointer"
                        size={28}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppContainer>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function NotificationRoute({ req }) {
    const { user } = req.session;
    if (!user)
      return {
        redirect: {
          destination: "/api/auth/login",
          permanent: true,
        },
      };

    const token = await getToken();

    const { data } = await axios.get(
      `http://localhost:3000/users/${user.id}/notifications`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    return {
      props: { user, token, data },
    };
  }
);
