import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex mx-[10rem] mt-[10rem]">
        <div className="flex items-center space-x-[50rem]">
          <div className="flex flex-col items-start space-y-5">
            <div className="flex flex-col items-tart space-y-1">
              <p className="text-lg text-white font-semibold">
                Page not found?
              </p>
              <p className="text-lg text-gray-300">
                Looks like this is an invalid page.
              </p>
            </div>
            <Link href={"/"}>
              <button className="bg-main-200 hover:bg-main-300 rounded-md text-white px-1 py-1">
                Go to home
              </button>
            </Link>
          </div>
          <Image
            src={"/confused.gif"}
            alt="Confused Travolta"
            width={426}
            height={212}
          />
        </div>
      </div>
    </>
  );
}
