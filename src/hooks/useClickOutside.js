import { useEffect } from 'react';

/**
 * Execute callback on click outside
 * @param {object} ref - Element inside (React ref)
 * @param {function} callback
 */

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = e => {
      if (typeof callback !== 'function') return;
      if (ref?.current?.contains(e.target)) return;

      callback();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
