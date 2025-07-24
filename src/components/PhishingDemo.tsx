import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle, Eye, ExternalLink, User } from 'lucide-react';

interface Email {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  content: string;
  isPhishing: boolean;
  phishingIndicators: string[];
  timestamp: string;
  read: boolean;
}

const emails: Email[] = [
  {
    id: 1,
    sender: "Netflix Support",
    senderEmail: "support@netflx-security.com",
    subject: "Urgent: Your account will be suspended in 24 hours",
    content: "Dear Customer,\n\nWe've detected unusual activity on your Netflix account. Your account will be suspended within 24 hours unless you verify your payment information immediately.\n\nClick here to verify: http://netflx-verify.suspicious-domain.com\n\nBest regards,\nNetflix Security Team",
    isPhishing: true,
    phishingIndicators: [
      "Suspicious domain (netflx-security.com instead of netflix.com)",
      "Creates urgency with 24-hour deadline",
      "Suspicious verification link",
      "Generic greeting 'Dear Customer'",
      "Requests immediate action"
    ],
    timestamp: "2 hours ago",
    read: false
  },
  {
    id: 2,
    sender: "Bank of America",
    senderEmail: "alerts@bankofamerica.com",
    subject: "Account Alert: Transaction Approved",
    content: "Hello John Smith,\n\nA transaction of $45.67 has been approved on your checking account ending in 1234.\n\nTransaction Details:\nMerchant: Amazon.com\nDate: Today, 2:30 PM\nAmount: $45.67\n\nIf you did not authorize this transaction, please contact us immediately at 1-800-432-1000.\n\nThank you for banking with us.",
    isPhishing: false,
    phishingIndicators: [],
    timestamp: "4 hours ago",
    read: true
  },
  {
    id: 3,
    sender: "Apple Support",
    senderEmail: "no-reply@apple-security.org",
    subject: "Your Apple ID has been locked",
    content: "Your Apple ID has been locked due to security concerns.\n\nSomeone tried to sign into your account from an unknown device. To unlock your account, please verify your identity by clicking the link below:\n\nUnlock Account: http://apple-unlock.secure-check.net\n\nIf you don't unlock your account within 24 hours, it will be permanently disabled.\n\nApple Security",
    isPhishing: true,
    phishingIndicators: [
      "Fake domain (apple-security.org instead of apple.com)",
      "Suspicious unlock link",
      "Threat of permanent account loss",
      "Creates false urgency",
      "No official Apple branding or formatting"
    ],
    timestamp: "6 hours ago",
    read: false
  },
  {
    id: 4,
    sender: "Microsoft Office 365",
    senderEmail: "noreply@microsoft.com",
    subject: "Your Office 365 subscription renewal",
    content: "Hello,\n\nYour Microsoft Office 365 subscription has been successfully renewed for another year.\n\nSubscription Details:\nPlan: Office 365 Personal\nRenewal Date: January 15, 2025\nAmount: $69.99\nNext Billing: January 15, 2026\n\nYou can manage your subscription at account.microsoft.com\n\nThank you for choosing Microsoft Office 365.",
    isPhishing: false,
    phishingIndicators: [],
    timestamp: "1 day ago",
    read: true
  }
];

const PhishingDemo: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [checkedEmails, setCheckedEmails] = useState<{ [key: number]: 'phishing' | 'legitimate' | null }>({});
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handlePhishingCheck = (emailId: number, guess: 'phishing' | 'legitimate') => {
    const email = emails.find(e => e.id === emailId);
    if (!email || checkedEmails[emailId]) return;

    const isCorrect = (guess === 'phishing' && email.isPhishing) || (guess === 'legitimate' && !email.isPhishing);
    
    setCheckedEmails(prev => ({ ...prev, [emailId]: guess }));
    setShowFeedback(prev => ({ ...prev, [emailId]: true }));
    setTotalAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Hide feedback after 3 seconds
    setTimeout(() => {
      setShowFeedback(prev => ({ ...prev, [emailId]: false }));
    }, 3000);
  };

  const getEmailRowClass = (email: Email) => {
    const checked = checkedEmails[email.id];
    const isCorrect = checked && ((checked === 'phishing' && email.isPhishing) || (checked === 'legitimate' && !email.isPhishing));
    
    if (checked) {
      return isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    }
    return email.read ? 'bg-slate-50' : 'bg-white font-medium';
  };

  return (
    <div className="p-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">📧 Email Security Challenge</h3>
        <p className="text-blue-800 text-sm mb-2">
          Examine each email carefully and determine if it's legitimate or a phishing attempt. 
          Look for suspicious sender addresses, urgent language, and suspicious links.
        </p>
        <div className="text-blue-700 text-sm">
          <strong>Score:</strong> {score}/{totalAttempts} correct
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email List */}
        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="border-b border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 flex items-center">
              <Mail className="mr-2" size={20} />
              Inbox (4 messages)
            </h3>
          </div>
          
          <div className="divide-y divide-slate-200">
            {emails.map((email) => {
              const checked = checkedEmails[email.id];
              const showingFeedback = showFeedback[email.id];
              
              return (
                <div
                  key={email.id}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                    selectedEmail?.id === email.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  } ${getEmailRowClass(email)}`}
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="flex items-start space-x-3">
                    {!email.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {email.sender}
                        </p>
                        <p className="text-xs text-slate-500">{email.timestamp}</p>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{email.subject}</p>
                      <p className="text-xs text-slate-500 mt-1">{email.senderEmail}</p>
                      
                      {/* Action Buttons */}
                      {!checked && (
                        <div className="flex space-x-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhishingCheck(email.id, 'legitimate');
                            }}
                            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                          >
                            ✓ Legitimate
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhishingCheck(email.id, 'phishing');
                            }}
                            className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                          >
                            ⚠ Phishing
                          </button>
                        </div>
                      )}
                      
                      {/* Feedback */}
                      {showingFeedback && (
                        <div className="mt-2 p-2 rounded-lg text-xs">
                          {((checked === 'phishing' && email.isPhishing) || (checked === 'legitimate' && !email.isPhishing)) ? (
                            <div className="text-green-700 bg-green-100 p-2 rounded flex items-center">
                              <CheckCircle size={14} className="mr-1" />
                              Correct! {email.isPhishing ? 'This is indeed a phishing email.' : 'This is a legitimate email.'}
                            </div>
                          ) : (
                            <div className="text-red-700 bg-red-100 p-2 rounded flex items-center">
                              <AlertTriangle size={14} className="mr-1" />
                              Incorrect. {email.isPhishing ? 'This is actually a phishing email.' : 'This is actually legitimate.'}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Email Detail */}
        <div className="bg-white border border-slate-200 rounded-lg">
          {selectedEmail ? (
            <div>
              <div className="border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 flex items-center">
                    <Eye className="mr-2" size={20} />
                    Email Details
                  </h3>
                  {selectedEmail.isPhishing && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                      ⚠ Phishing Email
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Email Header */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-600">From:</span>
                    <span className="text-sm font-medium">{selectedEmail.sender}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-600">Email:</span>
                    <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                      {selectedEmail.senderEmail}
                    </span>
                    {selectedEmail.isPhishing && (
                      <span className="text-xs text-red-600">📍 Suspicious domain</span>
                    )}
                  </div>
                  <div className="text-sm text-slate-600">
                    <strong>Subject:</strong> {selectedEmail.subject}
                  </div>
                </div>
                
                {/* Email Content */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-slate-900 mb-2">Message Content:</h4>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans">
                      {selectedEmail.content}
                    </pre>
                  </div>
                </div>
                
                {/* Phishing Indicators */}
                {selectedEmail.isPhishing && selectedEmail.phishingIndicators.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-red-900 mb-2 flex items-center">
                      <AlertTriangle size={16} className="mr-1" />
                      Phishing Indicators:
                    </h4>
                    <ul className="space-y-1">
                      {selectedEmail.phishingIndicators.map((indicator, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start">
                          <span className="mr-2">•</span>
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Safety Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Safety Tips:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Always verify sender email addresses carefully</li>
                    <li>• Be suspicious of urgent language and threats</li>
                    <li>• Hover over links to see the actual destination</li>
                    <li>• When in doubt, contact the organization directly</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              <Mail size={48} className="mx-auto mb-4 text-slate-300" />
              <p>Select an email from the inbox to view its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhishingDemo;