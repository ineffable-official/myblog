import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Category from "./Category";
import Link from "next/link";

export default function PostCard(props) {
  const [thumb, setThumb] = useState([]);
  const [thumbLoading, setThumbLoading] = useState(false);
  const [author, setAuthor] = useState([]);
  const [authorLoading, setAuthorLoading] = useState(false);

  const getThumb = useCallback(() => {
    if (!props.data.featured_media) {
      return;
    }
    setThumbLoading(true);
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/wp/v2/media/" +
          props.data.featured_media
      )
      .then((res) => {
        setThumb(res.data);
        setThumbLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [props]);

  const getAuthor = useCallback(() => {
    setAuthorLoading(true);
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + "/wp/v2/users/" + props.data.author
      )
      .then((res) => {
        setAuthor(res.data);
        setAuthorLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [props]);

  const formatDate = (date) => {
    return date;
  };

  useEffect(() => {
    getThumb();
    getAuthor();
  }, [getThumb, getAuthor]);

  if (props.data)
    return (
      <div className="w-full h-auto">
        {props.data.featured_media ? (
          <div
            className="rounded-xl overflow-hidden flex items-center justify-center"
            style={{ maxHeight: props.headPost ? "350px" : "auto" }}
          >
            {thumbLoading ? (
              <div className="w-full h-[200px] bg-[rgba(0,0,0,0.1)] flex items-center justify-center">
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
        <div className="py-2">
          <div className="flex flex-wrap py-2 gap-2">
            {props.data.categories
              ? props.data.categories.map((c) => (
                  <Category category_id={c} key={c} />
                ))
              : ""}
          </div>
          <Link
            href={"post?s=" + props.data.slug}
            className="font-medium text-lg py-2"
            style={{
              fontSize: props.headPost ? "28px" : "",
              fontWeight: props.headPost ? "600" : "",
              lineHeight: props.headPost ? "35px" : "28px",
            }}
          >
            {props.data.title.rendered}
          </Link>
          <div className="py-2 max-h-[128px] overflow-hidden text-gray-500 text-sm">
            <div
              dangerouslySetInnerHTML={{ __html: props.data.excerpt.rendered }}
            ></div>
          </div>
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
            <div
              className="w-full h-12 bg-[rgba(0,0,0,0.1)] rounded-lg flex items-center justify-center py-1"
              style={{ width: props.headPost ? "300px" : "" }}
            >
              <div className="w-8 h-8 flex items-center justify-center animate-spin">
                <i className="fa-light fa-spinner"></i>
              </div>
            </div>
          )}
          <div className="text-xs">
            {moment(props.data.date_gmt).fromNow()} -{" "}
            {formatDate(props.data.date_gmt)}
          </div>
        </div>
      </div>
    );
}
