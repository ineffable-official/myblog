import MainLayout from "@/components/MainLayout";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(() => {
    if (!router.query.q) {
      return;
    }
    setLoading(true);
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/wp/v2/posts?search=" +
          router.query.q
      )
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [router]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <MainLayout>
      <div className="px-8 grid grid-cols-12 gap-8 pt-16 pb-32">
        <div className="w-full h-auto col-span-9 ">
          <div className="grid grid-cols-3 gap-6 mt-8">
            {!loading ? (
              posts ? (
                posts.map((p, i) => <PostCard data={p} key={p.id} />)
              ) : (
                "NOT FOUND"
              )
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center animate-spin">
                  <i className="fa-light fa-spinner"></i>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-12 col-span-3">
          <div className="w-full h-auto p-4 border-[1px]">
            <div className="font-semibold text-gray-600">Subscribe</div>
            <form>
              <div className="text-sm text-gray-400 py-1">
                Get notification every update
              </div>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  className="w-full h-10 border-[1px] p-2 text-sm font-medium outline-none "
                />
                <button
                  type="submit"
                  className="w-10 h-10 flex items-center justify-center text-gray-400"
                >
                  <i className="fa-light fa-send"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
