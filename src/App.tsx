import React, { useState } from 'react';
import { Shield, Mail, Wifi, Key, Smartphone, Download, HardDrive } from 'lucide-react';
import PhishingDemo from './components/PhishingDemo';
import WiFiSecurityDemo from './components/WiFiSecurityDemo';
import PasswordSecurityDemo from './components/PasswordSecurityDemo';
import TwoFactorDemo from './components/TwoFactorDemo';
import SoftwareUpdatesDemo from './components/SoftwareUpdatesDemo';
import DataBackupDemo from './components/DataBackupDemo';
import Modal from './components/Modal';

interface Demo {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  component: React.ComponentType;
}

const demos: Demo[] = [
  {
    id: 'phishing',
    title: 'Phishing Detection',
    description: 'Learn to identify suspicious emails and protect yourself from phishing attacks',
    icon: <Mail size={32} />,
    color: 'from-red-500 to-pink-600',
    component: PhishingDemo
  },
  {
    id: 'wifi',
    title: 'WiFi Security',
    description: 'Understand wireless network risks and how to connect safely',
    icon: <Wifi size={32} />,
    color: 'from-blue-500 to-cyan-600',
    component: WiFiSecurityDemo
  },
  {
    id: 'password',
    title: 'Password Security',
    description: 'Create strong passwords and understand security best practices',
    icon: <Key size={32} />,
    color: 'from-green-500 to-emerald-600',
    component: PasswordSecurityDemo
  },
  {
    id: 'twofactor',
    title: 'Two-Factor Authentication',
    description: 'Experience how 2FA protects your accounts from unauthorized access',
    icon: <Smartphone size={32} />,
    color: 'from-purple-500 to-violet-600',
    component: TwoFactorDemo
  },
  {
    id: 'updates',
    title: 'Software Updates',
    description: 'Learn why keeping software updated is crucial for security',
    icon: <Download size={32} />,
    color: 'from-orange-500 to-red-600',
    component: SoftwareUpdatesDemo
  },
  {
    id: 'backup',
    title: 'Data Backup',
    description: 'Understand backup strategies to protect your important data',
    icon: <HardDrive size={32} />,
    color: 'from-indigo-500 to-blue-600',
    component: DataBackupDemo
  }
];

function App() {
  const [activeDemo, setActiveDemo] = useState<Demo | null>(null);

  const openDemo = (demo: Demo) => {
    setActiveDemo(demo);
  };

  const closeDemo = () => {
    setActiveDemo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Shield className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">CyberSafe Academy</h1>
              <p className="text-slate-600 mt-1">Interactive Cybersecurity Education Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Learn Cybersecurity Through
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Hands-on Practice</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover essential cybersecurity concepts through realistic, interactive simulations. 
            Build your digital defense skills in a safe, educational environment.
          </p>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo) => (
            <div
              key={demo.id}
              onClick={() => openDemo(demo)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Card Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${demo.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {demo.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-800">
                  {demo.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {demo.description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-700">
                  <span>Start Interactive Demo</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Interactive Learning?</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our hands-on approach helps you understand cybersecurity concepts through experience, 
              making complex topics accessible and memorable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 mb-4">
                <Shield size={24} />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Safe Environment</h4>
              <p className="text-slate-600 text-sm">Practice in a controlled environment without any real security risks</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 text-green-600 mb-4">
                <Key size={24} />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Real-world Scenarios</h4>
              <p className="text-slate-600 text-sm">Experience authentic situations you'll encounter in daily digital life</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-600 mb-4">
                <Smartphone size={24} />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Instant Feedback</h4>
              <p className="text-slate-600 text-sm">Get immediate guidance and explanations for every action you take</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Shield size={24} />
              </div>
              <span className="text-xl font-bold">CyberSafe Academy</span>
            </div>
            <p className="text-slate-400 mb-4">Empowering digital citizens with cybersecurity knowledge</p>
            <p className="text-slate-500 text-sm">© 2025 CyberSafe Academy. Educational platform for cybersecurity awareness.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {activeDemo && (
        <Modal onClose={closeDemo} title={activeDemo.title}>
          <activeDemo.component />
        </Modal>
      )}
    </div>
  );
}

export default App;