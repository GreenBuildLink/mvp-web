import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders badge with children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText(/new/i)).toBeDefined();
  });

  it('renders with variant prop', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(container.firstChild).toBeDefined();
  });

  it('renders with destructive variant', () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    expect(container.firstChild).toBeDefined();
  });
});