export default function CommentCard({ comment }) {
  return (
    <div className="w-full h-auto border-[1px]">
      <div className="p-8">
        <div className="text-sm"
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
          <div className="text-sm text-[rgba(0,0,0,0.7)]">{comment.author_name}</div>
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
        {/* <div className="w-fit flex items-center justify-center p-2 gap-2 border-r-[1px] text-gray-500">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="fa-light fa-reply"></i>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
