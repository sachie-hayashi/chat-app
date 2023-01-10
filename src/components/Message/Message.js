import Avatar from '../Avatar';
import styles from './Message.module.scss';

const Message = ({ message, side }) => {
  return (
    <div className={styles.root}>
      <div
        className={`${styles.grid} ${
          side === 'left' ? styles.left : styles.right
        }`}
      >
        <div className={styles.avatar}>
          <Avatar />
        </div>

        <div className={`${styles.content} shadow-sm`}>
          {message && <span className="fw-semibold">{message}</span>}
        </div>

        <span className={styles.time}>1:01 pm</span>
      </div>
    </div>
  );
};

Message.defaultProps = {
  message: '',
  side: '',
};

export default Message;
