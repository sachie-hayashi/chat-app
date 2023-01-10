import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';

const Avatar = ({ username, size }) => {
  return (
    <div className={`${styles.root} ${size && styles[size]}`}>
      <span className={`${styles.avatarText} ratio-content`}>
        {/* 1st letter of username */}
        {username.substring(0, 1)}
      </span>
    </div>
  );
};

Avatar.propTypes = {
  username: PropTypes.string,
  size: PropTypes.oneOf(['', 'sm', 'lg']),
};

Avatar.defaultProps = {
  username: '',
  size: '',
};

export default Avatar;
