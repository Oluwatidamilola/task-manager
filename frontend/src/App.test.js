import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Task Manager heading', async () => {
  // Mock the fetch API to return sample tasks
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, title: 'Task 1' },
          { id: 2, title: 'Task 2' },
        ]),
    })
  );

  render(<App />);

  // Check if the heading is rendered
  const headingElement = screen.getByText(/Task Manager/i);
  expect(headingElement).toBeInTheDocument();

  // Check if the tasks are rendered
  const task1 = await screen.findByText(/Task 1/i);
  const task2 = await screen.findByText(/Task 2/i);

  expect(task1).toBeInTheDocument();
  expect(task2).toBeInTheDocument();

  // Clean up the mock
  global.fetch.mockRestore();
});
