import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

describe('Card Component', () => {
  it('renders Card component', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText(/card content/i)).toBeDefined();
  });

  it('renders CardContent', () => {
    render(<CardContent>Test content</CardContent>);
    expect(screen.getByText(/test content/i)).toBeDefined();
  });

  it('renders CardHeader', () => {
    render(<CardHeader>Header title</CardHeader>);
    expect(screen.getByText(/header title/i)).toBeDefined();
  });
});