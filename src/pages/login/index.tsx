// src/pages/index.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import '../../styles/LoginPage.css'; 

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter(); // Inisialisasi useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.username || !formValues.password) {
      setError('Username dan password harus diisi');
      setSuccessMessage(''); // Clear success message if any error exists
      return;
    }

    setError('');
    setLoading(true); // Set loading to true while processing

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formValues.username,
          password: formValues.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login berhasil! Redirecting to Dashboard...');
        setError('');
        setFormValues({
          username: '',
          password: '',
        });

        // Setelah 2 detik, redirect ke halaman dashboard
        setTimeout(() => {
          router.push('/dashboard'); // Arahkan ke halaman dashboard
        }, 2000); // 2 detik delay
      } else {
        setError(data.error || 'Login gagal.');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan, silakan coba lagi.');
      setSuccessMessage('');
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-illustration">
          <img 
            src="/image/payment.png" 
            alt="Payment Illustration" 
            style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }} 
          />
        </div>
      </div>

      <div className="login-right">
        <h2>Welcome Back Prend</h2>
        <p>Login your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Masukkan username anda"
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
              placeholder="Masukkan password anda"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="footer-links">
            <a href="/register">Create Account</a> {/* Link ke halaman register */}
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
