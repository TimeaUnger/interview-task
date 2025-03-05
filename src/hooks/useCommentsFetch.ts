import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { setComments, setLoading, setError, setTotalPages } from '@/redux/commentsSlice';
import { RootState } from '@/redux/store';

const fetchComments = async (page: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=5`
  );
  return {
    comments: response.data,
    totalPages: Math.ceil(parseInt(response.headers['x-total-count'], 10) / 5),
  };
};

const useCommentsFetch = (page: number) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { commentsByPage, loading, totalPages } = useSelector((state: RootState) => state.comments);

  const cachedComments = commentsByPage[page];

  const { data, isLoading, isError, isFetching } = useQuery(
    ['comments', page],
    () => fetchComments(page),
    {
      enabled: !cachedComments,
      onSuccess: (data) => {
        
        dispatch(setComments({ page, comments: data.comments }));
        if (page === 1) {
          dispatch(setTotalPages(data.totalPages));
        }

        if (data.totalPages) {
          const totalPages = data.totalPages;

          const pagesToPrefetch = [page + 1, page + 2, page + 3].filter(nextPage => nextPage <= totalPages);

          pagesToPrefetch.forEach((nextPage) => {
            if (!queryClient.getQueryData(['comments', nextPage])) {
              queryClient.prefetchQuery({
                queryKey: ['comments', nextPage],
                queryFn: () => fetchComments(nextPage),
              });
            }
          });
        }
      },
      onError: () => {
        dispatch(setError('Sorry, the requested page or resource could not be found.'));
      },
      onSettled: () => {
        dispatch(setLoading(false));
      },
    }
  );

  useEffect(() => {
    if (isLoading && !cachedComments) {
      dispatch(setLoading(true));
    }
    else if (!isLoading || isError) {
      dispatch(setLoading(false));
    }
  }, [dispatch, isLoading, isError, cachedComments]);

  return {
    comments: cachedComments || data?.comments || [],
    loading: isLoading || isFetching || loading,
    totalPages: data?.totalPages || totalPages,
  };
};

export default useCommentsFetch;
