import { Outlet } from 'react-router-dom';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  );
};

export default Dashboard;
