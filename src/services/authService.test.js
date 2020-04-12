import * as authService from './authService';
import firebase from './firebase';
import user from '../__mocks__/userData';

describe('Auth api', () => {
  const auth = firebase.auth();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should register user in Firebase', async () => {
    // Arrange
    const spyCreateUser = jest.spyOn(auth, 'createUserWithEmailAndPassword');
    // Act
    await authService.register(user.email, '123456');
    // Assert
    expect(spyCreateUser).toHaveBeenCalledWith(user.email, '123456');
  });

  test('should login user', async () => {
    // Arrange
    const spySignInWithFirebase = jest.spyOn(auth, 'signInWithEmailAndPassword');
    // Act
    await authService.logIn(user.email, '123456');
    // Assert
    expect(spySignInWithFirebase).toHaveBeenCalledWith(user.email, '123456');
  });

  test('should return user from Firebase', () => {
    // Arrange
    const spyOnAuthStateChanged = jest.spyOn(auth, 'onAuthStateChanged');
    // Act
    authService.initAuth();
    // Assert
    expect(spyOnAuthStateChanged).toHaveBeenCalled();
  });

  test('should signout user in Firebase', async () => {
    // Arrange
    const spySignOutFirebase = jest.spyOn(auth, 'signOut');
    // Act
    await authService.signOut();
    // Assert
    expect(spySignOutFirebase).toHaveBeenCalled();
  });
});
