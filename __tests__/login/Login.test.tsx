import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginBannerText } from '@/features/Login';
import '@testing-library/jest-dom';

test('adds 1 + 2 to equal 3', () => {
  expect(3).toBe(3);
});

describe('Test Login Banner', () => {
  it('renders a heading', () => {
    render(<LoginBannerText />);

    const linkElement = screen.getByText(/One Platform. Multiple Functions/i);
    expect(linkElement).toBeInTheDocument();
  });
});
