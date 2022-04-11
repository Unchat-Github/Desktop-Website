import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`${window.origin}-loggedin`)) setLoggedIn(true);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-52">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex flex-col items-center space-y-1">
            <h1 className="text-white font-semibold text-6xl">Unchat</h1>
            <p className="text-lg text-gray-200">
              A place where you can just.... chat?
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={loggedIn ? "/app" : "/forms/signup"}>
              <button className="px-2 py-1 text-lg text-white rounded-md bg-main-200 hover:bg-main-300">
                {loggedIn ? "Open App" : "SignUp"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
