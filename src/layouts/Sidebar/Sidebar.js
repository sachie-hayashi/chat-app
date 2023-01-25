import { useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearChatList, setChatItem } from '../../redux/chatListSlice';
import SearchForm from '../../components/SearchForm';
import ChatCard from '../../components/ChatCard';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { currentUser, chatList } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(
      collection(db, 'chatList'),
      where('members', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      // Clear chatList not to create duplicates
      dispatch(clearChatList());

      querySnapshot.forEach(doc => {
        dispatch(setChatItem(doc.data()));
      });
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.uid, dispatch]);

  return (
    <div className={`${styles.root} shadow`}>
      <div className={styles.sidebarHeader}>
        <div className="sidebar-container">
          <h1 className={styles.sidebarTitle}>
            <Link to="/" className="text-inherit">
              Messages
            </Link>
          </h1>
        </div>
      </div>

      <div className="pb-3">
        <div className="sidebar-container">
          <SearchForm />
        </div>
      </div>

      <div className={`${styles.chatList} list-unstyled`}>
        {chatList.map(item => (
          <ChatCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
