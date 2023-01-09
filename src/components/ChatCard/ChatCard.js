import { Link } from 'react-router-dom';
import styles from './ChatCard.module.scss';

const ChatCard = () => {
  return (
    <div>
      <Link className={`${styles.link} sidebar-container`}>
        <div className={styles.grid}>
          <div className={styles.avatar}>
            <span className={`${styles.avatarText} ratio-content`}>D</span>
          </div>

          <div className={styles.content}>
            <div>
              <span className="fw-bold text-truncate">Darrell Steward</span>
              <span className={`${styles.message} text-truncate`}>
                Hi, There, How Are you?
              </span>
            </div>

            <span className="fw-bold">12:09 pm</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChatCard;
