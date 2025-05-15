import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import '../../styles/register.css'; // Path yang benar

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

  const router = useRouter(); // Initialize useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    setError('');
    setSuccessMessage('Registration successful! You can now login.');

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      router.push('/');
    }, 2000); 
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
              placeholder="Enter your username"
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
              placeholder="Enter your password"
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
              placeholder="Confirm your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <button type="submit" className="login-button">Register</button>

          <div className="footer-links">
            <a href="/">Already have an account? Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
