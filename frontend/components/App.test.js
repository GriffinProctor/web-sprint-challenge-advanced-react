import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFunctional from './AppFunctional';

test('renders coordinates heading', () => {
  render(<AppFunctional />);
  const coordinatesHeading = screen.getByText(/Coordinates/i);
  expect(coordinatesHeading).toBeInTheDocument();
});

test('renders steps heading', () => {
  render(<AppFunctional />);
  const stepsHeading = screen.getByText(/You moved/i);
  expect(stepsHeading).toBeInTheDocument();
});

test('renders movement buttons', () => {
  render(<AppFunctional />);
  const leftButton = screen.getByText(/LEFT/i);
  const upButton = screen.getByText(/UP/i);
  const rightButton = screen.getByText(/RIGHT/i);
  const downButton = screen.getByText(/DOWN/i);
  const resetButton = screen.getByText(/reset/i);

  expect(leftButton).toBeInTheDocument();
  expect(upButton).toBeInTheDocument();
  expect(rightButton).toBeInTheDocument();
  expect(downButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});

test('typing in the email input updates its value', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText(/type email/i);
  const testEmail = 'test@example.com';

  fireEvent.change(emailInput, { target: { value: testEmail } });

  expect(emailInput).toHaveValue(testEmail);
});

test('clicking on movement button triggers the corresponding move function', () => {
  render(<AppFunctional />);
  const leftButton = screen.getByText(/LEFT/i);

  const stepsElement = screen.getByText(/You moved 0 time/i);

  fireEvent.click(leftButton);

  expect(stepsElement).toHaveTextContent('You moved 1 time');
});