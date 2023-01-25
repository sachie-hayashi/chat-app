import Avatar from '../../components/Avatar';
import Menu from '../../components/Menu';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={`${styles.root} shadow`}>
      <div className="container-fluid-px-lg">
        <div className={styles.content}>
          {/* User */}
          <div className={styles.user}>
            <Avatar username="Darrell Steward" size="lg" />

            <span className="fw-bold text-truncate">Darrell Steward</span>
          </div>

          {/* Navigation */}
          <ul className={`${styles.navigation} list-unstyled ms-auto`}>
            <li>
              <Menu />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
