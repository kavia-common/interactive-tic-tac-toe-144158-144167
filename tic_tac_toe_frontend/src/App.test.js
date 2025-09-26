import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title and controls', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /2 Players/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /vs Computer/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Restart/i })).toBeInTheDocument();
  expect(screen.getByRole('grid', { name: /Tic Tac Toe Board/i })).toBeInTheDocument();
});
