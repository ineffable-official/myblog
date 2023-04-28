import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Comment from "./Comment";

export default function CommentCard({ user, comment, getComments, parentID }) {
  const [childs, setChilds] = useState([]);
  const [childShow, setChildShow] = useState(false);

  const loadChilds = useCallback(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + "/wp/v2/comments?parent=" + comment.id
      )
      .then((res) => {
        setChilds(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    loadChilds();
  }, [loadChilds]);

  return (
    <div className="flex flex-col mt-4">
      <Comment comment={comment} user={user} getComments={getComments} isParent={true} loadChilds={loadChilds()}/>
      {childShow ? (
        <div className="w-fit border-[1px] p-2 mt-2 flex items-center">
          <div className="h-8 px-2 flex items-center text-gray-500">
            {childs.length} Replies
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.1)] rounded-lg cursor-pointer"
            onClick={() => setChildShow(false)}
          >
            <i className="fa-light fa-arrow-up"></i>
          </div>
        </div>
      ) : (
        <div className="w-fit border-[1px] p-2 mt-2 flex items-center">
          <div className="h-8 px-2 flex items-center text-gray-500">
          {childs.length} Replies
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.1)] rounded-lg cursor-pointer"
            onClick={() => setChildShow(true)}
          >
            <i className="fa-light fa-arrow-down"></i>
          </div>
        </div>
      )}

      {childShow ? (
        <div className="mt-4 flex flex-col">
          {childs
            ? childs.map((c) => (
                <div className="ml-8" key={c.id}>
                  <CommentCard
                    comment={c}
                    user={user}
                    getComments={getComments}
                  />
                </div>
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
