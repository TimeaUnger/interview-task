import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setComments, setLoading, setError, setTotalPages } from '@/redux/commentsSlice';
import { RootState } from '@/redux/store';

const useCommentsFetch = (page: number) => {
  const dispatch = useDispatch();
  const { commentsByPage, loading } = useSelector((state: RootState) => state.comments);

  useEffect(() => {

    if (commentsByPage[page]) return;

    dispatch(setLoading(true));

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=5`);
        
        dispatch(setComments({ page, comments: response.data }));

        const totalComments = parseInt(response.headers['x-total-count'], 10);
        dispatch(setTotalPages(Math.ceil(totalComments / 5)));
      } catch (err) {
        dispatch(setError('Sorry, the requested page or resource could not be found.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchComments();
  }, [dispatch, page, commentsByPage]);

  return { commentsByPage, loading };
};

export default useCommentsFetch;
