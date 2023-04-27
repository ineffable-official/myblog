import { useCallback, useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import axios from "axios";

export default function Comments({ postID }) {
  const [comments, setComments] = useState([]);

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

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className="w-full h-auto">
      <h2>Comments</h2>
      <div className="w-full h-auto border-[1px] mb-16">
        <div className="w-full p-2 border-b-[1px]"></div>
        <form>
          <textarea
            placeholder="Type your comments..."
            className="w-full p-4 outline-none"
          ></textarea>
        </form>
        <div className="w-full border-t-[1px] flex text-gray-500">
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center border-r-[1px] hover:bg-[rgba(0,0,0,0.05)]"
          >
            <i className="fa-light fa-send"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">{filterParent(comments)}</div>
    </div>
  );
}
