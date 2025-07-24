import React, { useState } from 'react';
import { Wifi, Shield, AlertTriangle, CheckCircle, Lock, Unlock, Eye, EyeOff } from 'lucide-react';

interface WiFiNetwork {
  id: number;
  name: string;
  security: 'WPA3' | 'WPA2' | 'WEP' | 'Open';
  signalStrength: number;
  isSecure: boolean;
  risks: string[];
  recommendations: string[];
}

const networks: WiFiNetwork[] = [
  {
    id: 1,
    name: "HomeNetwork_5G",
    security: "WPA3",
    signalStrength: 4,
    isSecure: true,
    risks: [],
    recommendations: ["Excellent security", "Safe to use for all activities"]
  },
  {
    id: 2,
    name: "Coffee_Shop_Free",
    security: "Open",
    signalStrength: 3,
    isSecure: false,
    risks: [
      "No encryption - data transmitted in plain text",
      "Easy for attackers to intercept communications",
      "Potential for fake hotspots with same name",
      "Other users can potentially see your traffic"
    ],
    recommendations: [
      "Use VPN for all internet activity",
      "Avoid accessing sensitive accounts",
      "Ensure websites use HTTPS",
      "Turn off file sharing"
    ]
  },
  {
    id: 3,
    name: "LinkSys_Router",
    security: "WEP",
    signalStrength: 2,
    isSecure: false,
    risks: [
      "WEP encryption is easily broken",
      "Vulnerable to packet injection attacks",
      "Encryption keys can be cracked quickly",
      "Considered deprecated and unsafe"
    ],
    recommendations: [
      "Avoid this network if possible",
      "Use VPN if connection is necessary",
      "Limit to non-sensitive activities only"
    ]
  },
  {
    id: 4,
    name: "Office_Network",
    security: "WPA2",
    signalStrength: 5,
    isSecure: true,
    risks: ["Generally secure but less robust than WPA3"],
    recommendations: ["Good security for most activities", "Suitable for business use"]
  },
  {
    id: 5,
    name: "FREE_WIFI_HERE",
    security: "Open",
    signalStrength: 4,
    isSecure: false,
    risks: [
      "Suspicious name - likely fake hotspot",
      "Could be set up by attackers",
      "No security whatsoever",
      "High risk of data theft"
    ],
    recommendations: [
      "Never connect to this network",
      "Report suspicious networks to authorities",
      "Be wary of generic 'free wifi' names"
    ]
  }
];

const WiFiSecurityDemo: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [isConnecting, setIsConnecting] = useState<number | null>(null);
  const [connectedNetwork, setConnectedNetwork] = useState<WiFiNetwork | null>(null);
  const [showProtections, setShowProtections] = useState(false);
  const [protections, setProtections] = useState({
    vpn: false,
    https: false,
    firewall: false
  });

  const getSignalBars = (strength: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 bg-current ${
          i < strength ? 'opacity-100' : 'opacity-30'
        }`}
        style={{ height: `${(i + 1) * 3 + 2}px` }}
      />
    ));
  };

  const getSecurityIcon = (network: WiFiNetwork) => {
    if (network.security === 'Open') {
      return <Unlock size={16} className="text-red-500" />;
    }
    return <Lock size={16} className={network.isSecure ? 'text-green-500' : 'text-yellow-500'} />;
  };

  const getSecurityColor = (network: WiFiNetwork) => {
    if (network.security === 'Open' || network.security === 'WEP') {
      return 'text-red-600';
    }
    return network.isSecure ? 'text-green-600' : 'text-yellow-600';
  };

  const handleConnect = (network: WiFiNetwork) => {
    setIsConnecting(network.id);
    setTimeout(() => {
      setConnectedNetwork(network);
      setIsConnecting(null);
      if (!network.isSecure) {
        setShowProtections(true);
      }
    }, 2000);
  };

  const toggleProtection = (protection: keyof typeof protections) => {
    setProtections(prev => ({ ...prev, [protection]: !prev[protection] }));
  };

  return (
    <div className="p-6">
      {/* Mobile Device Frame */}
      <div className="max-w-sm mx-auto bg-slate-900 rounded-3xl p-2 shadow-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="bg-slate-50 px-4 py-2 flex justify-between items-center text-xs">
            <span className="font-medium">9:41 AM</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                {getSignalBars(connectedNetwork?.signalStrength || 0)}
              </div>
              <Wifi size={12} className={connectedNetwork ? 'text-blue-500' : 'text-slate-400'} />
              <div className="w-6 h-3 border border-slate-400 rounded-sm">
                <div className="w-4/5 h-full bg-green-500 rounded-sm" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900 flex items-center">
              <Wifi className="mr-2" size={20} />
              WiFi Networks
            </h3>
            {connectedNetwork && (
              <p className="text-sm text-slate-600 mt-1">
                Connected to: {connectedNetwork.name}
              </p>
            )}
          </div>

          {/* Network List */}
          <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
            {networks.map((network) => (
              <div
                key={network.id}
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedNetwork?.id === network.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                } ${connectedNetwork?.id === network.id ? 'bg-green-50' : ''}`}
                onClick={() => setSelectedNetwork(network)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-900">{network.name}</span>
                      {getSecurityIcon(network)}
                      {connectedNetwork?.id === network.id && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs ${getSecurityColor(network)}`}>
                        {network.security}
                      </span>
                      {!network.isSecure && (
                        <span className="text-xs text-red-500 flex items-center">
                          <AlertTriangle size={12} className="mr-1" />
                          Risk
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Signal Strength */}
                    <div className="flex items-end space-x-0.5 text-slate-400">
                      {getSignalBars(network.signalStrength)}
                    </div>
                    
                    {/* Connect Button */}
                    {connectedNetwork?.id !== network.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect(network);
                        }}
                        disabled={isConnecting === network.id}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
                      >
                        {isConnecting === network.id ? 'Connecting...' : 'Connect'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Details */}
      {selectedNetwork && (
        <div className="mt-6 bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center">
              <Shield className="mr-2" size={20} />
              Network Security Analysis
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              selectedNetwork.isSecure
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {selectedNetwork.isSecure ? 'Secure' : 'Risky'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Security Info */}
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Network: {selectedNetwork.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Security Type:</span>
                  <span className={getSecurityColor(selectedNetwork)}>
                    {selectedNetwork.security}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Signal Strength:</span>
                  <span className="text-slate-900">
                    {['Weak', 'Fair', 'Good', 'Strong', 'Excellent'][selectedNetwork.signalStrength - 1]}
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Risk Assessment</h4>
              {selectedNetwork.risks.length > 0 ? (
                <ul className="space-y-1">
                  {selectedNetwork.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start">
                      <AlertTriangle size={12} className="mr-1 mt-0.5 flex-shrink-0" />
                      {risk}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-700 flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  No significant security risks detected
                </p>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Security Recommendations</h4>
            <ul className="space-y-1">
              {selectedNetwork.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-slate-700 flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Security Protections Panel */}
      {showProtections && connectedNetwork && !connectedNetwork.isSecure && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-yellow-900 flex items-center">
              <Shield className="mr-2" size={20} />
              Enable Security Protections
            </h3>
            <button
              onClick={() => setShowProtections(false)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <Eye size={16} />
            </button>
          </div>

          <p className="text-yellow-800 text-sm mb-4">
            You're connected to an unsecured network. Enable these protections to stay safe:
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-yellow-900">VPN Protection</span>
                <p className="text-xs text-yellow-700">Encrypts all your internet traffic</p>
              </div>
              <button
                onClick={() => toggleProtection('vpn')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  protections.vpn ? 'bg-green-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    protections.vpn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-yellow-900">HTTPS Enforcement</span>
                <p className="text-xs text-yellow-700">Only visit secure websites</p>
              </div>
              <button
                onClick={() => toggleProtection('https')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  protections.https ? 'bg-green-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    protections.https ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-yellow-900">Firewall</span>
                <p className="text-xs text-yellow-700">Block unauthorized access attempts</p>
              </div>
              <button
                onClick={() => toggleProtection('firewall')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  protections.firewall ? 'bg-green-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    protections.firewall ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {Object.values(protections).every(p => p) && (
            <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm flex items-center">
                <CheckCircle size={16} className="mr-2" />
                Great! All security protections are now enabled. You're much safer on this network.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Educational Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 WiFi Security Best Practices</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Always prefer WPA3 or WPA2 secured networks</li>
          <li>• Never connect to suspicious or unknown open networks</li>
          <li>• Use a VPN when connecting to public WiFi</li>
          <li>• Verify network names with staff at coffee shops/hotels</li>
          <li>• Turn off auto-connect for public networks</li>
          <li>• Keep your device's WiFi off when not needed</li>
        </ul>
      </div>
    </div>
  );
};

export default WiFiSecurityDemo;