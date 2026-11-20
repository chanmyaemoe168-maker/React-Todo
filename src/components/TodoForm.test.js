import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from './TodoForm';

test('submits the created todo', () => {
  const addTodo = jest.fn();
  render(<TodoForm addTodo={addTodo} />);

  userEvent.type(
    screen.getByPlaceholderText('What do you need to do?'),
    'Buy groceries{enter}'
  );

  expect(addTodo).toHaveBeenCalledWith({
    id: expect.any(Number),
    title: 'Buy groceries',
    completed: false
  });
});
