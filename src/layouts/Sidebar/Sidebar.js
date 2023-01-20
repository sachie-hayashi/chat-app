import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import ChatCard from '../../components/ChatCard';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      // Clear users not to create duplicates
      setUsers([]);

      querySnapshot.forEach(doc => {
        setUsers(prev => [...prev, doc.data()]);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={`${styles.root} shadow`}>
      <div className={styles.sidebarHeader}>
        <div className="sidebar-container">
          <h1 className={styles.sidebarTitle}>Messages</h1>
        </div>
      </div>

      <div className={`${styles.chatList} list-unstyled`}>
        {users.map(user => (
          <ChatCard key={user.uid} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
