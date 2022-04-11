import Link from "next/link";
import { Channel, User } from "../../@types";
import { RiGroup2Fill } from "react-icons/ri";
import { BsFillGearFill } from "react-icons/bs";

interface Props {
  channels: Channel[];
  user: User;
}

export default function ChannelSidebar({ channels, user }: Props) {
  return (
    <>
      <div className="absolute inset-y-0 left-0 py-1 px-3 bg-main-300 h-screen w-[18rem] rounded dark:bg-gray-800">
        <ul className="space-y-2">
          {channels?.map((channel) => (
            <Link href={`/channels/${channel.id}`} key={channel.id + 1}>
              <li className="flex items-center px-2 py-2 hover:bg-main-400 rounded-md space-x-2 cursor-pointer">
                <RiGroup2Fill className="text-gray-300" size={30} />
                <div className="flex flex-col items-start">
                  <p className="text-base font-normal text-gray-200">
                    {channel.name}
                  </p>
                  <p className=" text-xs font-normal text-gray-400">
                    {channel.description}
                  </p>
                </div>
              </li>
            </Link>
          ))}
          <br />
        </ul>
        <div className="absolute bottom-4">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1">
              <img
                src={user.avatar}
                alt="My Avatar"
                width={38}
                height={38}
                className="rounded-full"
              />
              <div className="flex flex-col items-start space-y-1">
                <p className="text-white text-sm">{user.username}</p>
                <p className="text-gray-300 text-xs">
                  Hey! I just joined unchat
                </p>
              </div>
            </div>
            <Link href={"/channels/settings"} passHref>
              <BsFillGearFill className="text-gray-400 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
