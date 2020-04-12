import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import useAlert from './useAlert';
import store from '../store/store';

describe('useAlert hook', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  test('should hide by default', () => {
    // Act
    const { result } = renderHook(() => useAlert(), { wrapper });

    // Assert
    expect(result.current.alert).toBe(null);
  });

  test('should be shown/hide after call', () => {
    // Arrange
    const expectedAlert = {
      text: 'Test alert',
      type: 'error',
    };

    // Act
    const { result } = renderHook(() => useAlert(), { wrapper });
    act(() => result.current.showAlertMessage(expectedAlert));

    // Assert
    expect(result.current.alert).toEqual(expectedAlert);

    // Act
    act(() => result.current.hideAlertMessage());
    // Assert
    expect(result.current.alert).toBe(null);
  });
});
