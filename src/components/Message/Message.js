import 'firebase/firestore';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import styles from './Message.module.scss';

const Message = ({ text, sentBy, sentAt }) => {
  const { currentUser } = useSelector(state => state);

  const formatTime = timeObj => {
    const time = timeObj.toDate();

    const options = {
      dateStyle: 'medium',
      timeStyle: 'short',
    };

    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  const time = formatTime(sentAt);

  return (
    <div className={styles.root}>
      <div
        className={`${styles.grid} ${
          sentBy === currentUser.uid ? styles.right : styles.left
        }`}
      >
        <div className={styles.avatar}>
          <Avatar username="Darrell Steward" />
        </div>

        <div className={`${styles.content} shadow-sm`}>
          {text && <span className="fw-semibold">{text}</span>}
        </div>

        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  sentBy: PropTypes.string.isRequired,
  sentAt: PropTypes.object.isRequired,
};

Message.defaultProps = {
  text: '',
};

export default Message;
