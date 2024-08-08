import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import axios from 'axios'; 
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios'); 

test('logs in a user', async () => {
    axios.post.mockResolvedValueOnce({ data: { hasError: false, data: { apiToken: 'test-token' } } });

    const mockOnLogin = jest.fn(); 

    render(
        <MemoryRouter>
            <Login onLogin={mockOnLogin} />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Đợi cho API được gọi
    await screen.findByRole('button', { name: /Login/i });

    expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        { email: 'test@example.com', password: 'Password123!' }
    );

    expect(mockOnLogin).toHaveBeenCalled();
});
