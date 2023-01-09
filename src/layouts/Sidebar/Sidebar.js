import ChatCard from '../../components/ChatCard';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={`${styles.root} shadow`}>
      <div className={styles.sidebarHeader}>
        <div className="sidebar-container">
          <h1 className={styles.sidebarTitle}>Messages</h1>
        </div>
      </div>

      <div className={`${styles.chatList} list-unstyled`}>
        {[...Array(8)].map((item, i) => (
          <ChatCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
