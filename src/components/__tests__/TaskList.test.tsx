import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskList } from '../TaskList';
import { Task } from '../../types';

describe('TaskList', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', status: 'to do' },
    { id: '2', title: 'Task 2', status: 'in progress' },
    { id: '3', title: 'Task 3', status: 'done' },
  ];

  it('renders a message when no tasks are provided', () => {
    render(<TaskList tasks={[]} />);
    
    expect(screen.getByText('No tasks yet. Add a task to get started!')).toBeInTheDocument();
    
    // Check that there are no list items
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  it('renders all provided tasks with correct emojis', () => {
    render(<TaskList tasks={mockTasks} />);
    
    // Check that we have the correct number of list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockTasks.length);
    
    // Check that each task is rendered with the correct emoji
    mockTasks.forEach((task, index) => {
      const taskElement = listItems[index];
      expect(taskElement).toHaveTextContent(task.title);
      
      // Check for status emoji
      const statusEmoji = {
        'backlog': '📋',
        'to do': '📝',
        'in progress': '🔄',
        'done': '✅'
      }[task.status];
      
      expect(taskElement).toHaveTextContent(statusEmoji);
    });
  });
});
