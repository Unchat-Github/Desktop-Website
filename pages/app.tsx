import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withSessionSsr } from "../@lib/session";
import { tokenOnly } from "../@routes/tokenOnly";
import userOnlyRoute from "../@routes/userOnly";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/channels/@me");
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center mt-52">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={"/@loadings/loading1.gif"}
            alt="Loading Gifi"
            width={164}
            height={164}
          />
          <p className="text-white text-lg font-semibold">Loading....</p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withSessionSsr(tokenOnly);
