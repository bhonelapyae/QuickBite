import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome to QuickBite/i);
  expect(headingElement).toBeInTheDocument();
});
