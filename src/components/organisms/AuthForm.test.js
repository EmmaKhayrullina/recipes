import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';

jest.mock('../../hooks/useAuth');

const renderAuthForm = (pageName, user) => {
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <AuthForm user={user} pageName={pageName} />
      </MemoryRouter>
    </Provider>,
  );
};

describe('AuthForm component', () => {
  let container;
  const signUp = jest.fn();
  const signIn = jest.fn();
  const mockUseAuth = jest.fn(() => ({
    signUpUser: signUp,
    signInUser: signIn,
  }));

  useAuth.mockImplementation(mockUseAuth);

  beforeEach(() => {
    const pageName = 'Login';
    const user = { email: '', uid: '' };

    container = renderAuthForm(pageName, user);
  });

  test('should submit login form', () => {
    // Arrange
    const { signInUser } = useAuth();

    // Act
    container.find('form').simulate('submit');

    // Assert
    expect(container.find('button[type="submit"]').text()).toBe('Login');
    expect(signInUser).toHaveBeenCalled();
  });

  test('should register user', () => {
    // Arrange
    const { signUpUser } = useAuth();
    const preventDefault = jest.fn();
    const pageName = 'Registration';
    const user = { email: 'test@test.com', uid: '123456' };

    container = renderAuthForm(pageName, user);

    // Act
    container.find('form').simulate('submit', { preventDefault });

    // Assert
    expect(container.find('button[type="submit"]').text()).toBe('Registration');
    expect(preventDefault).toHaveBeenCalled();
    expect(signUpUser).toHaveBeenCalled();
  });

  test('should change fields', () => {
    // Arrange
    const expectedEmailValue = 'test@test.com';
    const expectedPasswordValue = '123456';

    // Act
    container.find('input[type="email"]').simulate('change', { target: { name: 'email', value: expectedEmailValue } });
    container
      .find('input[type="password"]')
      .simulate('change', { target: { name: 'password', value: expectedPasswordValue } });

    // Assert
    expect(container.find('input[type="email"]').prop('value')).toEqual(expectedEmailValue);
    expect(container.find('input[type="password"]').prop('value')).toEqual(expectedPasswordValue);
  });
});
