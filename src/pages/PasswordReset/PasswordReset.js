import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FormInput from '../../components/FormInput';
import styles from './PasswordReset.module.scss';

const initialError = { code: '', message: '' };

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [message, setMessage] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsValidated(true);

    const form = e.currentTarget;
    if (!form.checkValidity()) return;

    try {
      setIsLoading(true);
      setError(initialError);
      setMessage('');

      await sendPasswordResetEmail(auth, email);

      setMessage(
        'An email has been sent. Check your inbox for further instructions.'
      );
    } catch (error) {
      console.error(error);
      setError({ code: error.code, message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.root} section`}>
      <div className="container">
        <div className="container-inner-sm text-center">
          <h1>Reset Password</h1>
          <p>Enter your email to reset password.</p>

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
                value={email}
                required
                error="Please enter a valid email."
                onChange={e => setEmail(e.target.value)}
              />

              <div className="mt-3">
                {message && !error.code && (
                  <Alert variant="success">{message}</Alert>
                )}
                {error.code && <Alert variant="danger">{error.code}</Alert>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  className="w-100"
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          </div>

          <p>
            Remember It? <Link to="/login">Sign in</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
