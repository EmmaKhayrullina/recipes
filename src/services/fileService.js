import firebase from './firebase';

const auth = firebase.auth();
const storage = firebase.storage();

export const addFile = file => {
  const userId = auth.currentUser.uid;

  return storage
    .ref()
    .child(`${userId}/${file.name}`)
    .put(file);
};

export const getFileUrl = uploadTask => {
  return uploadTask.snapshot.ref.getDownloadURL();
};

export const deleteFile = fileName => {
  const userId = auth.currentUser.uid;

  return storage
    .ref()
    .child(`${userId}/${fileName}`)
    .delete();
};
