import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import '../styles/LoginPage.css'; 

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
  
  const router = useRouter(); // Inisialisasi useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.username || !formValues.password) {
      setError('Username dan password harus diisi');
      setSuccessMessage(''); // Clear success message if any error exists
      return;
    }

    setError('');

    // Simulasi login sukses
    console.log('Login berhasil dengan username:', formValues.username);
    console.log('Login berhasil dengan password:', formValues.password);

    // Set success message
    setSuccessMessage('Login berhasil! Redirecting to Dashboard...');
    
    // Setelah 2 detik, redirect ke halaman dashboard
    setTimeout(() => {
      router.push('/dashboard'); // Arahkan ke halaman dashboard
    }, 2000); // 2 detik delay
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
        <h2>Welcome back</h2>
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

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}

          <button type="submit" className="login-button">Login</button>

          <div className="footer-links">
            <a href="#">Create Account</a>
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
