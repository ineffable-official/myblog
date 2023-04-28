import axios from "axios";
import { useRef, useState } from "react";

export default function Comment({ comment, user, getComments, loadChilds }) {
  const [replyForm, setReplyForm] = useState(false);
  const replyFormRef = useRef();

  const handleReply = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const data = {
      post: comment.post,
      author_name: user.displayname,
      author_email: user.email,
      content: form.get("reply_content"),
      parent: comment.id,
    };

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/wp/v2/comments/create", data)
      .then((res) => {
        getComments();
        loadChilds();
        replyFormRef.current.value = "";
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="w-full h-auto border-[1px]">
      <div className="p-8">
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
        ></div>
      </div>
      <div className="w-full border-t-[1px] flex">
        <div className="w-fit flex gap-2 py-2 items-center border-r-[1px] p-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <picture>
              <img src={comment.author_avatar_urls["96"]} alt="" />
            </picture>
          </div>
          <div className="text-sm text-[rgba(0,0,0,0.7)]">
            {comment.author_name}
          </div>
        </div>
        {/* <div className="w-fit flex items-center justify-center p-2 gap-2 border-r-[1px] text-gray-500">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 flex items-center justify-center">
          <i className="fa-light fa-heart"></i>
        </div>
        <div className="text-xs">10.000rb</div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 flex items-center justify-center">
          <i className="fa-light fa-comment"></i>
        </div>
        <div className="text-xs">53.000rb</div>
      </div>
    </div> */}
        <div className="w-fit flex items-center justify-center p-2 gap-2 border-r-[1px] text-gray-500 ">
          <div
            className="flex gap-2 items-center hover:bg-[rgba(0,0,0,0.1)] rounded-lg cursor-pointer"
            onClick={() => setReplyForm(!replyForm)}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="fa-light fa-reply"></i>
            </div>
          </div>
        </div>
      </div>
      {replyForm ? (
        <div className="border-t-[1px]">
          <form onSubmit={handleReply}>
            <textarea
              name="reply_content"
              id="reply_content"
              placeholder="Type your comments..."
              className="w-full p-4 outline-none"
              ref={replyFormRef}
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
        ""
      )}
    </div>
  );
}
