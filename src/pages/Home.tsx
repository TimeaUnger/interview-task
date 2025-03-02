import WordCountChart from '@/components/WordCountChart';
import CommentList from '@/components/CommentList';
import Spinner from '@/components/Spinner';
import { useSelector } from 'react-redux';
import useCommentsFetch from '@/hooks/useCommentsFetch';
import { CommentsState } from "@/types/Comment";
interface RootState {
  comments: CommentsState;
}

const Home = () => {
  useCommentsFetch(); 

  const { comments, loading, error } = useSelector((state: RootState) => state.comments);

  return (
    <div>
      {loading && <Spinner />}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && (
        <>
          <h1>Comments & Word Count Analysis</h1>
          <WordCountChart comments={comments} />
          <CommentList comments={comments} />
        </>
      )}
    </div>
  );
};

export default Home;
