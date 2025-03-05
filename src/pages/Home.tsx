import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useCommentsFetch from '@/hooks/useCommentsFetch';
import { setPage } from '@/redux/commentsSlice';
import { RootState } from '@/redux/store';
import CommentList from '@/components/CommentList';
import WordCountChart from '@/components/WordCountChart';
import Spinner from '@/components/Spinner';
import HelpSection from '@/components/HelpSection';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, loading, commentsByPage } = useSelector((state: RootState) => state.comments);
  
  useCommentsFetch(currentPage);

  const comments = commentsByPage[currentPage] || [];

  const handlePrevPage = () => {
    if (currentPage > 1) dispatch(setPage(currentPage - 1));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };  

  return (
    <div>
      <HelpSection />
      <div className="page-title">Comments & Word Count Analysis</div>

      {!comments.length && loading && <Spinner/>}
      
      <WordCountChart comments={comments} />
      <CommentList comments={comments} />

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
