import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders video sharing app', () => {
  render(<App />);
  expect(screen.getByText(/Video Sharing App/i)).toBeInTheDocument();
});
