import { nanoid } from '@reduxjs/toolkit';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Upload image to Firebase storage and get image url
 * @param {object} file - File object
 * @returns Image url (promise)
 */
export const uploadImage = file => {
  const storageRef = ref(storage, `images/${nanoid()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',

      snapshot => {
        // Observe state change events such as progress, pause, and resume
      },

      error => {
        // Handle unsuccessful uploads
        reject(error);
      },

      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadURL => {
            resolve(downloadURL);
          })
          .catch(error => {
            reject(error);
          });
      }
    );
  });
};
