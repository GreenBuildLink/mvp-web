import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeDefined();
  });

  it('renders with type prop', () => {
    render(<Input type="email" placeholder="email@example.com" />);
    const input = screen.getByPlaceholderText(/email@example.com/i);
    expect(input).toBeDefined();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders disabled input', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText(/disabled input/i);
    expect(input).toBeDefined();
    expect(input).toBeDisabled();
  });
});