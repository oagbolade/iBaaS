import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  logRoles,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { InstructionContainer } from '@/features/CustomerService/instruction';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Instruction Page', () => {
  it('renders the page title and table title', () => {
    const { getByText } = render(<InstructionContainer />);
    const mainTitle = getByText(/Standing Instructions/);
    const seconndaryTitle = getByText(/View All Standing Instruction Accounts/i);
    expect(mainTitle).toBeInTheDocument();
    expect(seconndaryTitle).toBeInTheDocument();
  });

 
});
