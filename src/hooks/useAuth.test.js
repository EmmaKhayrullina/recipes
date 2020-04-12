import React from 'react';
import { Provider } from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import store from '../store/store';
import user from '../__mocks__/userData';
import useAuth from './useAuth';
import useAlert from './useAlert';
import * as authService from '../services/authService';

jest.mock('./useAlert');
const showAlert = jest.fn();
const mockUseAlert = jest.fn(() => ({ showAlertMessage: showAlert }));
useAlert.mockImplementation(mockUseAlert);

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

describe('useAuth hook', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  const { result } = renderHook(() => useAuth(), { wrapper });
  const { showAlertMessage } = useAlert();

  test('should register user', () => {
    // Arrange
    const spyRegisterUser = jest.spyOn(authService, 'register');

    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.signUpUser(user.email, '123456');
    });
    // Assert
    expect(spyRegisterUser).toHaveBeenCalledWith(user.email, '123456');
  });

  test('should login user', () => {
    // Arrange
    const spyLogInUser = jest.spyOn(authService, 'logIn');

    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.signInUser(user.email, '123456');
    });
    // Assert
    expect(spyLogInUser).toHaveBeenCalledWith(user.email, '123456');
  });

  test('should logout user', () => {
    // Arrange
    const spySignOutUser = jest.spyOn(authService, 'signOut');

    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.signOutUser();
    });
    // Assert
    expect(spySignOutUser).toHaveBeenCalled();
    expect(showAlertMessage).toHaveBeenCalled();
  });
});
