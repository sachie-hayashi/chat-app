import PropTypes from 'prop-types';
import styles from './FormInput.module.scss';

const FormInput = ({
  label,
  type,
  name,
  value,
  required,
  disabled,
  placeholder,
  error,
  ...others
}) => {
  return (
    <label className={styles.root}>
      {label && <span className={styles.labelText}>{label}</span>}
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="form-control"
        {...others}
      />
      {error && <span className="invalid-feedback">{error}</span>}
    </label>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

FormInput.defaultTypes = {
  label: '',
  type: 'text',
  name: '',
  value: '',
  required: false,
  disabled: false,
  placeholder: '',
  error: '',
};

export default FormInput;
