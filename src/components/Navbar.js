import Link from "next/link";

import Logo from "./logo.svg";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import axios from "axios";

export default function Navbar() {
  const [searchForm, setSearchForm] = useState(false);
  const [user, setUser] = useState();
  const [loadUser, setLoadUser] = useState(false);
  const [menus, setMenus] = useState([]);
  const [loadMenus, setLoadMenus] = useState(false);
  const router = useRouter();
  const [mobileMenus, setMobileMenus] = useState(false);

  const validateCookie = useCallback(() => {
    setLoadUser(true);
    const cookie = localStorage.getItem("cookie");
    const userID = localStorage.getItem("user_id");
    const userData = localStorage.getItem("user");

    if (cookie !== null) {
      axios
        .get(
          process.env.NEXT_PUBLIC_BASE_API +
            "/api/user/validate_auth_cookie/?cookie=" +
            cookie
        )
        .then((res) => {
          if (res.data.status !== "ok") {
            setLoadUser(false);
            return;
          }

          if (res.data.valid && userID !== null && user === null) {
            axios
              .get(
                process.env.NEXT_PUBLIC_BASE_API +
                  "/api/user/get_userinfo/?user_id=" +
                  userID
              )
              .then((res2) => {
                setUser(res2.data);
                setLoadUser(false);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            setUser(JSON.parse(userData));
            setLoadUser(false);
          }
        })
        .catch((err) => {
          throw err;
        });
    } else {
      setLoadUser(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cookie");
    localStorage.removeItem("cookie_admin");
    localStorage.removeItem("cookie_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");

    router.push("/auth/login");
  };

  const getMenus = useCallback(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_API + "/api/get_menu?name=Main Menus")
      .then((res) => setMenus(res.data.menu))
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    validateCookie();
    getMenus();
  }, [validateCookie, getMenus]);

  return (
    <div className="w-full h-[96px] px-8 bg-red-400 flex items-center navbar-bg text-white">
      <div className="h-12 px-2 flex items-center mr-auto">
        <Image
          priority
          src={Logo}
          alt=""
          height={13}
          style={{ stroke: "#fff", fill: "#fff" }}
        />
      </div>
      <ul className="text-sm text-center hidden md:block">
        {!loadMenus ? (
          menus ? (
            menus.map((m) => (
              <li
                className="inline-block px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-gray-300 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                key={m.ID}
              >
                <Link href={m.url}>{m.title}</Link>
              </li>
            ))
          ) : (
            ""
          )
        ) : (
          <div className="w-24 h-8 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 flex items-center justify-center animate-spin">
              <i className="fa-light fa-spinner"></i>
            </div>
          </div>
        )}
      </ul>
      <div className="flex gap-2 ml-auto">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)]"
          onClick={(e) => setSearchForm(!searchForm)}
        >
          <i className="fa-light fa-search"></i>
        </div>
        {!loadUser ? (
          !user ? (
            <Link
              href="/auth/login"
              className="py-2 px-4 bg-blue-500 rounded-lg font-medium text-sm hover:bg-blue-600 transition-all duration-150 ease-in-out"
            >
              LOGIN
            </Link>
          ) : (
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
                <picture>
                  <img
                    src="https://secure.gravatar.com/avatar/e5d559aa821d4d66798a76007effd1d9?s=96&d=mm&r=g"
                    alt=""
                  />
                </picture>
              </div>
              <div className="font-medium text-sm ">{user.displayname}</div>
              <div
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)]"
                onClick={handleLogout}
              >
                <i className="fa-light fa-arrow-right-from-bracket"></i>
              </div>
            </div>
          )
        ) : (
          <div className="w-[100px] h-8 bg-[rgba(255,255,255,0.1)] flex items-center justify-center rounded-xl">
            <div className="w-8 h-8 flex items-center justify-center animate-spin">
              <i className="fa-light fa-spinner"></i>
            </div>
          </div>
        )}
        <div
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] md:hidden"
          onClick={() => setMobileMenus(!mobileMenus)}
        >
          <i className="fa-light fa-bars"></i>
        </div>
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
                className="md:h-[72px] md:text-6xl bg-transparent font-medium outline-none"
              />
              <button
                type="submit"
                className="md:file:w-[72px] h-[72px] flex items-center justify-center md:text-4xl"
              >
                <i className="fa-light fa-search"></i>
              </button>
              <div
                className="w-[72px] md:h-[72px] flex items-center justify-center md:text-4xl"
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
      {mobileMenus ? (
        <div className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center flex-col">
          <ul className="mx-auto text-sm text-center flex flex-col gap-2">
            {!loadMenus ? (
              menus ? (
                menus.map((m) => (
                  <li
                    className="inline-block px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-gray-300 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                    key={m.ID}
                  >
                    <Link href={m.url}>{m.title}</Link>
                  </li>
                ))
              ) : (
                ""
              )
            ) : (
              <div className="w-24 h-8 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center animate-spin">
                  <i className="fa-light fa-spinner"></i>
                </div>
              </div>
            )}
          </ul>
          <div
            className="w-12 h-12 flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] hover:text-gray-300 rounded-lg cursor-pointer"
            onClick={(e) => setMobileMenus(!mobileMenus)}
          >
            <i className="fa-light fa-x"></i>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
