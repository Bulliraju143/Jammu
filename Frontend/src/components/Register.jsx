import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function ClickSafeRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyDescription: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendOTP = async () => {
    setErrors({});
    
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
        // Only log OTP in console for development
        if (data.otp) {
          console.log('Development Mode - OTP sent to console:', data.otp);
        }
      } else {
        setErrors({ email: data.error || 'Failed to send OTP' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setErrors({});
    
    if (!formData.otp || formData.otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          otp: formData.otp 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(3);
      } else {
        setErrors({ otp: data.error || 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ otp: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = () => {
    setErrors({});
    
    if (!formData.password || formData.password.length < 8) {
      setErrors({ password: 'Password must be at least 8 characters' });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setStep(4);
  };

  const handleCompanyDetails = async () => {
    setErrors({});
    
    if (!formData.companyName) {
      setErrors({ companyName: 'Company name is required' });
      return;
    }
    
    if (!formData.companyDescription || formData.companyDescription.length < 20) {
      setErrors({ companyDescription: 'Please provide a description (minimum 20 characters)' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          companyName: formData.companyName,
          companyDescription: formData.companyDescription
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('clicksafe_token', data.token);
        localStorage.setItem('clicksafe_user', JSON.stringify(data.user));
        setStep(5);
      } else {
        setErrors({ companyName: data.error || 'Registration failed' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ companyName: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
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

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'oklch(0.23 0.06 264.88)' }}>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Shield className="w-10 h-10" style={{ color: 'oklch(0.62 0.03 269.34)' }} />
          <span className="text-3xl font-bold text-white">ClickSafe</span>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step >= num ? 'text-white' : 'text-gray-500'
                  }`}
                  style={{
                    background: step >= num ? 'oklch(0.42 0.11 268.04)' : 'oklch(0.23 0.06 264.88)',
                    border: step >= num ? 'none' : '2px solid oklch(0.42 0.11 268.04)'
                  }}
                >
                  {num}
                </div>
                {num < 4 && (
                  <div
                    className="w-8 h-0.5 mx-1"
                    style={{
                      background: step > num ? 'oklch(0.42 0.11 268.04)' : 'oklch(0.23 0.06 264.88)',
                      border: step <= num ? '1px solid oklch(0.42 0.11 268.04)' : 'none'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-8 shadow-2xl" style={{ background: 'oklch(0.23 0.06 264.88)' }}>
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 mb-6">Enter your email to get started</p>
              
              <div className="mb-6">
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
                    onKeyPress={(e) => handleKeyPress(e, handleSendOTP)}
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

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: 'oklch(0.42 0.11 268.04)' }}
              >
                {loading ? 'Sending...' : 'Send OTP'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Verify Email</h2>
              <p className="text-gray-400 mb-6">
                Enter the 6-digit code sent to<br />
                <span className="font-semibold" style={{ color: 'oklch(0.62 0.03 269.34)' }}>
                  {formData.email}
                </span>
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  OTP Code
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  onKeyPress={(e) => handleKeyPress(e, handleVerifyOTP)}
                  maxLength="6"
                  className="w-full px-4 py-3 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'oklch(0.23 0.06 264.88)',
                    border: '1px solid oklch(0.42 0.11 268.04)',
                    caretColor: 'oklch(0.62 0.03 269.34)'
                  }}
                  placeholder="000000"
                />
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-400">{errors.otp}</p>
                )}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: 'oklch(0.42 0.11 268.04)' }}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Change email
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Set Password</h2>
              <p className="text-gray-400 mb-6">Create a strong password for your account</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all"
                    style={{
                      background: 'oklch(0.23 0.06 264.88)',
                      border: '1px solid oklch(0.42 0.11 268.04)',
                      caretColor: 'oklch(0.62 0.03 269.34)'
                    }}
                    placeholder="Minimum 8 characters"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onKeyPress={(e) => handleKeyPress(e, handleSetPassword)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all"
                    style={{
                      background: 'oklch(0.23 0.06 264.88)',
                      border: '1px solid oklch(0.42 0.11 268.04)',
                      caretColor: 'oklch(0.62 0.03 269.34)'
                    }}
                    placeholder="Re-enter password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                onClick={handleSetPassword}
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: 'oklch(0.42 0.11 268.04)' }}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Company Details</h2>
              <p className="text-gray-400 mb-6">Tell us about your organization</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all"
                    style={{
                      background: 'oklch(0.23 0.06 264.88)',
                      border: '1px solid oklch(0.42 0.11 268.04)',
                      caretColor: 'oklch(0.62 0.03 269.34)'
                    }}
                    placeholder="Your Company Inc."
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-2 text-sm text-red-400">{errors.companyName}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Description
                </label>
                <textarea
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    background: 'oklch(0.23 0.06 264.88)',
                    border: '1px solid oklch(0.42 0.11 268.04)',
                    caretColor: 'oklch(0.62 0.03 269.34)'
                  }}
                  placeholder="Describe what your company does, your industry, and team size..."
                />
                {errors.companyDescription && (
                  <p className="mt-2 text-sm text-red-400">{errors.companyDescription}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {formData.companyDescription.length}/20 minimum characters
                </p>
              </div>

              <button
                onClick={handleCompanyDetails}
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: 'oklch(0.42 0.11 268.04)' }}
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.42 0.11 268.04)' }}>
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to ClickSafe!</h2>
              <p className="text-gray-400 mb-8">
                Your account has been created successfully.<br />
                Email verified: <span className="font-semibold" style={{ color: 'oklch(0.62 0.03 269.34)' }}>{formData.email}</span>
              </p>

              <div className="rounded-lg p-4 mb-6 text-left" style={{ background: 'oklch(0.23 0.06 264.88)', border: '1px solid oklch(0.42 0.11 268.04)' }}>
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-white">Company:</span> {formData.companyName}
                </p>
                <p className="text-sm text-gray-400">
                  {formData.companyDescription}
                </p>
              </div>

              <button
                onClick={handleGoToDashboard}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'oklch(0.42 0.11 268.04)' }}
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        {step < 5 && (
          <Link to="/login">
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <span className="font-semibold hover:underline transition-colors" style={{ color: 'oklch(0.62 0.03 269.34)' }}>
                Sign In
              </span>
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}