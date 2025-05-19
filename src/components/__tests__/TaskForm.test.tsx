import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '../TaskForm';

describe('TaskForm', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with input, select and button', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('allows entering a task title', async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('Enter task title');
    
    await userEvent.type(input, 'New Task');
    
    expect(input).toHaveValue('New Task');
  });

  it('allows selecting a task status', async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    const select = screen.getByRole('combobox');
    
    await userEvent.selectOptions(select, 'in progress');
    
    expect(select).toHaveValue('in progress');
  });

  it('calls onAddTask with correct values when form is submitted', async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    await userEvent.type(screen.getByPlaceholderText('Enter task title'), 'New Task');
    await userEvent.selectOptions(screen.getByRole('combobox'), 'in progress');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    expect(mockOnAddTask).toHaveBeenCalledWith('New Task', 'in progress');
  });

  it('does not call onAddTask when title is empty', async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('clears the input after successful submission', async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('Enter task title');
    
    await userEvent.type(input, 'New Task');
    await userEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    expect(input).toHaveValue('');
  });
});
