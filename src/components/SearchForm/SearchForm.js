import { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import useClickOutside from '../../hooks/useClickOutside';
import SearchCard from '../SearchCard';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
  const [input, setInput] = useState('');
  const [resultUsers, setResultUsers] = useState([]);
  const ref = useRef(null);

  const { currentUser, users } = useSelector(state => state);

  const searchTerm = input.trim();

  const clearInput = () => setInput('');

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
      setResultUsers([]);

      querySnapshot.forEach(doc => {
        const data = doc.data();

        const existingUsers = users.map(user => user.uid);
        // Remove existing users && current user from search result
        if (existingUsers.includes(data.uid) || data.uid === currentUser.uid) {
          return;
        }

        setResultUsers(prev => [...prev, doc.data()]);
      });
    };

    try {
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }, [currentUser.uid, searchTerm, users]);

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

      {searchTerm && resultUsers.length > 0 && (
        <div className={styles.results}>
          {resultUsers.map(user => (
            <SearchCard key={user.uid} {...user} onClick={clearInput} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
