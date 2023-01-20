import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import styles from './ChatCard.module.scss';

const ChatCard = ({ uid, username }) => {
  return (
    <div>
      <Link to={`/${uid}`} className={`${styles.link} sidebar-container`}>
        <div className={styles.grid}>
          <div className="align-self-center">
            <Avatar username={username} size="sm" />
          </div>

          <div className={styles.content}>
            <div>
              <span className="fw-bold text-truncate">{username}</span>
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

ChatCard.propTypes = {
  uid: PropTypes.string,
  username: PropTypes.string,
};

ChatCard.defaultProps = {
  uid: '',
  username: '',
};

export default ChatCard;
