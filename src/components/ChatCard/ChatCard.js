import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import styles from './ChatCard.module.scss';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { formatDate } from '../../utils/datetime';
import { useState } from 'react';

const ChatCard = ({ id, members, lastMessage }) => {
  const { currentUser } = useSelector(state => state);

  const time = lastMessage.sentAt && formatDate(lastMessage.sentAt.seconds);

  const [chatTo, setChatTo] = useState({});

  const chatToUid = members.find(uid => uid !== currentUser.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', chatToUid), doc => {
      setChatTo(doc.data());
    });

    return () => {
      unsubscribe();
    };
  }, [chatToUid]);

  return (
    <div>
      <Link to={`/${id}`} className={`${styles.link} sidebar-container`}>
        <div className={styles.grid}>
          <div className="align-self-center">
            <Avatar username={chatTo.username} size="sm" />
          </div>

          <div className={styles.content}>
            <div className="d-flex flex-column justify-content-center">
              <span className="fw-bold text-truncate">{chatTo.username}</span>
              {lastMessage.text && (
                <span className={`${styles.message} text-truncate`}>
                  {lastMessage.text}
                </span>
              )}
            </div>

            {time && <span className="fw-bold">{time}</span>}
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
