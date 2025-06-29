import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-white mb-6">
              Take Control of Your
              <span className="text-blue-400 block">Financial Future</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              FinSight provides powerful analytics and insights to help you make informed financial decisions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-400 text-2xl">📊</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-slate-400 text-sm">Track your income and expenses with detailed charts and insights.</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-400 text-2xl">🔒</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Secure & Private</h3>
                <p className="text-slate-400 text-sm">Your financial data is encrypted and protected with industry-standard security.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};