export default function Article({post}){
    return <div className="w-full h-auto">
        {post.title.rendered}
    </div>
}