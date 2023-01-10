import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import ChatFeed from '../../layouts/ChatFeed/ChatFeed';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Header />
      <ChatFeed />
      <Footer />
    </div>
  );
};

export default Dashboard;
