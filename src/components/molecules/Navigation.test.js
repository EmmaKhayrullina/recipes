import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Navigation from './Navigation';
import useAuth from '../../hooks/useAuth';
import userData from '../../__mocks__/userData';

jest.mock('../../hooks/useAuth');

describe('Navigation component', () => {
  let container;
  const signOut = jest.fn();
  const mockUseAuth = jest.fn(() => ({
    user: userData,
    signOutUser: signOut,
  }));

  useAuth.mockImplementation(mockUseAuth);

  beforeEach(() => {
    container = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </Provider>,
    );
  });

  test('should sign out', () => {
    // Arrange
    const { signOutUser } = useAuth();

    // Act
    container.find('button').simulate('click');

    // Assert
    expect(signOutUser).toHaveBeenCalled();
  });
});
