import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'inversify-react';
import container from './container';
import App from './App';

describe('App', () => {
  it('renders the todo list', () => {
    render(
      <Provider container={container}>
        <App />
      </Provider>
    );
    
    const heading = screen.getByText('To-Do List');
    expect(heading).toBeInTheDocument();
  });
});
