import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { useTasks } from '../hooks/useTasks';
import { Task, TaskStatus } from '../types';

// Mock the hooks
jest.mock('../hooks/useTasks');

const mockUseTasks = useTasks as jest.MockedFunction<typeof useTasks>;

describe('App', () => {
  const mockAddTask = jest.fn();
  const mockTasks: Task[] = [
    { id: '1', title: 'Existing Task', status: 'to do' as TaskStatus },
  ] as Task[];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTasks.mockReturnValue({
      tasks: [...mockTasks],
      addTask: mockAddTask,
    });
  });

  it('renders the app with title', () => {
    render(<App />);
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
  });

  it('renders TaskForm and TaskList components', () => {
    render(<App />);
    
    // Check for TaskForm elements
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    
    // Check for TaskList
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('passes tasks to TaskList', () => {
    render(<App />);
    
    // Check that the task title is rendered (the status is shown as an emoji)
    const taskItem = screen.getByRole('listitem');
    expect(taskItem).toHaveTextContent('Existing Task');
    // Check for the status emoji (📝 for 'to do')
    expect(taskItem).toHaveTextContent('📝');
  });

  it('passes addTask to TaskForm and handles form submission', async () => {
    render(<App />);
    
    // Type in the task title
    const titleInput = screen.getByPlaceholderText('Enter task title');
    await userEvent.type(titleInput, 'New Task');
    
    // Select status from dropdown
    const statusSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(statusSelect, 'in progress');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /add task/i });
    await userEvent.click(submitButton);
    
    // Verify addTask was called with correct arguments
    expect(mockAddTask).toHaveBeenCalledWith('New Task', 'in progress');
  });

  it('updates the task list when tasks change', () => {
    const updatedTasks = [
      ...mockTasks,
      { id: '2', title: 'New Task', status: 'in progress' as TaskStatus },
    ];
    
    // Mock the updated tasks
    mockUseTasks.mockReturnValue({
      tasks: updatedTasks,
      addTask: mockAddTask,
    });
    
    render(<App />);
    
    // Get all list items
    const listItems = screen.getAllByRole('listitem');
    
    // Check that we have the correct number of list items
    expect(listItems).toHaveLength(2);
    
    // Check that both tasks are rendered with correct content
    expect(listItems[0]).toHaveTextContent('Existing Task');
    expect(listItems[0]).toHaveTextContent('📝');
    expect(listItems[1]).toHaveTextContent('New Task');
    expect(listItems[1]).toHaveTextContent('🔄');
  });
});
