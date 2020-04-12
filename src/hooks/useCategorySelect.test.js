import React from 'react';
import { Provider } from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useCategorySelect from './useCategorySelect';
import store from '../store/store';
import getCategories from '../services/categoriesService';
import categories from '../__mocks__/categoriesData';

jest.mock('../services/categoriesService');

describe('useCategorySelect hook', () => {
  afterAll(() => {
    jest.resetModules();
  });

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  test('should fetch categories from firestore', async () => {
    // Arrange
    getCategories.mockImplementation(() => Promise.resolve(categories));

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useCategorySelect(), { wrapper });
    await waitForNextUpdate();

    // Assert
    expect(getCategories).toHaveBeenCalled();
    expect(result.current.categories).toEqual(categories);
  });

  test('should return default category value', () => {
    // Act
    const { result } = renderHook(() => useCategorySelect(), { wrapper });

    // Assert
    expect(result.current.currentValue).toEqual(categories[0]);
  });

  test('should change category', () => {
    // Arrange
    const expectedOption = { value: 'soups', label: 'Soups' };

    // Act
    const { result } = renderHook(() => useCategorySelect(), { wrapper });
    act(() => result.current.handleChangeCategory(expectedOption));
    // Assert
    expect(result.current.currentValue).toEqual(expectedOption);

    // Arrange
    const newEexpectedOption = { value: 'all', label: 'All' };

    // Act
    act(() => result.current.handleChangeCategory(newEexpectedOption));
    // Assert
    expect(result.current.currentValue).toEqual(newEexpectedOption);
  });
});
