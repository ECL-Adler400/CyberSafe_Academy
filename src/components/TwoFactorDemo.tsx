import React, { useState, useEffect } from 'react';
import { Smartphone, Shield, CheckCircle, AlertTriangle, Key, QrCode, Clock } from 'lucide-react';

interface AuthStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TwoFactorDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeCountdown, setCodeCountdown] = useState(30);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [attempts, setAttempts] = useState({ successful: 0, failed: 0 });

  const steps: AuthStep[] = [
    {
      id: 1,
      title: 'Username & Password',
      description: 'Enter your login credentials',
      completed: currentStep > 1
    },
    {
      id: 2,
      title: 'Two-Factor Authentication',
      description: 'Verify with your authenticator app',
      completed: currentStep > 2
    },
    {
      id: 3,
      title: 'Access Granted',
      description: 'Successfully logged in',
      completed: isLoggedIn
    }
  ];

  // Generate a new 6-digit code every 30 seconds
  useEffect(() => {
    const generateNewCode = () => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setCodeCountdown(30);
    };

    generateNewCode();
    const interval = setInterval(() => {
      setCodeCountdown(prev => {
        if (prev <= 1) {
          generateNewCode();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      setCurrentStep(2);
    }
  };

  const handleTwoFactorSubmit = () => {
    if (twoFactorCode === generatedCode) {
      setIsLoggedIn(true);
      setCurrentStep(3);
      setAttempts(prev => ({ ...prev, successful: prev.successful + 1 }));
    } else {
      setAttempts(prev => ({ ...prev, failed: prev.failed + 1 }));
      setTwoFactorCode('');
      // Show error feedback
      setTimeout(() => {
        // Reset any error state if needed
      }, 2000);
    }
  };

  const resetDemo = () => {
    setCurrentStep(1);
    setUsername('');
    setPassword('');
    setTwoFactorCode('');
    setIsLoggedIn(false);
    setShowSetup(false);
  };

  const handleSetup = () => {
    setShowSetup(true);
  };

  const completeSetup = () => {
    setSetupComplete(true);
    setShowSetup(false);
  };

  if (showSetup) {
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Shield className="mr-2" size={20} />
            Set Up Two-Factor Authentication
          </h3>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                <QrCode size={64} className="text-slate-400" />
              </div>
              <p className="text-sm text-slate-600">
                Scan this QR code with your authenticator app
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-medium text-blue-900 mb-2">Popular Authenticator Apps:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Google Authenticator</li>
                <li>• Microsoft Authenticator</li>
                <li>• Authy</li>
                <li>• 1Password</li>
              </ul>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter verification code from your app:
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-lg"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSetup(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={completeSetup}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Complete Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">🔒 Two-Factor Authentication Demo</h3>
        <p className="text-blue-800 text-sm mb-2">
          Experience how 2FA adds an extra layer of security to your accounts. 
          Use the generated code below to complete the login process.
        </p>
        {!setupComplete && (
          <button
            onClick={handleSetup}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Learn: Set Up 2FA
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Interface */}
        <div className="bg-white border border-slate-200 rounded-lg">
          {/* Progress Steps */}
          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step.completed ? <CheckCircle size={16} /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step.completed ? 'bg-green-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Sign In to Your Account</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                
                <button
                  onClick={handleLogin}
                  disabled={!username.trim() || !password.trim()}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 flex items-center">
                  <Shield className="mr-2" size={20} />
                  Two-Factor Authentication
                </h3>
                
                <p className="text-slate-600 text-sm">
                  Enter the 6-digit code from your authenticator app to complete sign-in.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Authentication Code
                  </label>
                  <input
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-lg"
                    placeholder="123456"
                    maxLength={6}
                  />
                </div>
                
                {attempts.failed > 0 && (
                  <div className="text-red-600 text-sm flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    Invalid code. Please try again.
                  </div>
                )}
                
                <button
                  onClick={handleTwoFactorSubmit}
                  disabled={twoFactorCode.length !== 6}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Verify & Sign In
                </button>
                
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
              </div>
            )}

            {currentStep === 3 && isLoggedIn && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                
                <h3 className="font-semibold text-slate-900">Successfully Signed In!</h3>
                <p className="text-slate-600 text-sm">
                  Your account is now secured with two-factor authentication.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                  <p className="text-green-800">
                    ✓ Login attempts: {attempts.successful} successful, {attempts.failed} failed
                  </p>
                </div>
                
                <button
                  onClick={resetDemo}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Authenticator App Simulation */}
        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="border-b border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 flex items-center">
              <Smartphone className="mr-2" size={20} />
              Authenticator App
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {/* App Interface */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-slate-900">Demo Account</span>
                  <span className="text-xs text-slate-500">user@example.com</span>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-blue-600 mb-2">
                    {generatedCode}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                    <Clock size={14} />
                    <span>Expires in {codeCountdown}s</span>
                  </div>
                  
                  {/* Visual countdown */}
                  <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all duration-1000"
                      style={{ width: `${(codeCountdown / 30) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-2">How to use:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Copy the 6-digit code above</li>
                  <li>2. Enter it in the login form</li>
                  <li>3. Click "Verify & Sign In"</li>
                </ol>
              </div>
              
              {/* Copy Button */}
              <button
                onClick={() => setTwoFactorCode(generatedCode)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Key size={16} />
                <span>Use This Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">💡 Why Use Two-Factor Authentication?</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Protects accounts even if passwords are compromised</li>
          <li>• Reduces risk of unauthorized access by 99.9%</li>
          <li>• Works even when you're offline (with app-based codes)</li>
          <li>• Easy to set up and use with most online services</li>
          <li>• Provides real-time alerts about login attempts</li>
        </ul>
      </div>
    </div>
  );
};

export default TwoFactorDemo;