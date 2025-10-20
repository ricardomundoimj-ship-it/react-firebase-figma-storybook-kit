import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('can be checked and unchecked', async () => {
    const user = userEvent.setup();
    render(<Checkbox data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('can be controlled component', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked onChange={handleChange} data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeChecked();
    
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can have default checked', () => {
    render(<Checkbox defaultChecked data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders as disabled', () => {
    render(<Checkbox disabled data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('does not change state when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox disabled defaultChecked data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).toBeChecked(); // Should remain checked
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<Checkbox aria-label="Accept terms" data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Accept terms');
  });

  it('supports required attribute', () => {
    render(<Checkbox required data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeRequired();
  });

  it('shows checked state in CSS', () => {
    const { rerender } = render(<Checkbox data-testid="checkbox" />);
    let checkbox = screen.getByTestId('checkbox');
    
    // Initially unchecked
    expect(checkbox).not.toHaveAttribute('data-state', 'checked');
    
    rerender(<Checkbox checked data-testid="checkbox" />);
    checkbox = screen.getByTestId('checkbox');
    
    // When checked, should have data-state attribute
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('has proper styling classes', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass(
      'peer',
      'h-4',
      'w-4',
      'shrink-0',
      'rounded-sm',
      'border',
      'border-primary',
      'ring-offset-background'
    );
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});