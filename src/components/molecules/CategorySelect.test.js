import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store/store';
import CategorySelect from './CategorySelect';
import useCategorySelect from '../../hooks/useCategorySelect';
import categoriesData from '../../__mocks__/categoriesData';

jest.mock('../../hooks/useCategorySelect');

describe('CategorySelect component', () => {
  let container;

  const handleChange = jest.fn();
  const mockUseCategorySelect = jest.fn(() => ({
    categories: categoriesData,
    handleChangeCategory: handleChange,
    currentValue: 'all',
  }));

  useCategorySelect.mockImplementation(mockUseCategorySelect);

  beforeEach(() => {
    const onChange = jest.fn();

    container = mount(
      <Provider store={store}>
        <CategorySelect onChange={onChange} />
      </Provider>,
    );
  });

  test('should change select value', () => {
    // Arrange
    const { handleChangeCategory } = useCategorySelect();

    // Act
    container.find('Select').prop('onChange')({ label: 'Soups', value: 'soups' });

    // Assert
    expect(handleChangeCategory).toHaveBeenCalled();
  });
});
