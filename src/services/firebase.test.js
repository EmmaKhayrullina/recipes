// import firebase, { config } from './firebase';
import firebase from './firebase';

describe('Firebase sdk', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  // test('should call with right config', () => {
  //   // Assert
  //   expect(config.apiKey).toBeTruthy();
  // });

  test('should call with right config', () => {
    // Arrange
    const expectedConfig = {
      apiKey: 'apiKey',
      authDomain: 'authDomain',
      databaseURL: 'databaseURL',
      projectId: 'projectId',
      storageBucket: 'storageBucket',
      messagingSenderId: 'messagingSenderId',
      appId: 'appId',
      measurementId: 'measurementId',
    };

    // Act
    const spyFirebaseInitializeApp = jest.spyOn(firebase, 'initializeApp');
    firebase.initializeApp(expectedConfig);

    // Assert
    expect(spyFirebaseInitializeApp).toHaveBeenCalledWith(expectedConfig);
  });
});
