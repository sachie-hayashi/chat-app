import { useState, useEffect, useRef, useMemo } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import useClickOutside from '../../hooks/useClickOutside';
import SearchCard from '../SearchCard';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const ref = useRef(null);

  const { currentUser, chatList } = useSelector(state => state);

  const searchTerm = input.trim();

  const clearInput = () => setInput('');

  // Find existing users by member's uid
  // use useMemo for useEffect not to create infinite loop
  const existingUsers = useMemo(() => {
    return chatList.map(item =>
      item.members.find(user => user.uid !== currentUser.uid)
    );
  }, [chatList, currentUser.uid]);

  useClickOutside(ref, clearInput);

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
