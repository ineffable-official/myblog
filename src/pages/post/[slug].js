import Article from "@/components/Article";
import MainLayout from "@/components/MainLayout";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

function Single({post}) {
   return (
    <MainLayout>
      <div className="px-8 grid grid-cols-12 gap-8 pt-16 pb-32">
        <div className="w-full h-auto col-span-9 ">
          {post ? post.map((p) => <Article post={p} key={p.id} />) : ""}
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

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/wp/v2/posts");
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL +
    "/wp/v2/posts?slug=" +
    params.slug);
  const post = await res.json();

  return { props: { post } };
}

export default Single;