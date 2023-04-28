import { useCallback, useEffect, useState } from "react";
import Category from "./Category";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import Comments from "./Comments";

export default function Article({ post }) {
  const [thumb, setThumb] = useState([]);
  const [thumbLoading, setThumbLoading] = useState(false);
  const [author, setAuthor] = useState([]);
  const [authorLoading, setAuthorLoading] = useState(false);

  const getThumb = useCallback(() => {
    if (!post.featured_media) {
      return;
    }
    setThumbLoading(true);
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + "/wp/v2/media/" + post.featured_media
      )
      .then((res) => {
        setThumb(res.data);
        setThumbLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [post]);

  const getAuthor = useCallback(() => {
    setAuthorLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/wp/v2/users/" + post.author)
      .then((res) => {
        setAuthor(res.data);
        setAuthorLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [post]);

  const formatDate = (date) => {
    return date;
  };

  useEffect(() => {
    getThumb();
    getAuthor();
  }, [getThumb, getAuthor]);

  return (
    <div className="w-full h-auto">
      <div className="flex flex-wrap py-2 gap-2">
        {post.categories
          ? post.categories.map((c) => <Category category_id={c} key={c} />)
          : ""}
      </div>
      <div className="text-4xl font-semibold">{post.title.rendered}</div>
      <div className="py-2 flex items-center">
        <div className="flex items-center gap-2 text-sm">
          {!authorLoading ? (
            <div className="flex gap-2 py-2 items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <picture>
                  <img
                    src={
                      author
                        ? author.avatar_urls
                          ? author.avatar_urls["96"]
                          : ""
                        : ""
                    }
                    alt=""
                  />
                </picture>
              </div>
              <div className="text-sm text-[rgba(0,0,0,0.7)]">
                {author.name}
              </div>
            </div>
          ) : (
            <div className="w-[100px] h-12 bg-[rgba(0,0,0,0.1)] rounded-lg flex items-center justify-center py-1">
              <div className="w-8 h-8 flex items-center justify-center animate-spin">
                <i className="fa-light fa-spinner"></i>
              </div>
            </div>
          )}
          <div>-</div>
          <div>{formatDate(post.date_gmt)}</div>
          <div>-</div>
          <div className="flex gap-2 py-2 items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
              <i className="fa-light fa-clock"></i>
            </div>
            <div className="text-sm text-[rgba(0,0,0,0.7)]">
              {post.yoast_head_json.twitter_misc["Est. reading time"]}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 py-2 text-sm">
        <Link
          href={
            "https://www.facebook.com/sharer/sharer.php?u=https://nimetoon.my.id/post/" +
            post.slug
          }
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 flex items-center gap-2 rounded-lg"
        >
          <div className="w-6 h-6 flex items-center justify-center text-white">
            <i className="fa-brands fa-facebook"></i>
          </div>
          <div className="text-white">Facebook</div>
        </Link>
        <Link
          href={
            "https://web.whatsapp.com/send?text=https://nimetoon.my.id/post/" +
            post.slug
          }
          className="py-2 px-4 bg-green-500 hover:bg-green-600 flex items-center gap-2 rounded-lg"
        >
          <div className="w-6 h-6 flex items-center justify-center text-white">
            <i className="fa-brands fa-whatsapp"></i>
          </div>
          <div className="text-white">Whatsapp</div>
        </Link>
        <Link
          href={
            "https://twitter.com/intent/tweet?text=&url=https://nimetoon.my.id/post/" +
            post.slug
          }
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 flex items-center gap-2 rounded-lg"
        >
          <div className="w-6 h-6 flex items-center justify-center text-white">
            <i className="fa-brands fa-twitter"></i>
          </div>
          <div className="text-white">Twitter</div>
        </Link>
      </div>
      {post.featured_media ? (
        <div className="h-[300px] my-4 rounded-xl overflow-hidden flex items-center justify-center">
          {thumbLoading ? (
            <div className="w-full h-[300px] bg-[rgba(0,0,0,0.1)] flex items-center justify-center">
              <div className="w-8 h-8 flex items-center justify-center animate-spin">
                <i className="fa-light fa-spinner"></i>
              </div>
            </div>
          ) : (
            <picture>
              <img
                src={thumb ? (thumb.guid ? thumb.guid.rendered : "") : ""}
                className="w-full"
                alt=""
              />
            </picture>
          )}
        </div>
      ) : (
        ""
      )}
      <article
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        className="leading-7 mt-8"
      ></article>
      <Comments postID={post.id} />
    </div>
  );
}
