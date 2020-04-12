import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import useFilter from './useFilter';
import store from '../store/store';
import categories from '../__mocks__/categoriesData';

describe('useFilter hook', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  it('should return default value', () => {
    // Act
    const { result } = renderHook(() => useFilter(), { wrapper });

    // Assert
    expect(result.current.filter).toEqual(categories[0].value);
  });

  it('should set new filter after call filterByCategory', () => {
    // Arrange
    const actualFilter = { value: 'soups', label: 'Soups' };
    const expectedFilter = 'soups';

    // Act
    const { result } = renderHook(() => useFilter(), { wrapper });
    act(() => result.current.filterByCategory(actualFilter));
    // Assert
    expect(result.current.filter).toEqual(expectedFilter);

    // Arrange
    const newFilter = { value: 'all', label: 'All' };
    const newExpectedFilter = 'all';

    // Act
    act(() => result.current.filterByCategory(newFilter));
    // Assert
    expect(result.current.filter).toBe(newExpectedFilter);
  });
});
