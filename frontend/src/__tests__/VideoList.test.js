import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoList from '../components/VideoList';
import axios from 'axios';

jest.mock('axios');

test('fetches and displays videos', async () => {
    const mockVideos = {
        data: {
            hasError: false,
            data: {
                videos: [
                    { id: '1', link: 'http://test.com/video1.mp4', title: 'Test Video 1', description: 'Description 1', email: 'user1@example.com' },
                    { id: '2', link: 'http://test.com/video2.mp4', title: 'Test Video 2', description: 'Description 2', email: 'user2@example.com' },
                ]
            }
        }
    };
    axios.get.mockResolvedValueOnce(mockVideos);

    render(<VideoList />);

    expect(await screen.findByText(/Test Video 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Test Video 2/i)).toBeInTheDocument();
});
