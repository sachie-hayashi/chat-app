import Avatar from '../../components/Avatar';
import Icon from '../../components/Icon';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={`${styles.root} shadow`}>
      <div className="container-fluid-px-lg">
        <div className={styles.content}>
          {/* User */}
          <div className={styles.user}>
            <Avatar size="lg" />

            <span className="fw-bold text-truncate">Darrell Steward</span>
          </div>

          {/* Navigation */}
          <ul className={`${styles.navigation} list-unstyled`}>
            <li>
              <button type="button">
                <Icon name="three-dots" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
