import React, { useState, useEffect } from 'react';
import { HardDrive, Cloud, Shield, AlertTriangle, CheckCircle, Calendar, Clock, FolderOpen, Database } from 'lucide-react';

interface BackupJob {
  id: number;
  name: string;
  source: string;
  destination: string;
  type: 'full' | 'incremental' | 'differential';
  frequency: string;
  lastBackup: string;
  nextBackup: string;
  status: 'completed' | 'running' | 'failed' | 'scheduled';
  size: string;
  encryption: boolean;
}

interface DataCategory {
  name: string;
  description: string;
  importance: 'critical' | 'important' | 'normal';
  size: string;
  selected: boolean;
  examples: string[];
}

const initialJobs: BackupJob[] = [
  {
    id: 1,
    name: "Documents Backup",
    source: "C:\\Users\\Documents",
    destination: "Cloud Storage",
    type: "incremental",
    frequency: "Daily",
    lastBackup: "2025-01-24 02:00",
    nextBackup: "2025-01-25 02:00",
    status: "completed",
    size: "2.3 GB",
    encryption: true
  },
  {
    id: 2,
    name: "Full System Backup",
    source: "C:\\ (Complete Drive)",
    destination: "External Drive",
    type: "full",
    frequency: "Weekly",
    lastBackup: "2025-01-21 01:00",
    nextBackup: "2025-01-28 01:00",
    status: "scheduled",
    size: "145 GB",
    encryption: true
  },
  {
    id: 3,
    name: "Photos & Videos",
    source: "C:\\Users\\Pictures",
    destination: "Cloud + External",
    type: "differential",
    frequency: "Weekly",
    lastBackup: "2025-01-20 03:00",
    nextBackup: "2025-01-27 03:00",
    status: "failed",
    size: "45.2 GB",
    encryption: false
  }
];

const dataCategories: DataCategory[] = [
  {
    name: "Personal Documents",
    description: "Important documents and files",
    importance: "critical",
    size: "2.3 GB",
    selected: true,
    examples: ["Tax returns", "Insurance documents", "Legal papers", "Contracts"]
  },
  {
    name: "Photos & Videos",
    description: "Personal memories and media",
    importance: "critical",
    size: "45.2 GB",
    selected: true,
    examples: ["Family photos", "Travel videos", "Special occasions", "Personal projects"]
  },
  {
    name: "Work Files",
    description: "Professional documents and projects",
    importance: "critical",
    size: "8.7 GB",
    selected: true,
    examples: ["Project files", "Presentations", "Spreadsheets", "Client data"]
  },
  {
    name: "Software & Settings",
    description: "Applications and configurations",
    importance: "important",
    size: "12.1 GB",
    selected: false,
    examples: ["Installed programs", "Browser bookmarks", "Email settings", "Custom configurations"]
  },
  {
    name: "Music & Entertainment",
    description: "Downloaded media and games",
    importance: "normal",
    size: "78.5 GB",
    selected: false,
    examples: ["Music library", "Downloaded movies", "Games", "Podcasts"]
  }
];

const DataBackupDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'setup' | 'jobs' | 'restore'>('setup');
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>(initialJobs);
  const [categories, setCategories] = useState<DataCategory[]>(dataCategories);
  const [backupSettings, setBackupSettings] = useState({
    destination: 'cloud',
    frequency: 'daily',
    encryption: true,
    compression: true,
    verification: true,
    retention: '30'
  });
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [testRestore, setTestRestore] = useState({ file: '', status: '' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'scheduled': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'important': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const toggleCategory = (index: number) => {
    setCategories(prev => prev.map((cat, i) => 
      i === index ? { ...cat, selected: !cat.selected } : cat
    ));
  };

  const createBackup = () => {
    setIsCreatingBackup(true);
    setTimeout(() => {
      const newJob: BackupJob = {
        id: backupJobs.length + 1,
        name: "Custom Backup",
        source: "Selected Categories",
        destination: backupSettings.destination === 'cloud' ? 'Cloud Storage' : 'External Drive',
        type: 'full',
        frequency: backupSettings.frequency,
        lastBackup: new Date().toISOString().slice(0, 16).replace('T', ' '),
        nextBackup: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16).replace('T', ' '),
        status: 'completed',
        size: categories.filter(c => c.selected).reduce((sum, c) => sum + parseFloat(c.size), 0).toFixed(1) + ' GB',
        encryption: backupSettings.encryption
      };
      setBackupJobs(prev => [...prev, newJob]);
      setIsCreatingBackup(false);
      setActiveTab('jobs');
    }, 3000);
  };

  const testRestoreFile = () => {
    setTestRestore({ file: 'important_document.pdf', status: 'restoring' });
    setTimeout(() => {
      setTestRestore({ file: 'important_document.pdf', status: 'completed' });
    }, 2000);
  };

  const selectedSize = categories
    .filter(c => c.selected)
    .reduce((sum, c) => sum + parseFloat(c.size), 0)
    .toFixed(1);

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'setup', label: 'Backup Setup', icon: Shield },
            { id: 'jobs', label: 'Backup Jobs', icon: HardDrive },
            { id: 'restore', label: 'Restore Test', icon: Database }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Setup Tab */}
      {activeTab === 'setup' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💾 Data Backup Configuration</h3>
            <p className="text-blue-800 text-sm">
              Select the data you want to protect and configure your backup strategy. 
              Remember: the best backup is the one that happens automatically!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Selection */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Select Data to Backup</h3>
              
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      category.selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => toggleCategory(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={category.selected}
                            onChange={() => toggleCategory(index)}
                            className="text-blue-600"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="font-medium text-slate-900">{category.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getImportanceColor(category.importance)}`}>
                            {category.importance}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 ml-6">{category.description}</p>
                        <div className="text-xs text-slate-500 mt-1 ml-6">Size: {category.size}</div>
                      </div>
                    </div>
                    
                    {category.selected && (
                      <div className="ml-6 mt-2 text-xs text-slate-600">
                        <div className="font-medium mb-1">Includes:</div>
                        <div className="flex flex-wrap gap-1">
                          {category.examples.map((example, i) => (
                            <span key={i} className="bg-slate-100 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium text-slate-700">
                  Selected: {selectedSize} GB ({categories.filter(c => c.selected).length} categories)
                </div>
              </div>
            </div>

            {/* Backup Settings */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Backup Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Backup Destination
                  </label>
                  <select
                    value={backupSettings.destination}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, destination: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  >
                    <option value="cloud">Cloud Storage (Recommended)</option>
                    <option value="external">External Hard Drive</option>
                    <option value="network">Network Attached Storage</option>
                    <option value="multiple">Multiple Locations (Best)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Backup Frequency
                  </label>
                  <select
                    value={backupSettings.frequency}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, frequency: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  >
                    <option value="hourly">Every Hour</option>
                    <option value="daily">Daily (Recommended)</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  {[
                    { key: 'encryption', label: 'Encrypt backup data', desc: 'Protects data with strong encryption' },
                    { key: 'compression', label: 'Compress backup files', desc: 'Reduces storage space needed' },
                    { key: 'verification', label: 'Verify backup integrity', desc: 'Ensures backups are not corrupted' }
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={backupSettings[key as keyof typeof backupSettings] as boolean}
                        onChange={(e) => setBackupSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                        className="mt-1 text-blue-600"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">{label}</div>
                        <div className="text-xs text-slate-600">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Retention Period (days)
                  </label>
                  <input
                    type="number"
                    value={backupSettings.retention}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, retention: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    min="1"
                    max="365"
                  />
                </div>
              </div>
              
              <button
                onClick={createBackup}
                disabled={isCreatingBackup || categories.filter(c => c.selected).length === 0}
                className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isCreatingBackup ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Backup...</span>
                  </>
                ) : (
                  <>
                    <Shield size={16} />
                    <span>Create Backup Job</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg">
            <div className="border-b border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">Active Backup Jobs</h3>
            </div>
            
            <div className="divide-y divide-slate-200">
              {backupJobs.map((job) => (
                <div key={job.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-medium text-slate-900">{job.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                        {job.encryption && (
                          <span className="text-green-600 text-xs flex items-center">
                            <Shield size={12} className="mr-1" /> Encrypted
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                        <div>
                          <div className="font-medium">Source</div>
                          <div>{job.source}</div>
                        </div>
                        <div>
                          <div className="font-medium">Destination</div>
                          <div>{job.destination}</div>
                        </div>
                        <div>
                          <div className="font-medium">Last Backup</div>
                          <div>{job.lastBackup}</div>
                        </div>
                        <div>
                          <div className="font-medium">Size</div>
                          <div>{job.size}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                        Run Now
                      </button>
                      <button className="text-sm border border-slate-300 text-slate-600 px-3 py-1 rounded hover:bg-slate-50 transition-colors">
                        Settings
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Restore Tab */}
      {activeTab === 'restore' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-4">Test File Restoration</h3>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm">
                  💡 Regular restore testing ensures your backups work when you need them most.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Available Backups</h4>
                  <div className="space-y-2">
                    {backupJobs.filter(job => job.status === 'completed').map((job) => (
                      <div key={job.id} className="border border-slate-200 rounded-lg p-3">
                        <div className="font-medium text-slate-900">{job.name}</div>
                        <div className="text-sm text-slate-600">Last backup: {job.lastBackup}</div>
                        <div className="text-sm text-slate-600">Size: {job.size}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Restore Test</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select file to restore:
                      </label>
                      <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
                        <option>important_document.pdf</option>
                        <option>family_photo.jpg</option>
                        <option>project_file.docx</option>
                        <option>presentation.pptx</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={testRestoreFile}
                      disabled={testRestore.status === 'restoring'}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      {testRestore.status === 'restoring' ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Restoring...</span>
                        </>
                      ) : (
                        <>
                          <Database size={16} />
                          <span>Test Restore</span>
                        </>
                      )}
                    </button>
                    
                    {testRestore.status === 'completed' && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-green-800 text-sm flex items-center">
                          <CheckCircle size={16} className="mr-2" />
                          File '{testRestore.file}' restored successfully!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3-2-1 Rule Explanation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">💡 The 3-2-1 Backup Rule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-800">
          <div className="flex items-start space-x-2">
            <span className="font-bold text-xl">3</span>
            <div>
              <div className="font-medium">Copies of data</div>
              <div>Keep at least 3 copies of important data</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-bold text-xl">2</span>
            <div>
              <div className="font-medium">Different media types</div>
              <div>Store on 2 different types of storage media</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-bold text-xl">1</span>
            <div>
              <div className="font-medium">Offsite backup</div>
              <div>Keep 1 copy in a different location</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBackupDemo;