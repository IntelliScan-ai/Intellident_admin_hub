"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '/src/app/styles/auth.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const router = useRouter();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name) errs.name = 'Full Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (form.password && form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (!form.terms) errs.terms = 'You must accept the terms';
    return errs;
  };

  const checkStrength = (pwd: string) => {
    if (!pwd) return '';
    if (pwd.length < 6) return 'Weak';
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) return 'Strong';
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) return 'Medium';
    return 'Weak';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'password') setPasswordStrength(checkStrength(value));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert('Registration successful (mock)');
      router.push('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
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
            autoComplete="new-password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          {form.password && (
            <span className={`strength ${passwordStrength.toLowerCase()}`}>Strength: {passwordStrength}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.confirm && <span className="error">{errors.confirm}</span>}
        </div>
        <div className="form-options">
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
            />
            I accept the <a href="/terms" rel="noopener noreferrer">Terms & Conditions</a>
          </label>
          {errors.terms && <span className="error">{errors.terms}</span>}
        </div>
        <button type="submit" className="auth-btn">Register</button>

        <div className="switch-link">
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
} 