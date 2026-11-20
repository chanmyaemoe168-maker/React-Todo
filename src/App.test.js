import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Check All can be reached with the keyboard', () => {
  render(<App />);

  const todoInput = screen.getByPlaceholderText('What do you need to do?');
  const checkAllButton = screen.getByRole('button', { name: 'Check All' });

  userEvent.tab();
  expect(todoInput).toHaveFocus();

  userEvent.tab();
  expect(checkAllButton).toHaveFocus();
});
