import { useState, useRef } from 'react';
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
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import useClickOutside from '../../../hooks/useClickOutside';
import { uploadImage } from '../../../utils/storage';
import Icon from '../../../components/Icon';
import styles from './Footer.module.scss';

const Footer = () => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const emojiRef = useRef(null);

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

  const handleEmojiClick = emoji => {
    const cursor = inputRef.current.selectionStart;
    const text = input.slice(0, cursor) + [emoji.native] + input.slice(cursor);

    setInput(text);

    // Set new cursor position, otherwise the cursor will move to the end every time emoji added
    const newCursor = cursor + emoji.native.length;
    // Timeout makes time to update the dom with the new value
    setTimeout(
      () => inputRef.current.setSelectionRange(newCursor, newCursor),
      10
    );
  };

  useClickOutside(emojiRef, () => setIsOpen(false));

  return (
    <div className="py-3">
      <div className="container-fluid-px-lg">
        <div className="position-relative">
          {/* Message Form */}
          <form
            noValidate
            className="position-relative"
            onSubmit={handleSubmit}
          >
            <textarea
              ref={inputRef}
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

            <li ref={emojiRef}>
              <button type="button" onClick={() => setIsOpen(prev => !prev)}>
                <Icon name="smiley-smile" />
              </button>

              {isOpen && (
                <div className={styles.picker}>
                  <Picker
                    data={data}
                    previewPosition="none"
                    onEmojiSelect={handleEmojiClick}
                  />
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
