import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';

const Avatar = ({ size }) => {
  return (
    <div className={`${styles.root} ${size && styles[size]}`}>
      <span className={`${styles.avatarText} ratio-content`}>D</span>
    </div>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['', 'sm', 'lg']),
};

Avatar.defaultProps = {
  size: '',
};

export default Avatar;
