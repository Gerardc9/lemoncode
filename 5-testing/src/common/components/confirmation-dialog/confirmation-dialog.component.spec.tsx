import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/components/confirmation-dialog/ConfirmationDialogComponent specs', () => {
  const defaultProps = {
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    title: 'Test Title',
    labels: {
      closeButton: 'Cancel',
      acceptButton: 'Accept',
    },
    children: <div>Test content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render dialog when isOpen is true', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('should not render dialog when isOpen is false', () => {
    const props = { ...defaultProps, isOpen: false };

    render(<ConfirmationDialogComponent {...props} />);

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    const props = { ...defaultProps, onClose: mockOnClose };

    render(<ConfirmationDialogComponent {...props} />);
    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onAccept and onClose when accept button is clicked', () => {
    const mockOnAccept = vi.fn();
    const mockOnClose = vi.fn();
    const props = {
      ...defaultProps,
      onAccept: mockOnAccept,
      onClose: mockOnClose,
    };

    render(<ConfirmationDialogComponent {...props} />);
    fireEvent.click(screen.getByText('Accept'));

    expect(mockOnAccept).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render custom title as React node', () => {
    // Arrange
    const customTitle = (
      <span data-testid="custom-title">Custom React Title</span>
    );
    const props = {
      ...defaultProps,
      title: customTitle,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    expect(screen.getByText('Custom React Title')).toBeInTheDocument();
  });

  it('should render custom children content', () => {
    // Arrange
    const customChildren = (
      <div>
        <p>Are you sure you want to delete this item?</p>
        <span data-testid="warning">This action cannot be undone.</span>
      </div>
    );
    const props = {
      ...defaultProps,
      children: customChildren,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(
      screen.getByText('Are you sure you want to delete this item?')
    ).toBeInTheDocument();
    expect(screen.getByTestId('warning')).toBeInTheDocument();
    expect(
      screen.getByText('This action cannot be undone.')
    ).toBeInTheDocument();
  });

  it('should render with custom button labels', () => {
    // Arrange
    const customLabels = {
      closeButton: 'No, Cancel',
      acceptButton: 'Yes, Delete',
    };
    const props = {
      ...defaultProps,
      labels: customLabels,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByText('No, Cancel')).toBeInTheDocument();
    expect(screen.getByText('Yes, Delete')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Accept')).not.toBeInTheDocument();
  });

  it('should have correct button colors and variants', () => {
    // Arrange & Act
    render(<ConfirmationDialogComponent {...defaultProps} />);

    // Assert
    const closeButton = screen.getByText('Cancel');
    const acceptButton = screen.getByText('Accept');

    expect(closeButton).toHaveClass('MuiButton-containedSecondary');
    expect(acceptButton).toHaveClass('MuiButton-containedPrimary');
  });

  it('should maintain proper calling order when accept is clicked', () => {
    // Arrange
    const mockOnAccept = vi.fn();
    const mockOnClose = vi.fn();
    const callOrder: string[] = [];

    mockOnAccept.mockImplementation(() => callOrder.push('accept'));
    mockOnClose.mockImplementation(() => callOrder.push('close'));

    const props = {
      ...defaultProps,
      onAccept: mockOnAccept,
      onClose: mockOnClose,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);

    // Assert
    expect(callOrder).toEqual(['accept', 'close']);
  });
});
