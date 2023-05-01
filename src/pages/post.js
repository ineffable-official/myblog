import Article from "@/components/Article";
import MainLayout from "@/components/MainLayout";
import Newsletter from "@/components/Newsletter";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

function Single() {
  const [post, setPost] = useState([]);
  const router = useRouter();

  const getPost = useCallback(() => {
    if (!router.query.s) {
      return;
    }
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + "/wp/v2/posts?slug=" + router.query.s
      )
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [router]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <MainLayout>
      <div className="md:px-8 px-4 grid grid-cols-12 gap-8 pt-16 pb-32">
        <div className="w-full h-auto col-span-12 md:col-span-9 ">
          {post ? post.map((p) => <Article post={p} key={p.id} />) : ""}
        </div>
        <div className="w-full h-12 md:col-span-3 col-span-12">
          <Newsletter />
        </div>
      </div>
    </MainLayout>
  );
}

export default Single;
