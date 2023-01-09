import { useState } from 'react';
import Icon from '../../components/Icon';
import styles from './Footer.module.scss';

const Footer = () => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log('** input: ', input);

    setInput('');
  };

  const handleUpload = e => {
    console.log('** file: ', e.target.files[0]);
  };

  return (
    <div className="py-3">
      <div className="container-fluid-px-lg">
        {/* Message Form */}
        <form className="position-relative" onSubmit={handleSubmit}>
          <textarea
            name="message"
            value={input}
            rows={1}
            className={`${styles.textarea} form-control`}
            placeholder="Type a new message"
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className={styles.submit}>
            <Icon name="paper-plane" />
          </button>
        </form>

        <ul className={`${styles.inputList} list-unstyled`}>
          <li>
            {/* Image Upload */}
            <label>
              <input
                type="file"
                name="file"
                accept="image/*"
                className="visually-hidden"
                onChange={handleUpload}
              />
              <Icon name="paperclip" />
            </label>
          </li>

          <li>
            <button type="button">
              <Icon name="smiley-smile" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
