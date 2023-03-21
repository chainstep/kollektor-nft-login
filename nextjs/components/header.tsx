import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { useState } from "react";

interface HeaderProps {
  left: string;
  right: string;
}

export default function HeaderView({ left, right }: HeaderProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuHidden, setMenuHidden] = useState(true);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            className="objectLeft mr-4"
            alt="alogo"
            width="120"
            height="42"
            src="/alogo.png"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={() => setMenuHidden(!menuHidden)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full flex-grow lg:flex lg:w-auto ${
            menuHidden && "hidden"
          }`}
        >
          <div className="text-3xl font-bold lg:flex-grow place-items-end">
            <a
              onClick={() => router.push("/")}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-12"
            >
              News
            </a>
            <a
              onClick={() => router.push("/events")}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-12"
            >
              Events
            </a>
            <a
              onClick={() => router.push("/people")}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              People
            </a>
          </div>
          <div id="profile">
            <p className="inline-block text-sm lg:px-4 py-2 leading-none text-white mt-4 lg:mt-0">
              {session?.user?.name || session?.user?.email}
            </p>
            <button
              onClick={() => (session?.user?.email ? signOut() : signIn())}
              className="inline-block text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              {session?.user?.email ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </nav>
      <div className="bg-teal-500 content-start items-start grid lg:grid-cols-2 gap-4 p-10">
        <div className="text-2xl items-start">
          <ReactMarkdown>{left}</ReactMarkdown>
        </div>
        <div className="text-2xl items-start">
          <ReactMarkdown>{right}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
