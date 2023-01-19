import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FormInput from '../../components/FormInput';
import styles from './Signup.module.scss';

const initialInputs = { username: '', email: '', password: '' };

const Signup = () => {
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

      // Create user on firebase auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      // Create user on firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        username: inputs.username,
        email: inputs.email,
        createdAt: serverTimestamp(),
      });

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
                value={inputs.username}
                pattern="^[^\s]+(\s+[^\s]+)*$"
                minLength="2"
                required
                error="Please enter a valid username. (2 characters or more, no whitespace at the beginning and end)"
                onChange={handleChange}
              />
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={inputs.email}
                required
                error="Please enter a valid email."
                onChange={handleChange}
              />
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

              <div className="mt-3">
                {error.message && (
                  <Alert variant="danger">{error.message}</Alert>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  className="w-100"
                >
                  Sign Up
                </Button>
              </div>
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
