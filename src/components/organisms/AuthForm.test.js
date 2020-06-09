import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';

jest.mock('../../hooks/useAuth');

const renderAuthForm = (pageName, user) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <AuthForm user={user} pageName={pageName} />
      </MemoryRouter>
    </Provider>,
  );
};

describe('AuthForm component', () => {
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
    renderAuthForm(pageName, user);
  });

  test('should render login form', () => {
    // Assert
    expect(screen.getByTestId('test-login-form')).toMatchSnapshot();
  });

  test('should submit login form', () => {
    // Arrange
    const { signInUser } = useAuth();

    // Act
    fireEvent.submit(screen.getByRole('button'), { name: /login/i });

    // Assert
    expect(signInUser).toHaveBeenCalled();
  });

  test('should render registration form', () => {
    // Arrange
    const pageName = 'Registration';
    const user = { email: 'test@test.com', uid: '123456' };

    // Act
    renderAuthForm(pageName, user);

    // Assert
    expect(screen.getByTestId('test-registration-form')).toMatchSnapshot();
  });

  test('should register user', () => {
    // Arrange
    const { signUpUser } = useAuth();
    const pageName = 'Registration';
    const user = { email: 'test@test.com', uid: '123456' };

    renderAuthForm(pageName, user);

    // Act
    fireEvent.submit(screen.getByRole('button', { name: /registration/i }));

    // Assert
    expect(signUpUser).toHaveBeenCalled();
  });

  test('should change fields', () => {
    // Arrange
    const expectedEmailValue = 'test@test.com';
    const expectedPasswordValue = '123456';
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByLabelText(/password/i);

    // Act
    fireEvent.change(email, { target: { name: 'email', value: expectedEmailValue } });
    fireEvent.change(password, { target: { name: 'password', value: expectedPasswordValue } });

    // Assert
    expect(email.value).toEqual(expectedEmailValue);
    expect(password.value).toEqual(expectedPasswordValue);
  });
});
