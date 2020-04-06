import { useSelector, shallowEqual } from 'react-redux';
import { useState } from 'react';
import { showAlert } from '../store/actions/app';
import fb from '../services/firebase';

const useImageFile = oldImage => {
  const [file, setFile] = useState(null);
  const [initialImage, setInitialImage] = useState(oldImage);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const userUid = useSelector(state => state.user.uid, shallowEqual);
  const storageRef = fb.fbStorage.ref();

  const handleFileChange = e => {
    e.persist();
    setFile(e.target.files[0]);
  };

  const deleteImage = async imageName => {
    if (!imageName) return;

    await storageRef
      .child(`${userUid}/${imageName}`)
      .delete()
      .catch(error => {
        showAlert({ text: error.message, type: 'error' });
      });
  };

  const isImageChanged = () => initialImage && file && initialImage.fileName !== file.name;

  const deleteOldImage = () => {
    if (isImageChanged()) {
      deleteImage(initialImage.fileName);
      setInitialImage(null);
    }
  };

  const uploadData = async () => {
    let url;

    await new Promise(resolve => {
      if (!file) return;

      const uploadTask = storageRef.child(`${userUid}/${file.name}`).put(file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(percentage);
          setLoading(true);
        },

        error => {
          showAlert({ text: error.message, type: 'error' });
          setLoading(false);
        },

        async () => {
          const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();

          setProgress(null);
          setLoading(false);
          url = downloadUrl;

          resolve();
        },
      );
    });

    return url;
  };

  return {
    handleFileChange,
    uploadData,
    progress,
    loading,
    deleteImage,
    deleteOldImage,
  };
};

export default useImageFile;
