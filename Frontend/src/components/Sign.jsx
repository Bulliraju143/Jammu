import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function ClickSafeSignIn() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = () => {
    setErrors({});
    
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }

    if (!formData.password) {
      setErrors({ password: 'Password is required' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Sign in successful! Redirecting to dashboard...');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'oklch(0.23 0.06 264.88)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
         <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">ClickSafe</span>
        </div>
      
        {/* Main Card */}
        <div className="rounded-2xl p-8 shadow-2xl" style={{ background: 'oklch(0.23 0.06 264.88)', border: '1px solid oklch(0.42 0.11 268.04)' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your ClickSafe account</p>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: 'oklch(0.23 0.06 264.88)',
                  border: '1px solid oklch(0.42 0.11 268.04)',
                  caretColor: 'oklch(0.62 0.03 269.34)'
                }}
                placeholder="you@company.com"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <button
                onClick={() => alert('Password reset link sent!')}
                className="text-sm font-medium hover:underline transition-colors"
                style={{ color: '#0085ce' }}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-12 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: 'oklch(0.23 0.06 264.88)',
                  border: '1px solid oklch(0.42 0.11 268.04)',
                  caretColor: 'oklch(0.62 0.03 269.34)'
                }}
                placeholder="Enter your password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded focus:ring-2 transition-all"
              style={{
                accentColor: 'oklch(0.42 0.11 268.04)'
              }}
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
              Remember me for 30 days
            </label>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 mb-4"
            style={{ background: 'oklch(0.42 0.11 268.04)' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'oklch(0.42 0.11 268.04)' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-500" style={{ background: 'oklch(0.23 0.06 264.88)' }}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign In Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => alert('Google sign in')}
              className="flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white transition-all hover:opacity-80"
              style={{ background: 'oklch(0.23 0.06 264.88)', border: '1px solid oklch(0.42 0.11 268.04)' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => alert('Microsoft sign in')}
              className="flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white transition-all hover:opacity-80"
              style={{ background: 'oklch(0.23 0.06 264.88)', border: '1px solid oklch(0.42 0.11 268.04)' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
              </svg>
              Microsoft
            </button>
          </div>
        </div>

        {/* Footer */}
        <Link to="/register">
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <button
            
            className="font-semibold hover:underline transition-colors"
            style={{ color: 'oklch(0.62 0.03 269.34)' }}
          >
            Create Account
          </button>
        </p>
        </Link>

        {/* Additional Links */}
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
          <button className="hover:text-gray-300 transition-colors">Terms</button>
          <span>•</span>
          <button className="hover:text-gray-300 transition-colors">Privacy</button>
          <span>•</span>
          <button className="hover:text-gray-300 transition-colors">Help</button>
        </div>
      </div>
    </div>
  );
}