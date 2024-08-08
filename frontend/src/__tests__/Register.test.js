import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../components/Register';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

test('registers a user', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: { hasError: false } });

    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await screen.findByRole('button', { name: /Register/i });

    expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/api/user/signup`,
        { email: 'test@example.com', password: 'Password123!' }
    );
});
