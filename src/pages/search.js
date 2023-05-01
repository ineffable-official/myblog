import MainLayout from "@/components/MainLayout";
import Newsletter from "@/components/Newsletter";
import PostCard from "@/components/PostCard";
import axios from "axios";
import Head from "next/head";
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
      <Head>
        <title>Search: {router.query.q} -Nimetoon</title>
      </Head>
        <div className="w-full h-auto md:col-span-9 col-span-12">
          <div className="grid md:grid-cols-3 gap-6 mt-8">
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
        <div className="w-full h-12 md:col-span-3 col-span-12">
          <Newsletter/>
        </div>
      </div>
    </MainLayout>
  );
}
