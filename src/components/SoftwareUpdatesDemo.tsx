import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, CheckCircle, Shield, Clock, RefreshCw, X, Calendar } from 'lucide-react';

interface Update {
  id: number;
  name: string;
  currentVersion: string;
  newVersion: string;
  type: 'security' | 'feature' | 'bug-fix';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  size: string;
  releaseDate: string;
  vulnerabilities?: string[];
  isInstalled: boolean;
  isInstalling: boolean;
}

const initialUpdates: Update[] = [
  {
    id: 1,
    name: "Windows Security Update",
    currentVersion: "KB5034441",
    newVersion: "KB5034467",
    type: "security",
    severity: "critical",
    description: "Critical security update that fixes vulnerabilities in Windows kernel and network components.",
    size: "156 MB",
    releaseDate: "2025-01-20",
    vulnerabilities: [
      "CVE-2025-0001: Remote code execution vulnerability",
      "CVE-2025-0002: Privilege escalation vulnerability",
      "CVE-2025-0003: Information disclosure vulnerability"
    ],
    isInstalled: false,
    isInstalling: false
  },
  {
    id: 2,
    name: "Chrome Browser",
    currentVersion: "121.0.6167.184",
    newVersion: "121.0.6167.200",
    type: "security",
    severity: "high",
    description: "Security update for Chrome browser addressing multiple vulnerabilities including zero-day exploits.",
    size: "89 MB",
    releaseDate: "2025-01-22",
    vulnerabilities: [
      "High severity: Use after free in V8",
      "Medium severity: Insufficient validation in Downloads"
    ],
    isInstalled: false,
    isInstalling: false
  },
  {
    id: 3,
    name: "Adobe Acrobat Reader",
    currentVersion: "23.008.20421",
    newVersion: "23.008.20458",
    type: "security",
    severity: "critical",
    description: "Critical security patches for Adobe Acrobat Reader to prevent arbitrary code execution.",
    size: "234 MB",
    releaseDate: "2025-01-18",
    vulnerabilities: [
      "Critical: Arbitrary code execution vulnerability",
      "High: Buffer overflow in PDF parser"
    ],
    isInstalled: false,
    isInstalling: false
  },
  {
    id: 4,
    name: "Microsoft Office 365",
    currentVersion: "16.0.17126.20132",
    newVersion: "16.0.17126.20158",
    type: "feature",
    severity: "medium",
    description: "Monthly feature update with performance improvements and new collaboration tools.",
    size: "145 MB",
    releaseDate: "2025-01-15",
    isInstalled: false,
    isInstalling: false
  },
  {
    id: 5,
    name: "Antivirus Definition Update",
    currentVersion: "2025.01.20.01",
    newVersion: "2025.01.24.01",
    type: "security",
    severity: "high",
    description: "Latest virus definitions to protect against new malware threats discovered this week.",
    size: "12 MB",
    releaseDate: "2025-01-24",
    isInstalled: false,
    isInstalling: false
  }
];

const SoftwareUpdatesDemo: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>(initialUpdates);
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);
  const [showIgnored, setShowIgnored] = useState(false);
  const [ignoredUpdates, setIgnoredUpdates] = useState<number[]>([]);
  const [autoUpdate, setAutoUpdate] = useState({
    security: true,
    features: false,
    schedule: 'immediately'
  });
  const [stats, setStats] = useState({ installed: 0, ignored: 0, delayed: 0 });

  useEffect(() => {
    setStats({
      installed: updates.filter(u => u.isInstalled).length,
      ignored: ignoredUpdates.length,
      delayed: updates.filter(u => !u.isInstalled && !ignoredUpdates.includes(u.id)).length
    });
  }, [updates, ignoredUpdates]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield size={16} className="text-red-500" />;
      case 'feature': return <RefreshCw size={16} className="text-blue-500" />;
      case 'bug-fix': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Download size={16} />;
    }
  };

  const handleInstall = (updateId: number) => {
    setUpdates(prev => prev.map(update => 
      update.id === updateId ? { ...update, isInstalling: true } : update
    ));

    setTimeout(() => {
      setUpdates(prev => prev.map(update => 
        update.id === updateId ? { ...update, isInstalling: false, isInstalled: true } : update
      ));
    }, 3000);
  };

  const handleIgnore = (updateId: number) => {
    setIgnoredUpdates(prev => [...prev, updateId]);
  };

  const handleRestore = (updateId: number) => {
    setIgnoredUpdates(prev => prev.filter(id => id !== updateId));
  };

  const installAllCritical = () => {
    const criticalUpdates = updates.filter(u => u.severity === 'critical' && !u.isInstalled);
    criticalUpdates.forEach(update => handleInstall(update.id));
  };

  const getDaysOld = (releaseDate: string) => {
    const release = new Date(releaseDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - release.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const availableUpdates = updates.filter(u => !u.isInstalled && !ignoredUpdates.includes(u.id));
  const criticalCount = availableUpdates.filter(u => u.severity === 'critical').length;

  return (
    <div className="p-6">
      {/* Header Alert */}
      {criticalCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-red-600" size={20} />
              <div>
                <h3 className="font-semibold text-red-900">
                  {criticalCount} Critical Security Update{criticalCount > 1 ? 's' : ''} Available
                </h3>
                <p className="text-red-800 text-sm">
                  Your system has critical vulnerabilities that need immediate attention.
                </p>
              </div>
            </div>
            <button
              onClick={installAllCritical}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Install All Critical
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Updates List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stats Summary */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Update Status</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.installed}</div>
                <div className="text-sm text-slate-600">Installed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.delayed}</div>
                <div className="text-sm text-slate-600">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.ignored}</div>
                <div className="text-sm text-slate-600">Ignored</div>
              </div>
            </div>
          </div>

          {/* Available Updates */}
          <div className="bg-white border border-slate-200 rounded-lg">
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Available Updates ({availableUpdates.length})</h3>
                <button
                  onClick={() => setShowIgnored(!showIgnored)}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  {showIgnored ? 'Hide' : 'Show'} Ignored ({ignoredUpdates.length})
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
              {(showIgnored ? updates.filter(u => ignoredUpdates.includes(u.id)) : availableUpdates)
                .map((update) => {
                  const daysOld = getDaysOld(update.releaseDate);
                  const isIgnored = ignoredUpdates.includes(update.id);
                  
                  return (
                    <div
                      key={update.id}
                      className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                        selectedUpdate?.id === update.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                      } ${isIgnored ? 'opacity-60' : ''}`}
                      onClick={() => setSelectedUpdate(update)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getTypeIcon(update.type)}
                            <span className="font-medium text-slate-900">{update.name}</span>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(update.severity)}`}>
                              {update.severity}
                            </span>
                            {daysOld > 7 && (
                              <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                                {daysOld} days old
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-slate-600 mb-2">{update.description}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span>{update.currentVersion} → {update.newVersion}</span>
                            <span>{update.size}</span>
                            <span className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {update.releaseDate}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {update.isInstalled ? (
                            <span className="text-green-600 text-sm flex items-center">
                              <CheckCircle size={16} className="mr-1" />
                              Installed
                            </span>
                          ) : update.isInstalling ? (
                            <div className="text-blue-600 text-sm flex items-center">
                              <RefreshCw size={16} className="mr-1 animate-spin" />
                              Installing...
                            </div>
                          ) : isIgnored ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRestore(update.id);
                              }}
                              className="text-xs bg-slate-500 text-white px-2 py-1 rounded hover:bg-slate-600 transition-colors"
                            >
                              Restore
                            </button>
                          ) : (
                            <div className="flex space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleInstall(update.id);
                                }}
                                className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                              >
                                Install
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleIgnore(update.id);
                                }}
                                className="text-xs border border-slate-300 text-slate-600 px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                              >
                                Ignore
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected Update Details */}
          {selectedUpdate && (
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-3">{selectedUpdate.name}</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-slate-700">Type:</span>
                  <span className="ml-2 capitalize">{selectedUpdate.type.replace('-', ' ')}</span>
                </div>
                
                <div>
                  <span className="font-medium text-slate-700">Severity:</span>
                  <span className={`ml-2 capitalize ${getSeverityColor(selectedUpdate.severity).split(' ')[0]}`}>
                    {selectedUpdate.severity}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-slate-700">Size:</span>
                  <span className="ml-2">{selectedUpdate.size}</span>
                </div>
                
                <div>
                  <span className="font-medium text-slate-700">Released:</span>
                  <span className="ml-2">{selectedUpdate.releaseDate}</span>
                </div>
              </div>
              
              {selectedUpdate.vulnerabilities && (
                <div className="mt-4">
                  <h4 className="font-medium text-slate-700 mb-2">Security Fixes:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {selectedUpdate.vulnerabilities.map((vuln, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-red-500">•</span>
                        {vuln}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Auto-Update Settings */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Auto-Update Settings</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Security Updates</span>
                <button
                  onClick={() => setAutoUpdate(prev => ({ ...prev, security: !prev.security }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoUpdate.security ? 'bg-green-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoUpdate.security ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Feature Updates</span>
                <button
                  onClick={() => setAutoUpdate(prev => ({ ...prev, features: !prev.features }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoUpdate.features ? 'bg-green-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoUpdate.features ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Install Schedule
                </label>
                <select
                  value={autoUpdate.schedule}
                  onChange={(e) => setAutoUpdate(prev => ({ ...prev, schedule: e.target.value }))}
                  className="w-full text-sm border border-slate-300 rounded px-2 py-1"
                >
                  <option value="immediately">Immediately</option>
                  <option value="maintenance">During maintenance window</option>
                  <option value="manual">Manual approval required</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Impact */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">⚠️ Security Impact</h3>
            <div className="text-sm text-red-800 space-y-2">
              <p>Delaying security updates increases risk:</p>
              <ul className="space-y-1 ml-4">
                <li>• Exposure to known vulnerabilities</li>
                <li>• Potential for malware infections</li>
                <li>• Risk of data breaches</li>
                <li>• Compliance violations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Software Update Best Practices</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Enable automatic updates for security patches</li>
          <li>• Install critical updates immediately</li>
          <li>• Review update notes before installing feature updates</li>
          <li>• Keep all software up to date, not just the operating system</li>
          <li>• Backup important data before major updates</li>
          <li>• Use reputable sources for software downloads</li>
        </ul>
      </div>
    </div>
  );
};

export default SoftwareUpdatesDemo;