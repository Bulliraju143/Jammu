import React, { useState } from 'react';
import { Shield, Mail, Users, BarChart3, Lock, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';

export default function Welcome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRegister = () => {
    alert('Registration page will open');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-blue-800/30 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">ClickSafe</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-blue-800/30">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-300 hover:text-white">Features</a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-white">How It Works</a>
              <a href="#pricing" className="block text-gray-300 hover:text-white">Pricing</a>
              <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 mb-6">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Trusted by 500+ Organizations</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Train Your Team to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Spot Phishing</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Protect your organization with realistic phishing simulations and comprehensive security awareness training. Turn your employees into your strongest defense.
          </p>

          <div className="max-w-md mx-auto">
            <button
              onClick={handleRegister}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center gap-2"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to Stay Secure
            </h2>
            <p className="text-xl text-gray-400">Comprehensive phishing training made simple</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 border border-blue-800/30 rounded-2xl p-8 hover:border-blue-600/50 transition">
              <Mail className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Realistic Simulations</h3>
              <p className="text-gray-400">
                Deploy automated phishing campaigns with templates based on real-world attacks. Test your team's awareness safely.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-blue-800/30 rounded-2xl p-8 hover:border-blue-600/50 transition">
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Interactive Training</h3>
              <p className="text-gray-400">
                Engaging micro-learning modules that teach employees to identify and report phishing attempts effectively.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-blue-800/30 rounded-2xl p-8 hover:border-blue-600/50 transition">
              <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Advanced Analytics</h3>
              <p className="text-gray-400">
                Track progress with detailed reports. Identify at-risk users and measure the effectiveness of your training programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How ClickSafe Works
            </h2>
            <p className="text-xl text-gray-400">Simple setup, powerful results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Deploy Campaigns</h3>
              <p className="text-gray-400">
                Choose from 100+ customizable phishing templates or create your own. Schedule automated campaigns.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Train Employees</h3>
              <p className="text-gray-400">
                When employees click, they receive immediate training. Learn from mistakes in a safe environment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Monitor Progress</h3>
              <p className="text-gray-400">
                Track metrics, generate compliance reports, and watch your organization's security posture improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Strengthen Your Security?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of companies protecting their teams with ClickSafe
          </p>
          <div className="max-w-md mx-auto">
            <button
              onClick={handleRegister}
              className="w-full px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 border-t border-blue-800/30">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">ClickSafe</span>
          </div>
          <p className="mb-4">Empowering organizations with security awareness training</p>
          <p className="text-sm">© 2025 ClickSafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}