import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser } from '../../redux/usersSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/format';
import Avatar from '../Avatar';
import styles from './ChatCard.module.scss';

const ChatCard = ({ id, members, lastMessage }) => {
  const { currentUser, users } = useSelector(state => state);
  const dispatch = useDispatch();

  const chatToUid = members.find(uid => uid !== currentUser.uid);
  const chatTo = users.find(user => user.uid === chatToUid);

  const time = lastMessage.sentAt && formatDate(lastMessage.sentAt.seconds);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', chatToUid), doc => {
      dispatch(setUser(doc.data()));
    });

    return () => {
      unsubscribe();
      // Clear user not to create duplicates nor keep deleted items
      dispatch(removeUser(chatToUid));
    };
  }, [chatToUid, dispatch]);

  return (
    <div>
      <Link to={`/${id}`} className={`${styles.link} sidebar-container`}>
        <div className={styles.grid}>
          <div className="align-self-center">
            <Avatar username={chatTo?.username} size="sm" />
          </div>

          <div className={styles.content}>
            <div className="d-flex flex-column justify-content-center">
              <span className="fw-bold text-truncate">{chatTo?.username}</span>
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
  id: PropTypes.string,
  members: PropTypes.array,
  lastMessage: PropTypes.object,
};

ChatCard.defaultProps = {
  id: '',
  members: [],
  lastMessage: {},
};

export default ChatCard;
