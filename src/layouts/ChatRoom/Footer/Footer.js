import { useState } from 'react';
import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import Icon from '../../../components/Icon';
import styles from './Footer.module.scss';

const Footer = () => {
  const [input, setInput] = useState('');

  const { currentUser } = useSelector(state => state);
  const { id } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();

    const text = input.trim();

    if (!text) return;

    try {
      const message = {
        id: nanoid(),
        text,
        sentBy: currentUser.uid,
        sentAt: Timestamp.now(), // serverTimestamp() not working
      };

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

      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleUpload = e => {
    console.log('** file: ', e.target.files[0]);
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
                onChange={handleUpload}
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
