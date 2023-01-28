import { useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../../utils/storage';
import Icon from '../../../components/Icon';
import styles from './Footer.module.scss';

const Footer = () => {
  const [input, setInput] = useState('');

  const { currentUser } = useSelector(state => state);
  const { id } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();

    const file = e.target.files?.[0];
    const text = input.trim();

    if (!file && !text) return;

    let message = {
      id: nanoid(),
      text,
      image: '',
      sentBy: currentUser.uid,
      sentAt: Timestamp.now(), // serverTimestamp() not working
    };

    try {
      if (file) {
        // Upload image and get image url
        const image = await uploadImage(file);
        message = { ...message, text: '', image };
      }

      // Update lastMessage in chatList
      await updateDoc(doc(db, 'chatList', id), {
        lastMessage: message,
      });

      // Update messages in chats
      await setDoc(
        doc(db, 'chats', id),
        {
          messages: arrayUnion(message),
        },
        { merge: true }
      );

      // Clear input if text (not image) has been uploaded
      if (!file) setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="py-3">
      <div className="container-fluid-px-lg">
        {/* Message Form */}
        <form noValidate className="position-relative" onSubmit={handleSubmit}>
          <textarea
            name="message"
            value={input}
            rows={1}
            required
            className={`${styles.textarea} form-control`}
            placeholder="Type a new message"
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className={styles.submit}>
            <Icon name="paper-plane" />
          </button>
        </form>

        <ul className={`${styles.inputList} list-unstyled`}>
          <li>
            {/* Image Upload */}
            <label>
              <input
                type="file"
                name="file"
                accept="image/*"
                className="visually-hidden"
                onChange={handleSubmit}
              />
              <Icon name="paperclip" />
            </label>
          </li>

          <li>
            <button type="button">
              <Icon name="smiley-smile" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
