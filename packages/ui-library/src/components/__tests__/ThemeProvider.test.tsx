import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../ThemeProvider';

// Test component to access theme context
const TestComponent = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('provides default theme context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
  });

  it('can set custom default theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
  });

  it('can change theme programmatically', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('system');

    await user.click(screen.getByText('Set Dark'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');

    await user.click(screen.getByText('Set Light'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
  });

  it('persists theme to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByText('Set Dark'));
    
    expect(localStorage.getItem('ui-library-theme')).toBe('dark');
  });

  it('loads theme from localStorage on mount', () => {
    localStorage.setItem('ui-library-theme', 'light');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
  });

  it('respects system preference when theme is system', () => {
    // Mock prefers-color-scheme: dark
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
  });

  it('adds theme class to document element', () => {
    const { rerender } = render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('light');

    rerender(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('light');
  });

  it('uses custom storage key', () => {
    localStorage.setItem('custom-theme-key', 'dark');
    
    render(
      <ThemeProvider storageKey="custom-theme-key">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('throws error when useTheme is used outside ThemeProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    consoleError.mockRestore();
  });
});