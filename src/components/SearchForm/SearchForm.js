import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import styles from './SearchForm.module.scss';
import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const SearchCard = ({ uid, username, email, onClick }) => {
  const { currentUser } = useSelector(state => state);

  const combineIds = (id1 = '', id2 = '') =>
    id1 < id2 ? `${id1}${id2}` : `${id2}${id1}`;

  const chatId = combineIds(uid, currentUser.uid);

  const handleClick = async () => {
    try {
      await setDoc(doc(db, 'chatList', chatId), {
        id: chatId,
        members: [uid, currentUser.uid],
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        lastMessage: {},
      });
    } catch (error) {
      console.error(error);
    }

    onClick();
  };

  return (
    <div>
      <Link
        to={`/${chatId}`}
        className={`${styles.cardLink} sidebar-container`}
        onClick={handleClick}
      >
        <div className={styles.cardGrid}>
          <div className="align-self-center">
            <Avatar username={username} size="sm" />
          </div>

          <div>
            <span className="d-block mb-1 fw-bold text-truncate">
              {username}
            </span>
            <span className={`${styles.cardText} text-truncate`}>{email}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

SearchCard.propTypes = {
  uid: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  onClick: PropTypes.func,
};

SearchCard.defaultProps = {
  uid: '',
  username: '',
  email: '',
  onClick: () => {},
};

const SearchForm = () => {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const ref = useRef(null);

  const { currentUser, chatList } = useSelector(state => state);

  // Find existing users by members uid
  const existingUsers = chatList.map(item =>
    item.members.find(user => user.uid !== currentUser.uid)
  );

  const searchTerm = input.trim();

  const clearInput = () => setInput('');

  useEffect(() => {
    if (!searchTerm) return;

    const fetchUsers = async () => {
      const q = query(
        collection(db, 'users'),
        where('username', '>=', searchTerm),
        where('username', '<=', searchTerm + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);

      // Clear users not to create duplicates
      setUsers([]);

      querySnapshot.forEach(doc => {
        const data = doc.data();

        // Remove existing users && current user from search result
        if (existingUsers.includes(data.uid) || data.uid === currentUser.uid) {
          return;
        }

        setUsers(prev => [...prev, doc.data()]);
      });
    };

    try {
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }, [currentUser.uid, existingUsers, searchTerm]);

  useClickOutside(ref, clearInput);

  return (
    <div ref={ref} className="position-relative">
      <input
        type="text"
        name="search"
        value={input}
        className={`${styles.input} form-control`}
        placeholder="Add a user (type username)"
        onChange={e => setInput(e.target.value)}
      />

      {searchTerm && users.length > 0 && (
        <div className={styles.results}>
          {users.map(user => (
            <SearchCard key={user.uid} {...user} onClick={clearInput} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
