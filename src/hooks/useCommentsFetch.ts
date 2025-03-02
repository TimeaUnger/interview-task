import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setComments, setLoading, setError } from '@/redux/commentsSlice';

const useCommentsFetch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        dispatch(setComments(response.data));
      } catch (err) {
        dispatch(setError('Sorry, the requested page or resource could not be found.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchComments();
  }, [dispatch]);
};

export default useCommentsFetch;
