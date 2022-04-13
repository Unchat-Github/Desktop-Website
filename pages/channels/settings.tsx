import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { withSessionSsr } from "../../@lib/session";
import userOnlyRoute from "../../@routes/userOnly";
import { User } from "../../@types";
import AppContainer from "../../components/Containers/AppContainer";
import { useDropzone } from "react-dropzone";
import sharp from "sharp";

interface Props {
  user: User;
  token: string;
}

export default function Settings({ user, token }: Props) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [username, setUsername] = useState<string>();

  const onAccept = useCallback((files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setAvatar(reader.result as string);
    };
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    accept: "image/jpeg,image/png",
    maxFiles: 1,
    onDropAccepted: onAccept,
  });

  const handleImageUpload = () => {
    axios({
      method: "POST",
      url: "http://localhost:5050/image/upload",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({ buffer: avatar, id: user.id }),
    }).then(({ data }) => {
      axios.post(
        `${window.origin}/api/auth/edit?avatar=${data.data}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
    });
  };

  return (
    <>
      <AppContainer token={token}>
        <div className="flex items-center justify-center mt-52">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-4">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img
                  src={avatar}
                  alt="My Avatar"
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-start space-y-3">
                <input
                  type="text"
                  className="text-lg text-white placeholder:text-gray-400 outline-none border-b-2 bg-transparent w-[25rem]"
                  defaultValue={user.username}
                  maxLength={35}
                  spellCheck={false}
                  placeholder={"Enter your new username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <textarea className="rounded-md outline-none h-[5rem] w-[25rem] bg-main-500 px-1 py-1 text-gray-100" />
              </div>
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 rounded-md px-1 py-1 text-white"
              onClick={handleImageUpload}
            >
              Save Changes
            </button>
          </div>
        </div>
      </AppContainer>
    </>
  );
}
export const getServerSideProps = withSessionSsr(userOnlyRoute);
