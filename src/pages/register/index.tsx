import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../../styles/register.css';

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.username || !formValues.password || !formValues.confirmPassword) {
      setError('All fields must be filled!');
      setSuccessMessage('');
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setError('Password and Confirm Password must match!');
      setSuccessMessage('');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formValues.username,
          password: formValues.password,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        setError('Invalid response from server.');
        setSuccessMessage('');
        return;
      }

      if (response.ok) {
        setSuccessMessage(data.message || 'Registration successful!');
        setError('');
        setFormValues({
          username: '',
          password: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed.');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error('❌ Client error:', err);
      setError('Server error. Please try again later.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-illustration">
          <img
            src="/image/payment.png"
            alt="Register Illustration"
            style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }}
          />
        </div>
      </div>

      <div className="login-right">
        <h2>Sign Up</h2>
        <p>Create a new account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Masukkan username puki"
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Masukkan password tod"
              autoComplete="new-password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              placeholder="Samain ya tod"
              autoComplete="new-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="footer-links">
            <a href="/">Already have an account? Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
