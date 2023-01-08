import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FormInput from '../../components/FormInput/FormInput';
import styles from './Signup.module.scss';

const initialInputs = { username: '', email: '', password: '' };

const Signup = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [isValidated, setIsValidated] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsValidated(true);

    const form = e.currentTarget;
    if (!form.checkValidity()) return;

    console.log('** inputs: ', inputs);
  };

  return (
    <div className={`${styles.root} section`}>
      <div className="container">
        <div className="container-inner-sm text-center">
          <h1>Sign up</h1>
          <p>Get your account now.</p>

          <div className="my-5">
            <form
              noValidate
              className={`form ${isValidated ? 'was-validated' : ''}`}
              onSubmit={handleSubmit}
            >
              <FormInput
                label="Username"
                type="text"
                name="username"
                required
                error="Please enter a valid username."
                onChange={handleChange}
              />
              <FormInput
                label="Email"
                type="email"
                name="email"
                required
                error="Please enter a valid email."
                onChange={handleChange}
              />
              <FormInput
                label="Password"
                type="password"
                name="password"
                minLength="6"
                required
                error="Please enter a valid password. (6 characters or more)"
                onChange={handleChange}
              />
              <Button type="submit" variant="primary" className="mt-3">
                Sign Up
              </Button>
            </form>
          </div>

          <p>
            Already have an account? <Link to="/login">Sign in</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
