import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useCommentsFetch from '@/hooks/useCommentsFetch';
import { setPage } from '@/redux/commentsSlice';
import { RootState } from '@/redux/store';
import CommentList from '@/components/CommentList';
import WordCountChart from '@/components/WordCountChart';
import Spinner from '@/components/Spinner';
import HelpSection from '@/components/HelpSection';
import Pagination from '@/components/Pagination';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, loading: reduxLoading } = useSelector(
    (state: RootState) => state.comments
  );

  const { comments, loading: queryLoading, totalPages: queryTotalPages } = useCommentsFetch(currentPage);
  const isLoading = reduxLoading || queryLoading;

  const handlePrevPage = () => {
    if (currentPage > 1) dispatch(setPage(currentPage - 1));
  };

  const handleNextPage = () => {
    if (currentPage < (queryTotalPages || totalPages)) {
      dispatch(setPage(currentPage + 1));
    }
  };

  return (
    <>
      <HelpSection />
      <div className="flex flex-col items-center px-4">

        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Comments & Word Count Analysis
        </h1>

        {isLoading && !comments.length && <Spinner />}

        <WordCountChart comments={comments} />
        <CommentList comments={comments} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          queryTotalPages={queryTotalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </>

  );
};

export default Home;
