import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import useModal from './useModal';
import store from '../store/store';

describe('useModal hook', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  test('should closed by default', () => {
    // Act
    const { result } = renderHook(() => useModal(), { wrapper });

    // Assert
    expect(result.current.isModalOpen).toBe(false);
  });

  test('should open/close after call', () => {
    // Act
    const { result } = renderHook(() => useModal(), { wrapper });
    act(() => result.current.openModal());

    // Assert
    expect(result.current.isModalOpen).toBe(true);

    // Act
    act(() => result.current.closeModal());

    // Assert
    expect(result.current.isModalOpen).toBe(false);
  });
});
