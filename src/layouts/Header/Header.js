import { useParams } from 'react-router-dom';
import useFindChatTo from '../../hooks/useFindChatTo';
import Avatar from '../../components/Avatar';
import Menu from '../../components/Menu';
import styles from './Header.module.scss';

const Header = () => {
  const { id } = useParams();
  const { chatTo } = useFindChatTo(id);

  return (
    <div className={`${styles.root} shadow`}>
      <div className="container-fluid-px-lg">
        <div className={styles.content}>
          {/* User */}
          {chatTo?.username && (
            <div className={styles.user}>
              <Avatar username={chatTo?.username} size="lg" />

              <span className="fw-bold text-truncate">{chatTo?.username}</span>
            </div>
          )}

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
