import Article from "@/components/Article";
import MainLayout from "@/components/MainLayout";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Single() {
  const [post, setPost] = useState([]);
  const router = useRouter();
  const { slug } = router.query;

  const getPost = useCallback(() => {
    if (!slug) {
      return;
    }
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/wp/v2/posts?slug=" + slug)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [slug]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <MainLayout>
      <div className="px-8 grid grid-cols-12 gap-8 pt-16 pb-32">
        <div className="w-full h-auto col-span-9 ">
          {post ? post.map((p) => <Article post={p} key={p.id} />) : ""}
        </div>
        <div className="w-full h-12 col-span-3">
          <div className="w-full h-auto p-4 border-[1px]">
            <h1 className="font-semibold text-gray-600">Subscribe</h1>
            <form>
              <h1 className="text-sm text-gray-400 py-1">
                Get notification every update
              </h1>
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
