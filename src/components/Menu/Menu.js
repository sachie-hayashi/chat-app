import { useState, useRef } from 'react';
import Icon from '../Icon';
import useClickOutside from '../../hooks/useClickOutside';
import styles from './Menu.module.scss';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

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
            <button type="button" className={styles.dropdownLink}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
