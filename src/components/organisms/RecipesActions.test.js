import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store/store';
import RecipesActions from './RecipesActions';
import useModal from '../../hooks/useModal';

jest.mock('../../hooks/useModal');

describe('RecipesActions component', () => {
  let container;

  const open = jest.fn();

  const mockUseModal = jest.fn(() => ({ openModal: open }));
  useModal.mockImplementation(mockUseModal);

  beforeEach(() => {
    container = mount(
      <Provider store={store}>
        <div>
          <RecipesActions />
        </div>
      </Provider>,
    );
  });

  test('should open modal', () => {
    // Arrange
    const { openModal } = useModal();

    // Act
    container.find('button').simulate('click');

    // Assert
    expect(openModal).toHaveBeenCalled();
  });
});
