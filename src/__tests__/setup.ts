import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
});