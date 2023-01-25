import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import styles from './SearchCard.module.scss';

const SearchCard = ({ uid, username, email, onClick }) => {
  const { currentUser } = useSelector(state => state);

  const combineIds = (id1 = '', id2 = '') =>
    id1 < id2 ? `${id1}${id2}` : `${id2}${id1}`;

  const chatId = combineIds(uid, currentUser.uid);

  const handleClick = async () => {
    try {
      await setDoc(doc(db, 'chatList', chatId), {
        id: chatId,
        members: [uid, currentUser.uid],
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        lastMessage: {},
      });
    } catch (error) {
      console.error(error);
    }

    onClick();
  };

  return (
    <div>
      <Link
        to={`/${chatId}`}
        className={`${styles.link} sidebar-container`}
        onClick={handleClick}
      >
        <div className={styles.grid}>
          <div className="align-self-center">
            <Avatar username={username} size="sm" />
          </div>

          <div>
            <span className="d-block mb-1 fw-bold text-truncate">
              {username}
            </span>
            <span className={`${styles.text} text-truncate`}>{email}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

SearchCard.propTypes = {
  uid: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  onClick: PropTypes.func,
};

SearchCard.defaultProps = {
  uid: '',
  username: '',
  email: '',
  onClick: () => {},
};

export default SearchCard;
