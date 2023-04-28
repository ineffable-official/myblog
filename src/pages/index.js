import MainLayout from "@/components/MainLayout";
import Newsletter from "@/components/Newsletter";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);
  const [headPost, setHeadPost] = useState([]);

  const getHeadPost = useCallback(() => {
    setLoading1(true);
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/wp/v2/posts?per_page=1&orderBy=modified"
      )
      .then((res) => {
        setHeadPost(res.data);
        setLoading1(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const getLatestPosts = useCallback(() => {
    setLoading1(true);

    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/wp/v2/posts?per_page=6&orderBy=modified&offset=1"
      )
      .then((res) => {
        setLatestPosts(res.data);
        setLoading1(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    getLatestPosts();
    getHeadPost();
  }, [getLatestPosts, getHeadPost]);

  return (
    <MainLayout>
      <div className="px-8 grid grid-cols-12 gap-8 pt-16 pb-32">
        <div className="w-full h-auto col-span-12 md:col-span-9">
          {!loading1 ? (
            headPost ? (
              headPost.map((p) => (
                <PostCard data={p} key={p.id} headPost={true} />
              ))
            ) : (
              ""
            )
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center">
              <div className="w-8 h-8 flex items-center justify-center animate-spin">
                <i className="fa-light fa-spinner"></i>
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6 mt-8">
            {!loading2 ? (
              latestPosts ? (
                latestPosts.map((p, i) => <PostCard data={p} key={p.id} />)
              ) : (
                ""
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
        <div className="w-full h-12 ml:col-span-3 lg:col-span-3 col-span-12">
          <Newsletter/>
        </div>
      </div>
    </MainLayout>
  );
}
