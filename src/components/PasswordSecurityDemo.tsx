import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, RefreshCw, CheckCircle, AlertTriangle, Copy, Check } from 'lucide-react';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  feedback: string[];
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    common: boolean;
  };
}

const commonPasswords = [
  'password', '123456', 'password123', 'admin', 'qwerty', 'letmein',
  'welcome', 'monkey', '1234567890', 'abc123', 'password1', 'iloveyou'
];

const PasswordSecurityDemo: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<PasswordStrength | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [generatorSettings, setGeneratorSettings] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  });
  const [copied, setCopied] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const analyzePassword = (pwd: string): PasswordStrength => {
    const requirements = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /\d/.test(pwd),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      common: !commonPasswords.includes(pwd.toLowerCase())
    };

    const score = Object.values(requirements).filter(Boolean).length;
    const feedback: string[] = [];

    if (!requirements.length) feedback.push('Use at least 12 characters');
    if (!requirements.uppercase) feedback.push('Add uppercase letters (A-Z)');
    if (!requirements.lowercase) feedback.push('Add lowercase letters (a-z)');
    if (!requirements.numbers) feedback.push('Include numbers (0-9)');
    if (!requirements.symbols) feedback.push('Add special characters (!@#$%...)');
    if (!requirements.common) feedback.push('Avoid common passwords');

    let label: string, color: string;
    if (score <= 2) {
      label = 'Very Weak';
      color = 'red';
    } else if (score <= 3) {
      label = 'Weak';
      color = 'orange';
    } else if (score <= 4) {
      label = 'Fair';
      color = 'yellow';
    } else if (score <= 5) {
      label = 'Good';
      color = 'lime';
    } else {
      label = 'Excellent';
      color = 'green';
    }

    if (score === 6) {
      feedback.push('Perfect! This is a very strong password.');
    }

    return { score, label, color, feedback, requirements };
  };

  useEffect(() => {
    if (password) {
      setStrength(analyzePassword(password));
    } else {
      setStrength(null);
    }
  }, [password]);

  const generatePassword = () => {
    const chars = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*(),.?":{}|<>'
    };

    let availableChars = '';
    if (generatorSettings.includeLowercase) availableChars += chars.lowercase;
    if (generatorSettings.includeUppercase) availableChars += chars.uppercase;
    if (generatorSettings.includeNumbers) availableChars += chars.numbers;
    if (generatorSettings.includeSymbols) availableChars += chars.symbols;

    if (availableChars === '') {
      availableChars = chars.lowercase; // Fallback
    }

    let result = '';
    for (let i = 0; i < generatorSettings.length; i++) {
      result += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }

    setGeneratedPassword(result);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const weakPasswords = [
    { password: '123456', time: '< 1 second' },
    { password: 'password', time: '< 1 second' },
    { password: 'Password1', time: '2 hours' }
  ];

  const strongPasswords = [
    { password: 'M!nd$3cur3P@ss2024', time: '34 trillion years' },
    { password: 'Tr33$&Fl0w3r#Sun!', time: '41 million years' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">🔑 Password Security Workshop</h3>
        <p className="text-blue-800 text-sm">
          Learn to create strong passwords and understand what makes them secure. 
          Test different passwords or generate secure ones using our tool.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Tester */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Key className="mr-2" size={20} />
            Password Strength Analyzer
          </h3>
          
          <div className="space-y-4">
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter a password to test:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Type your password here..."
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Strength Meter */}
            {strength && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Strength:</span>
                  <span className={`text-sm font-medium text-${strength.color}-600`}>
                    {strength.label}
                  </span>
                </div>
                
                {/* Visual Meter */}
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`bg-${strength.color}-500 h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${(strength.score / 6) * 100}%` }}
                  />
                </div>

                {/* Requirements Checklist */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-700">Requirements:</h4>
                  <div className="grid grid-cols-1 gap-1 text-sm">
                    {Object.entries(strength.requirements).map(([key, met]) => {
                      const labels = {
                        length: 'At least 12 characters',
                        uppercase: 'Uppercase letters',
                        lowercase: 'Lowercase letters',
                        numbers: 'Numbers',
                        symbols: 'Special characters',
                        common: 'Not a common password'
                      };
                      
                      return (
                        <div key={key} className={`flex items-center space-x-2 ${met ? 'text-green-600' : 'text-red-600'}`}>
                          {met ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                          <span>{labels[key as keyof typeof labels]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback */}
                {strength.feedback.length > 0 && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-700 mb-1">Suggestions:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {strength.feedback.map((fb, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          {fb}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Password Generator */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <RefreshCw className="mr-2" size={20} />
            Secure Password Generator
          </h3>
          
          <div className="space-y-4">
            {/* Generator Settings */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Length: {generatorSettings.length}
                </label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={generatorSettings.length}
                  onChange={(e) => setGeneratorSettings(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                {[
                  { key: 'includeUppercase', label: 'Uppercase letters (A-Z)' },
                  { key: 'includeLowercase', label: 'Lowercase letters (a-z)' },
                  { key: 'includeNumbers', label: 'Numbers (0-9)' },
                  { key: 'includeSymbols', label: 'Symbols (!@#$...)' }
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={generatorSettings[key as keyof typeof generatorSettings] as boolean}
                      onChange={(e) => setGeneratorSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="text-blue-600"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePassword}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw size={16} />
              <span>Generate Secure Password</span>
            </button>

            {/* Generated Password */}
            {generatedPassword && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Generated Password:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={generatedPassword}
                    readOnly
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedPassword)}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
                
                <button
                  onClick={() => setPassword(generatedPassword)}
                  className="w-full text-sm bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Test This Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Comparison */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="p-4 border-b border-slate-200">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-semibold text-slate-900">Password Strength Comparison</h3>
            <span className="text-slate-400">
              {showComparison ? '−' : '+'}
            </span>
          </button>
        </div>
        
        {showComparison && (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weak Passwords */}
              <div>
                <h4 className="font-medium text-red-900 mb-3 flex items-center">
                  <AlertTriangle size={16} className="mr-1" />
                  Weak Passwords (Easy to crack)
                </h4>
                <div className="space-y-2">
                  {weakPasswords.map((item, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="font-mono text-sm text-red-900">{item.password}</div>
                      <div className="text-xs text-red-700 mt-1">Time to crack: {item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Strong Passwords */}
              <div>
                <h4 className="font-medium text-green-900 mb-3 flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  Strong Passwords (Secure)
                </h4>
                <div className="space-y-2">
                  {strongPasswords.map((item, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="font-mono text-sm text-green-900">{item.password}</div>
                      <div className="text-xs text-green-700 mt-1">Time to crack: {item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Best Practices */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">💡 Password Security Best Practices</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Use unique passwords for every account</li>
          <li>• Consider using a reputable password manager</li>
          <li>• Enable two-factor authentication when available</li>
          <li>• Avoid personal information in passwords</li>
          <li>• Change passwords if you suspect they've been compromised</li>
          <li>• Never share passwords or write them down in unsecured places</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordSecurityDemo;