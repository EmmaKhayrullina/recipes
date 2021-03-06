import firebasemock from 'firebase-mock';
import user from './userData';
import recipes from './recipesData';

export const mockauth = new firebasemock.MockAuthentication();
export const mockfirestore = new firebasemock.MockFirestore();
export const mockstorage = new firebasemock.MockStorage();

const mocksdk = new firebasemock.MockFirebaseSdk(
  null,
  () => mockauth,
  () => mockfirestore,
  () => mockstorage,
  null,
);

mockfirestore.autoFlush();
mockauth.autoFlush();

mocksdk.auth().changeAuthState(user);
mocksdk
  .firestore()
  .collection('users')
  .doc(user.uid)
  .set({ ...recipes });

mocksdk
  .firestore()
  .collection('recipes')
  .doc('categories')
  .set({ list: ['All', 'Soups', 'Salads', 'Cakes'] });

mocksdk.storage().ref = jest.fn(() => ({
  child: jest.fn(() => ({
    put: jest.fn(() =>
      Promise.resolve({
        snapshot: {
          ref: {
            getDownloadURL: jest.fn(),
          },
        },
      }),
    ),
    delete: jest.fn(() => Promise.resolve(true)),
  })),
}));

export default mocksdk;
