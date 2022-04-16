import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Navbar(props) {
  const { data: session } = useSession();
  return (
    <nav className="bg-white border-gray-200 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/" className="flex items-center">
          {session ? (
            <div className="flex items-center ">
              <img
                className="h-10"
                src={session.user.image}
                alt="Twitch profile picture"
              />
              <p className="ml-3">{session.user.name}</p>
            </div>
          ) : (
            <a className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Assignment
            </a>
          )}
        </Link>
        {session && (
          <>
            <div className="w-full block w-auto flex items-center">
              <ul className="flex flex-col mt-4 flex-row space-x-8 mt-0 text-sm font-medium">
                <li>
                  <a
                    onClick={signOut}
                    className="cursor-pointer block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
