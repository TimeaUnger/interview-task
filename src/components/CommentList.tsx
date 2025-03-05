import { Comment } from "@/types/Comment";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="grid gap-4 max-w-3xl mx-auto py-4">
      {comments.slice(0, 5).map((comment) => (
        <div
          key={comment.id}
          className="bg-white shadow-md rounded-lg p-3 border border-gray-200 transition hover:shadow-lg"
        >
          <div className="flex items-center mb-1">
            <span className="font-semibold text-sm mr-2">#{comment.id}</span>
            <span className="text-gray-800 font-medium text-sm">{comment.name}</span>
          </div>
          <p className="text-gray-700 text-xs leading-snug">{comment.body}</p>
        </div>
      ))}
    </div>


  );
};

export default CommentList;
