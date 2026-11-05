import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User as UserIcon, Sparkles } from 'lucide-react';
import { User } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('Rajesh Kumar');
  const [email, setEmail] = useState('rajesh@sweetbites.com');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [password, setPassword] = useState('password123');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loggedUser: User = {
      id: `usr_${Date.now()}`,
      fullName: fullName.trim() || 'Rajesh Kumar',
      email: email.trim() || 'rajesh@sweetbites.com',
      phoneNumber: phoneNumber.trim() || '9876543210',
      planTier: 'STARTER'
    };
    localStorage.setItem('neurozy_user', JSON.stringify(loggedUser));
    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    const demoUser: User = {
      id: 'usr_demo_lucknow',
      fullName: 'Rajesh Kumar (Sweet Bites)',
      email: 'founder@sweetbites.com',
      phoneNumber: '9876543210',
      planTier: 'STARTER'
    };
    localStorage.setItem('neurozy_user', JSON.stringify(demoUser));
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#7C3AED] flex items-center justify-center text-white">
              <span className="font-extrabold text-sm italic">N</span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              {isSignUp ? 'Create Neurozy Account' : 'Welcome Back to Neurozy'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {isSignUp && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rajesh@sweetbites.com"
                className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Phone / WhatsApp Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
          >
            {isSignUp ? 'Create Account & Continue' : 'Sign In to Dashboard'}
          </button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
              <span className="bg-white px-2">or quick test</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Founder Demo Login</span>
          </button>

          <div className="pt-2 text-center text-slate-500 text-xs">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(false)} 
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                New to Neurozy?{' '}
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(true)} 
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Create Free Account
                </button>
              </span>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
