import { Outlet } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Sidebar from '../../layouts/Sidebar';
import ChatFeed from '../../layouts/ChatFeed';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Header />
      {/* <ChatFeed /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Dashboard;
