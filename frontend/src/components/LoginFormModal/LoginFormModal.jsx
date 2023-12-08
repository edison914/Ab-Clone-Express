import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
//import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  //const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  //if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.message) {
          setErrors(data);
        }
        console.log(errors)
      });
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setCredential('Demouser')
    setPassword('demouser')
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.message) {
          setErrors(data);
        }
        console.log(errors)
    });
  }

  return (
    <>
      <h1 className='login'>Log In</h1>
      <form className='form' onSubmit={handleSubmit}>
        {errors.message && (
          <p className='form-error-message'>The provided credentials were invalid</p>
        )}
        <label className='form-label'>
          <input className='form-input '
            type="text"
            value={credential}
            placeholder="Enter your username or email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='form-label'>
          <input className='form-input '
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {credential.length >3 && password.length >6 && (
          <button className='form-button' type="submit">Log In</button>
        )}
        <button className='form-demo-login'
          type='button'
          onClick={handleDemoLogin}
        >
          Log in as Demo User
        </button>
      </form>
    </>

  );
}

export default LoginFormModal;
