"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '/src/app/styles/auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert('Login successful (mock)');
      router.push('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="Username or Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-options">
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>
          <Link href="/forgot-password" className="forgot-link">Forgot Password?</Link>
        </div>
        <button type="submit" className="auth-btn">Sign In</button>
        <div className="switch-link">
          Don't have an account? <Link href="/register">Register</Link>
        </div>
      </form>
    </div>
  );
} 