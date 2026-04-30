import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDefined();
  });

  it('renders with variant prop', () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    expect(container.firstChild).toBeDefined();
  });

  it('renders with size prop', () => {
    const { container } = render(<Button size="sm">Small</Button>);
    expect(container.firstChild).toBeDefined();
  });
});