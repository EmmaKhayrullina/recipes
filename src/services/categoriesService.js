import firebase from './firebase';

const getCategories = async () => {
  try {
    const doc = await firebase
      .firestore()
      .collection('recipes')
      .doc('categories')
      .get();

    if (doc.exists) {
      const { list } = doc.exists ? doc.data() : null;
      const categories = list.map(category => ({ value: category.toLowerCase(), label: category }));
      return categories;
    }
    return false;
  } catch (e) {
    throw new Error(e);
  }
};

export default getCategories;
