
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('FreshPal App', () => {
  it('renders without crashing and shows the main title', () => {
    render(<App />);
    const heading = screen.getByText(/Turn Your Pantry Into/i);
    expect(heading).toBeInTheDocument();
  });
});
