import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import ShareVideo from '../components/ShareVideo';
import axios from 'axios'; 

jest.mock('axios');

test('shares a video', async () => {
    axios.post.mockResolvedValueOnce({ data: { hasError: false } }); 

    render(<ShareVideo />);

    fireEvent.change(screen.getByLabelText(/YouTube URL/i), { target: { value: 'http://test.com/video.mp4' } });
    fireEvent.click(screen.getByRole('button', { name: /Share/i }));

    
    expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/api/share-video`,
        { link: 'http://test.com/video.mp4' },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
});
