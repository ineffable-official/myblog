import { useCallback, useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import axios from "axios";
import Link from "next/link";

export default function Comments({ postID }) {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState();
  const [curCookie, setCurCookie] = useState();
  const [loadUser, setLoadUser] = useState(false);

  const getComments = useCallback(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/wp/v2/comments?post=" + postID)
      .then((res) => setComments(res.data))
      .catch((err) => {
        throw err;
      });
  }, [postID]);

  const filterParent = (comments) => {
    const c_new = [];
    comments.forEach((c) => {
      if (c.parent === 0) {
        c_new.push(c);
      }
    });

    return c_new.map((c) => (
      <div className="flex flex-col" key={c.id}>
        <CommentCard comment={c} />
        <div className="flex flex-col gap-4 mt-4 ml-16">
          {filterChildren(comments, c.id)
            ? filterChildren(comments, c.id).map((child) => (
                <CommentCard comment={child} key={child.id} />
              ))
            : ""}
        </div>
      </div>
    ));
  };

  const filterChildren = (c, parentID) => {
    const c_child = [];

    c.forEach((c) => {
      if (c.parent === parentID) {
        c_child.push(c);
      }
    });

    return c_child;
  };

  const validateCookie = useCallback(() => {
    setLoadUser(true);
    const cookie = localStorage.getItem("cookie");
    const userID = localStorage.getItem("user_id");
    const userData = localStorage.getItem("user");

    if (cookie !== null) {
      axios
        .get(
          process.env.NEXT_PUBLIC_BASE_API +
            "/api/user/validate_auth_cookie/?cookie=" +
            cookie
        )
        .then((res) => {
          if (res.data.status !== "ok") {
            setLoadUser(false);
            return;
          }

          if (res.data.valid) {
            setCurCookie(cookie);
          }

          if (res.data.valid && userID !== null && user === null) {
            axios
              .get(
                process.env.NEXT_PUBLIC_BASE_API +
                  "/api/user/get_userinfo/?user_id=" +
                  userID
              )
              .then((res2) => {
                setUser(res2.data);
                setLoadUser(false);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            setUser(JSON.parse(userData));
            setLoadUser(false);
          }
        })
        .catch((err) => {
          throw err;
        });
    } else {
      setLoadUser(false);
    }
  }, []);

  const postComment = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    axios
      .get(
        process.env.NEXT_PUBLIC_BASE_API +
          `/api/user/post_comment/?cookie=${curCookie}&post_id=${postID}&content=${form.get(
            "content"
          )}&comment_status=1`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((rrr) => {
        throw err;
      });
  };

  useEffect(() => {
    validateCookie();
    getComments();
  }, [getComments, validateCookie]);

  return (
    <div className="w-full h-auto">
      <h2>Comments</h2>
      {user ? (
        <div className="w-full h-auto border-[1px] mb-16">
          <div className="w-full p-2 border-b-[1px]">
            <div className="flex gap-2 items-center">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden"
                onClick={(e) => setSearchForm(!searchForm)}
              >
                <picture>
                  <img
                    src="https://secure.gravatar.com/avatar/e5d559aa821d4d66798a76007effd1d9?s=96&d=mm&r=g"
                    alt=""
                  />
                </picture>
              </div>
              <div className="font-medium text-sm ">{user.displayname}</div>
            </div>
          </div>
          <form onSubmit={postComment}>
            <textarea
              name="content"
              id="content"
              placeholder="Type your comments..."
              className="w-full p-4 outline-none"
            ></textarea>
            <div className="w-full border-t-[1px] flex text-gray-500">
              <button
                type="submit"
                className="w-10 h-10 flex items-center justify-center border-r-[1px] hover:bg-[rgba(0,0,0,0.05)]"
              >
                <i className="fa-light fa-send"></i>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-fit py-2 my-4 text-white px-4 bg-blue-500 font-medium text-sm hover:bg-blue-600 transition-all duration-150 ease-in-out">
          <Link href="/auth/login">LOGIN</Link>
        </div>
      )}
      <div className="flex flex-col gap-4">{filterParent(comments)}</div>
    </div>
  );
}
