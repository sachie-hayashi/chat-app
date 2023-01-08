import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FormInput from '../../components/FormInput/FormInput';
import styles from './Login.module.scss';

const initialInputs = { email: '', password: '' };

const Login = () => {
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
          <h1>Sign in</h1>
          <p>Sign in to continue.</p>

          <div className="my-5">
            <form
              noValidate
              className={`form ${isValidated ? 'was-validated' : ''}`}
              onSubmit={handleSubmit}
            >
              <FormInput
                label="Email"
                type="email"
                name="email"
                required
                error="Please enter a valid email."
                onChange={handleChange}
              />
              <div>
                <Link to="password-reset" className="float-end">
                  Forgot password
                </Link>
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  minLength="6"
                  required
                  error="Please enter a valid password. (6 characters or more)"
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" variant="primary" className="mt-3">
                Sign In
              </Button>
            </form>
          </div>

          <p>
            Don't have an account? <Link to="/register">Sign up</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
