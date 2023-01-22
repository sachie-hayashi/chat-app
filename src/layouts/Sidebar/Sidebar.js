import { useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import ChatCard from '../../components/ChatCard';
import styles from './Sidebar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearUsers, setUsers } from '../../redux/usersSlice';

const Sidebar = () => {
  const { users } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, 'users'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      // Clear users not to create duplicates
      dispatch(clearUsers());

      querySnapshot.forEach(doc => {
        dispatch(setUsers(doc.data()));
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
