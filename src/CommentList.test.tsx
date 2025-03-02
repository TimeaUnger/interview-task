import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages/Home';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '@/redux/commentsSlice';
import axios from 'axios';

jest.mock('@/styles/comment-list.css', () => 'identity-obj-proxy');
jest.mock('@/styles/spinner.css', () => 'identity-obj-proxy');
jest.mock('axios');

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div>Mocked Chart</div>,
}));

const mockComments = [
  {
    id: 1,
    name: 'User 1',
    body: 'This is a comment.',
  },
  {
    id: 2,
    name: 'User 2',
    body: 'This is another comment.',
  },
];

const mockStore = (state = {}) =>
  configureStore({
    reducer: {
      comments: commentsReducer,
    },
    preloadedState: state,
  });
describe('Home Component', () => {
  test('shows spinner when loading', () => {
    render(
      <Provider store={mockStore()}>
        <Home />
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  test('loads and displays comments', async () => {

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockComments })

    render(
      <Provider store={mockStore()}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      mockComments.forEach((comment) => {
        expect(screen.getByText(comment.name)).toBeInTheDocument();
        expect(screen.getByText(comment.body)).toBeInTheDocument();
      });
    });

  });
});
