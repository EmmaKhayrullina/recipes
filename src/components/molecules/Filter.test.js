import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Filter from './Filter';
import useFilter from '../../hooks/useFilter';

jest.mock('../../hooks/useFilter');

describe('Filter component', () => {
  let container;

  const handleFilter = jest.fn();
  const mockUseFilter = jest.fn(() => ({
    filter: 'all',
    filterByCategory: handleFilter,
  }));

  useFilter.mockImplementation(mockUseFilter);

  beforeEach(() => {
    container = mount(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );
  });

  test('should change filter', () => {
    // Arrange
    const { filterByCategory } = useFilter();

    // Act
    container.find('CategorySelect').prop('onChange')({ label: 'Soups', value: 'soups' });

    // Assert
    expect(filterByCategory).toHaveBeenCalled();
  });

  test('should show default filter', () => {
    // Arrange
    const { filter } = useFilter();

    // Assert
    expect(container.find('CategorySelect').prop('filter')).toBe(filter);
  });
});
