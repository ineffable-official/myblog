import Link from "next/link";

import Logo from "./logo.svg";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [searchForm, setSearchForm] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full h-[96px] px-8 bg-red-400 flex items-center navbar-bg text-white">
      <div className="h-12 px-2 flex items-center">
        <Image
          priority
          src={Logo}
          alt=""
          height={13}
          style={{ stroke: "#fff", fill: "#fff" }}
        />
      </div>
      <ul className="mx-auto text-sm">
        <li className="inline-block px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-gray-300 rounded-lg cursor-pointer transition-all duration-150 ease-in-out">
          <Link href="/">Home</Link>
        </li>
        <li className="inline-block px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-gray-300 rounded-lg cursor-pointer transition-all duration-150 ease-in-out">
          Trendings
        </li>
        <li className="inline-block px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-gray-300 rounded-lg cursor-pointer transition-all duration-150 ease-in-out">
          Categories
        </li>
        <li className="inline-block px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-gray-300 rounded-lg cursor-pointer transition-all duration-150 ease-in-out">
          Contacts
        </li>
        <li className="inline-block px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-gray-300 rounded-lg cursor-pointer transition-all duration-150 ease-in-out">
          Abouts
        </li>
      </ul>
      <div className="flex gap-2">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)]"
          onClick={(e) => setSearchForm(!searchForm)}
        >
          <i className="fa-light fa-search"></i>
        </div>
        <Link
          href="/auth/login"
          className="py-2 px-4 bg-blue-500 rounded-lg font-medium text-sm hover:bg-blue-600 transition-all duration-150 ease-in-out"
        >
          LOGIN
        </Link>
      </div>
      {searchForm ? (
        <div className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <form action="/search">
            <div className="flex">
              <input
                type="search"
                name="q"
                id="search"
                placeholder="Search..."
                className="h-[72px] text-6xl bg-transparent font-medium outline-none"
              />
              <button
                type="submit"
                className="w-[72px] h-[72px] flex items-center justify-center text-4xl"
              >
                <i className="fa-light fa-search"></i>
              </button>
              <div
                className="w-[72px] h-[72px] flex items-center justify-center text-4xl"
                onClick={(e) => setSearchForm(!searchForm)}
              >
                <i className="fa-light fa-x"></i>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
