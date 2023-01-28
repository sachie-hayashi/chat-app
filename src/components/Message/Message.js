import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Avatar from '../Avatar';
import styles from './Message.module.scss';

const Message = ({ text, image, sentBy, sentAt, chatTo }) => {
  const { currentUser } = useSelector(state => state);

  const time = dayjs.unix(sentAt.seconds).format('MMM D, YYYY, h:mm a');

  const isCurrentUser = sentBy === currentUser.uid;

  return (
    <div className={styles.root}>
      <div
        className={`${styles.grid} ${
          isCurrentUser ? styles.right : styles.left
        }`}
      >
        <div className={styles.avatar}>
          <Avatar
            username={isCurrentUser ? currentUser.username : chatTo?.username}
          />
        </div>

        <div className={`${styles.content} shadow-sm`}>
          {text && <span className="fw-semibold">{text}</span>}
          {image && (
            <img src={image} alt="" loading="lazy" className={styles.image} />
          )}
        </div>

        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  image: PropTypes.string,
  sentBy: PropTypes.string,
  sentAt: PropTypes.object,
  chatTo: PropTypes.object,
};

Message.defaultProps = {
  text: '',
  image: '',
  sentBy: '',
  sentAt: {},
  chatTo: {},
};

export default Message;
