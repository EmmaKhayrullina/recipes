import firebase from './firebase';

const auth = firebase.auth();
const db = firebase.firestore();

export const getList = async () => {
  try {
    const userId = auth.currentUser.uid;

    const doc = await db
      .collection('users')
      .doc(`${userId}`)
      .get();
    let userRecipes;

    if (doc.exists) {
      const recipes = doc.exists ? doc.data() : null;
      userRecipes = Object.keys(recipes).map(recipe => recipes[recipe]);
    }

    if (userRecipes && userRecipes.length) {
      return userRecipes;
    }
    return false;
  } catch (e) {
    throw new Error(e);
  }
};

export const getItem = async id => {
  try {
    const userId = auth.currentUser.uid;

    const doc = await db
      .collection('users')
      .doc(`${userId}`)
      .get();
    const recipes = doc.exists ? doc.data() : null;

    return recipes[id];
  } catch (e) {
    throw new Error(e);
  }
};

export const createItem = data => {
  const userId = auth.currentUser.uid;

  return db
    .collection('users')
    .doc(`${userId}`)
    .set(data, { merge: true });
};

export const updateItem = updatedData => {
  const userId = auth.currentUser.uid;

  return db
    .collection('users')
    .doc(`${userId}`)
    .set(
      {
        [updatedData.id]: updatedData,
      },
      { merge: true },
    );
};

export const deleteItem = id => {
  const userId = auth.currentUser.uid;

  return db
    .collection('users')
    .doc(`${userId}`)
    .update({
      [`${id}`]: firebase.firestore.FieldValue.delete(),
    });
};
