import { useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Icon from '../Icon';
import useClickOutside from '../../hooks/useClickOutside';
import styles from './Menu.module.scss';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const logout = () => {
    signOut(auth).catch(error => console.error(error));
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="position-relative">
      <button
        type="button"
        ref={ref}
        className={styles.toggle}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Icon name="three-dots" />
      </button>

      {isOpen && (
        <ul className={`${styles.dropdownMenu} list-unstyled shadow-sm`}>
          <li>
            <button
              type="button"
              className={styles.dropdownLink}
              onClick={logout}
            >
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
