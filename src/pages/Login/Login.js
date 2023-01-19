import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FormInput from '../../components/FormInput';
import styles from './Login.module.scss';

const initialInputs = { email: '', password: '' };

const Login = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ code: '', message: '' });
  const [isValidated, setIsValidated] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsValidated(true);

    const form = e.currentTarget;
    if (!form.checkValidity()) return;

    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);

      navigate('/');
    } catch (error) {
      console.error(error);
      setError(prev => ({ ...prev, code: error.code, message: error.message }));
    } finally {
      setIsLoading(false);
    }
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
                value={inputs.email}
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
                  value={inputs.password}
                  minLength="6"
                  required
                  error="Please enter a valid password. (6 characters or more)"
                  onChange={handleChange}
                />
              </div>

              <div className="mt-3">
                {error.code && <Alert variant="danger">{error.code}</Alert>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  className="w-100"
                >
                  Sign In
                </Button>
              </div>
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
