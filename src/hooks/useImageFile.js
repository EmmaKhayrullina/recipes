import { useState } from 'react';
import { showAlert } from '../store/actions/app';
import { addFile, getFileUrl, deleteFile } from '../services/fileService';

const useImageFile = oldImage => {
  const [file, setFile] = useState(null);
  const [initialImage, setInitialImage] = useState(oldImage);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleFileChange = e => {
    e.persist();
    setFile(e.target.files[0]);
  };

  const deleteImage = async imageName => {
    if (!imageName) return;

    await deleteFile(imageName).catch(error => {
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

      const uploadTask = addFile(file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(percentage);
          setImageLoading(true);
        },

        error => {
          showAlert({ text: error.message, type: 'error' });
          setImageLoading(false);
        },

        async () => {
          const downloadUrl = await getFileUrl(uploadTask);

          setUploadProgress(null);
          setImageLoading(false);
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
    uploadProgress,
    imageLoading,
    deleteImage,
    deleteOldImage,
  };
};

export default useImageFile;
