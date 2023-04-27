import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Signup() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={poppins.style}
    >
      <div className="p-8">
        <div className="w-full text-center text-3xl font-bold">
          Create an account
        </div>
        <div className="w-[300px] text-gray-500 text-sm my-4 text-center">
          Buat akun untuk menemukan hal baru
        </div>
        <form className="mt-4">
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500">
              <i className="fa-light fa-at"></i>
            </div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Yourname"
              className="border-[1px] w-[300px] h-11 border-l-0 px-4 outline-none rounded-r-lg text-sm"
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500">
              <i className="fa-light fa-at"></i>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border-[1px] w-[300px] h-11 border-l-0 px-4 outline-none rounded-r-lg text-sm"
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 border-[1px] flex items-center justify-center rounded-l-lg text-gray-500">
              <i className="fa-light fa-key"></i>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border-[1px] w-[300px] h-11 border-l-0 px-4 outline-none rounded-r-lg text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-[#3A54AA] hover:bg-[#31478f] text-white text-sm font-medium mb-2"
          >
            SIGNUP
          </button>
          <div className="w-full h-11 rounded-lg bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] text-black text-sm font-medium flex items-center justify-center">
            <Link href="/auth/login">LOGIN</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
