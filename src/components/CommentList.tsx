import { Comment } from "@/types/Comment";
import '@/styles/comment-list.css';

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="comment-list">
      {comments.slice(0, 10).map((comment) => (
        <div key={comment.id} className="comment-wrapper">
          <div className='comment-header'>
            <div className='comment-id'>#{comment.id}</div>
            <div className='comment-name'>{comment.name}</div>
          </div>
          <div className='comment-body'>{comment.body}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
