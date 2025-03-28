import React from 'react';
import { render } from '@testing-library/react';
import { Status } from '../../components/Labels/Status';
import '@testing-library/jest-dom/extend-expect';

describe('Status Component', () => {
  it('renders with success status', () => {
    const { getByText } = render(<Status label="Success" status="success" />);
    const statusElement = getByText(/Success/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveStyle('color: #36743D');
    expect(statusElement).toHaveStyle('border: 1px solid #BEF2B9');
    expect(statusElement).toHaveStyle('background-color: #F1FEF1');
  });

  it('renders with warning status', () => {
    const { getByText } = render(<Status label="Warning" status="warning" />);
    const statusElement = getByText(/Warning/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveStyle('color: #AF5F26');
    expect(statusElement).toHaveStyle('border: 1px solid #AF5F26');
    expect(statusElement).toHaveStyle('background-color: #FDED94');
  });

  it('renders with danger status', () => {
    const { getByText } = render(<Status label="Danger" status="danger" />);
    const statusElement = getByText(/Danger/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveStyle('color: #DC4437');
    expect(statusElement).toHaveStyle('border: 1px solid #DC4437');
    expect(statusElement).toHaveStyle('background-color: #F4B7B5');
  });

  it('renders with matured status', () => {
    const { getByText } = render(<Status label="Matured" status="matured" />);
    const statusElement = getByText(/Matured/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveStyle('color: #1A4983');
    expect(statusElement).toHaveStyle('border: 1px solid #A8D6EF');
    expect(statusElement).toHaveStyle('background-color: #EBF8FE');
  });

  it('renders with default success status when no status is provided', () => {
    const { getByText } = render(<Status label="Default Success" />);
    const statusElement = getByText(/Default Success/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveStyle('color: #36743D');
    expect(statusElement).toHaveStyle('border: 1px solid #BEF2B9');
    expect(statusElement).toHaveStyle('background-color: #F1FEF1');
  });
});
