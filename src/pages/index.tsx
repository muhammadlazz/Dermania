import React, { useState } from 'react';
import '../styles/LoginPage.css';  // Import style CSS untuk login page

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

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.username || !formValues.password) {
      setError('Username dan password harus diisi');
      return;
    }

    // Reset error jika validasi sukses
    setError('');

    // Logika untuk login (misalnya, panggil API login)
    console.log('Login dengan username:', formValues.username);
    console.log('Login dengan password:', formValues.password);
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
