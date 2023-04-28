import Article from "@/components/Article";
import MainLayout from "@/components/MainLayout";
import Newsletter from "@/components/Newsletter";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

function Single({ post }) {
  return (
    <MainLayout>
      <div className="md:px-8 px-4 grid grid-cols-12 gap-8 pt-16 pb-32">
        <div className="w-full h-auto col-span-12 md:col-span-9 ">
          {post ? post.map((p) => <Article post={p} key={p.id} />) : ""}
        </div>
        <div className="w-full h-12 md:col-span-3 col-span-12">
          <Newsletter/>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/wp/v2/posts");

  const paths = res.data.map((post) => ({ params: { slug: post.slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await axios(
    process.env.NEXT_PUBLIC_API_URL + "/wp/v2/posts?slug=" + params.slug
  );

  const post = res.data;

  return { props: { post } };
}

export default Single;
