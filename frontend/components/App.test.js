import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for custom matchers

import AppFunctional from './AppFunctional';

describe('AppFunctional Component', () => {
  test('renders the component', () => {
    render(<AppFunctional />);
    expect(screen.getByText(/Coordinates/i)).toBeInTheDocument();
    expect(screen.getByText(/You moved/i)).toBeInTheDocument();
    expect(screen.getByText(/type email/i)).toBeInTheDocument();
  });

  test('moves "B" to the right on RIGHT button click', () => {
    render(<AppFunctional />);
    const initialCoordinates = screen.getByText(/Coordinates \(2, 2\)/i);

    fireEvent.click(screen.getByText('RIGHT'));

    const updatedCoordinates = screen.getByText(/Coordinates \(3, 2\)/i);
    expect(updatedCoordinates).toBeInTheDocument();
    expect(initialCoordinates).not.toBeInTheDocument();
  });

  test('displays error message when trying to go left beyond the grid', () => {
    render(<AppFunctional />);
    fireEvent.click(screen.getByText('LEFT'));

    const errorMessage = screen.getByText(/You can't go left/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('increments steps counter on each movement', () => {
    render(<AppFunctional />);
    fireEvent.click(screen.getByText('UP'));
    fireEvent.click(screen.getByText('DOWN'));

    const stepsMessage = screen.getByText(/You moved 2 times/i);
    expect(stepsMessage).toBeInTheDocument();
  });

  test('submits the form and displays success message', async () => {
    render(<AppFunctional />);
    fireEvent.click(screen.getByText('DOWN')); // Move to trigger API call
    fireEvent.change(screen.getByPlaceholderText(/type email/i), { target: { value: 'lady@gaga.com' } });
    fireEvent.click(screen.getByText('Submit'));

    // Assuming the success message is "lady win #43" (update based on your actual success message)
    await screen.findByText(/lady win #43/i);
    expect(screen.getByText(/lady win #43/i)).toBeInTheDocument();
  });
});