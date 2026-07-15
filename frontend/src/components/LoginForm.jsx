import React, { useMemo, useState } from 'react';

import InputField from './InputField';
import '../styles/LoginForm.css';

const emailPattern = /^\S+@\S+\.\S+$/;

const initialValues = {
  email: '',
  password: '',
  remember: false
};

function LoginForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusVariant, setStatusVariant] = useState('neutral');
  const [capsLockOn, setCapsLockOn] = useState(false);

  const errors = useMemo(() => {
    const next = {};

    if (!values.email) {
      next.email = 'Email is required.';
    } else if (!emailPattern.test(values.email)) {
      next.email = 'Enter a valid email address.';
    }

    if (!values.password) {
      next.password = 'Password is required.';
    } else if (values.password.length < 8) {
      next.password = 'Password must be at least 8 characters long.';
    }

    return next;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (field) => (event) => {
    const nextValue = field === 'remember' ? event.target.checked : event.target.value;
    setValues((prev) => ({
      ...prev,
      [field]: nextValue
    }));

    if (statusMessage) {
      setStatusMessage('');
      setStatusVariant('neutral');
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) {
      setStatusMessage('Please correct the highlighted fields above.');
      setStatusVariant('error');
      return;
    }

    setStatusMessage('This is a UI-only prototype — no authentication is executed.');
    setStatusVariant('success');
  };

  const handleCapsLockToggle = (event) => {
    setCapsLockOn(event.getModifierState('CapsLock'));
  };

  const showError = (field) => {
    if (!errors[field]) {
      return false;
    }

    return touched[field] || submitted;
  };

  return (
    <div className="login-card" aria-live="polite">
      <p className="eyebrow">Secure Access</p>
      <h1>Sign in</h1>
      <p className="subhead">Control your dashboard and preferences.</p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          placeholder="you@example.com"
          error={showError('email') ? errors.email : ''}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          placeholder="••••••••"
          onKeyDown={handleCapsLockToggle}
          onKeyUp={handleCapsLockToggle}
          error={showError('password') ? errors.password : ''}
        />

        <div className="remember-row">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={values.remember}
              onChange={handleChange('remember')}
            />
            <span>Keep me signed in</span>
          </label>
          <button type="button" className="ghost-link">
            Forgot password?
          </button>
        </div>

        {capsLockOn && <p className="caps-warning">Caps lock is on. Passwords are case-sensitive.</p>}

        <button className="primary-btn" type="submit" disabled={!values.email || !values.password || !isValid}>
          Sign in
        </button>

        {statusMessage && (
          <p className={`status-message ${statusVariant === 'success' ? 'status-success' : 'status-error'}`}>
            {statusMessage}
          </p>
        )}
      </form>

      <p className="hint-line">
        New here? <a href="#!">Create an account</a>
      </p>
    </div>
  );
}

export default LoginForm;
