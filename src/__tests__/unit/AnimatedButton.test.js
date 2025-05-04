import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AnimatedButton from '../../components/common/AnimatedButton';

describe('AnimatedButton Component', () => {
  it('renders correctly with default props', () => {
    render(<AnimatedButton>Test Button</AnimatedButton>);
    
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('primary'); // Default variant
  });
  
  it('renders with different variants', () => {
    const { rerender } = render(<AnimatedButton variant="outline">Outline Button</AnimatedButton>);
    
    let button = screen.getByRole('button', { name: /outline button/i });
    expect(button).toHaveClass('outline');
    
    rerender(<AnimatedButton variant="danger">Danger Button</AnimatedButton>);
    button = screen.getByRole('button', { name: /danger button/i });
    expect(button).toHaveClass('danger');
    
    rerender(<AnimatedButton variant="success">Success Button</AnimatedButton>);
    button = screen.getByRole('button', { name: /success button/i });
    expect(button).toHaveClass('success');
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<AnimatedButton onClick={handleClick}>Clickable Button</AnimatedButton>);
    
    const button = screen.getByRole('button', { name: /clickable button/i });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<AnimatedButton disabled>Disabled Button</AnimatedButton>);
    
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });
  
  it('renders with full width when fullWidth prop is true', () => {
    render(<AnimatedButton fullWidth>Full Width Button</AnimatedButton>);
    
    const button = screen.getByRole('button', { name: /full width button/i });
    expect(button).toHaveStyle('width: 100%');
  });
  
  it('renders with custom className', () => {
    render(<AnimatedButton className="custom-class">Custom Class Button</AnimatedButton>);
    
    const button = screen.getByRole('button', { name: /custom class button/i });
    expect(button).toHaveClass('custom-class');
  });
  
  it('passes additional props to the button element', () => {
    render(<AnimatedButton data-testid="test-button" aria-label="Test Button">Button with Props</AnimatedButton>);
    
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Test Button');
  });
});
