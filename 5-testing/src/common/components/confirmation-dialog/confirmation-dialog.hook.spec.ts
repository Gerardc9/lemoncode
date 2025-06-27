import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup } from '#common/models';

describe('common/components/confirmation-dialog/useConfirmationDialog specs', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
    expect(typeof result.current.onAccept).toBe('function');
    expect(typeof result.current.onClose).toBe('function');
    expect(typeof result.current.onOpenDialog).toBe('function');
  });

  it('should open dialog and set item when onOpenDialog is called', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: '1', name: 'Test Item' };

    act(() => {
      result.current.onOpenDialog(testItem);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(testItem);
  });

  it('should close dialog when onClose is called', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: '1', name: 'Test Item' };

    act(() => {
      result.current.onOpenDialog(testItem);
    });
    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should reset itemToDelete when onAccept is called', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: '1', name: 'Test Item' };

    act(() => {
      result.current.onOpenDialog(testItem);
    });
    act(() => {
      result.current.onAccept();
    });

    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
