// Additional demo utilities and enhancements

// Utility functions for enhanced demo experiences
class DemoUtils {
    static animateElement(element, animation = 'pulse') {
        element.style.animation = `${animation} 0.6s ease-in-out`;
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }

    static showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        // Set background color based on type
        const colors = {
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545',
            info: '#17a2b8'
        };
        toast.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    static typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    static createProgressAnimation(element, duration = 2000) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            element.style.width = progress + '%';
        }, duration / 20);
    }

    // Simulate realistic loading delays
    static simulateNetworkDelay(min = 500, max = 2000) {
        return new Promise(resolve => {
            const delay = Math.random() * (max - min) + min;
            setTimeout(resolve, delay);
        });
    }

    // Email validation for demos
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone number formatting for demos
    static formatPhoneNumber(phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phoneNumber;
    }

    // Generate realistic fake data for demos
    static generateFakeData() {
        return {
            emails: [
                {
                    sender: 'security@paypal.com',
                    subject: 'Verdächtige Aktivität in Ihrem Konto',
                    preview: 'Wir haben ungewöhnliche Aktivitäten festgestellt...',
                    isPhishing: true,
                    indicators: ['Dringlichkeit', 'Verdächtige Links', 'Generische Anrede']
                },
                {
                    sender: 'support@amazon.de',
                    subject: 'Ihre Bestellung wurde storniert',
                    preview: 'Ihre Bestellung #DE123456 wurde leider storniert...',
                    isPhishing: true,
                    indicators: ['Falsche Domain', 'Rechtschreibfehler', 'Verdächtige Anhänge']
                },
                {
                    sender: 'newsletter@heise.de',
                    subject: 'heise Security: Die Woche im Überblick',
                    preview: 'Ihre wöchentliche Zusammenfassung der wichtigsten...',
                    isPhishing: false,
                    indicators: ['Bekannter Absender', 'Erwartete E-Mail', 'Korrekte Domain']
                }
            ],
            wifiNetworks: [
                {
                    name: 'Cafe_Free_WiFi',
                    security: 'Offen',
                    signal: 5,
                    risk: 'high',
                    description: 'Unverschlüsseltes öffentliches Netzwerk'
                },
                {
                    name: 'Hotel_Guest_Secure',
                    security: 'WPA2',
                    signal: 4,
                    risk: 'medium',
                    description: 'Geteiltes Passwort, andere Gäste im Netzwerk'
                },
                {
                    name: 'iPhone_Hotspot',
                    security: 'WPA3',
                    signal: 3,
                    risk: 'low',
                    description: 'Persönlicher Hotspot mit starker Verschlüsselung'
                }
            ]
        };
    }

    // Security scoring for various demo elements
    static calculateSecurityScore(criteria) {
        let score = 0;
        let maxScore = 0;
        
        for (const [key, value] of Object.entries(criteria)) {
            maxScore += value.weight;
            if (value.met) {
                score += value.weight;
            }
        }
        
        return Math.round((score / maxScore) * 100);
    }

    // Create visual security indicators
    static createSecurityIndicator(level) {
        const indicator = document.createElement('div');
        indicator.className = 'security-indicator';
        
        const colors = {
            low: '#dc3545',
            medium: '#ffc107', 
            high: '#28a745'
        };
        
        const icons = {
            low: '🔓',
            medium: '🔒',
            high: '🛡️'
        };
        
        indicator.innerHTML = `
            <span class="security-icon">${icons[level]}</span>
            <span class="security-level">${level.toUpperCase()}</span>
        `;
        
        indicator.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            background: ${colors[level]}20;
            border: 2px solid ${colors[level]};
            color: ${colors[level]};
            font-weight: 600;
            font-size: 0.875rem;
        `;
        
        return indicator;
    }

    // Accessibility helpers
    static announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Local storage utilities for demo persistence
    static saveDemoProgress(demoId, progress) {
        try {
            const demoData = JSON.parse(localStorage.getItem('demoProgress') || '{}');
            demoData[demoId] = {
                ...progress,
                lastAccessed: new Date().toISOString()
            };
            localStorage.setItem('demoProgress', JSON.stringify(demoData));
        } catch (e) {
            console.warn('Could not save demo progress:', e);
        }
    }

    static loadDemoProgress(demoId) {
        try {
            const demoData = JSON.parse(localStorage.getItem('demoProgress') || '{}');
            return demoData[demoId] || null;
        } catch (e) {
            console.warn('Could not load demo progress:', e);
            return null;
        }
    }

    // Analytics and learning insights
    static trackDemoInteraction(demoId, action, data = {}) {
        // In a real application, this would send data to an analytics service
        const interaction = {
            demoId,
            action,
            data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        console.log('Demo interaction tracked:', interaction);
        
        // Could also store locally for offline analysis
        try {
            const interactions = JSON.parse(localStorage.getItem('demoInteractions') || '[]');
            interactions.push(interaction);
            
            // Keep only last 100 interactions to avoid storage bloat
            if (interactions.length > 100) {
                interactions.splice(0, interactions.length - 100);
            }
            
            localStorage.setItem('demoInteractions', JSON.stringify(interactions));
        } catch (e) {
            console.warn('Could not store interaction:', e);
        }
    }

    // Generate learning insights based on demo performance
    static generateLearningInsights(demoId) {
        const interactions = this.loadDemoProgress(demoId);
        if (!interactions) return null;
        
        const insights = {
            strengthAreas: [],
            improvementAreas: [],
            recommendations: []
        };
        
        // This would contain more sophisticated logic in a real application
        // For now, just return some sample insights
        
        if (demoId === 'phishing') {
            insights.strengthAreas.push('Gute Erkennung von verdächtigen Absendern');
            insights.improvementAreas.push('Achten Sie mehr auf URL-Details');
            insights.recommendations.push('Üben Sie das Erkennen von URL-Spoofing');
        }
        
        return insights;
    }
}

// Enhanced keyboard navigation for accessibility
class KeyboardNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }
    
    handleKeydown(e) {
        // Handle modal navigation
        if (e.key === 'Tab' && document.querySelector('.modal.active')) {
            this.handleModalTabbing(e);
        }
        
        // Handle card navigation with arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            this.handleCardNavigation(e);
        }
    }
    
    handleModalTabbing(e) {
        const modal = document.querySelector('.modal.active');
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    handleCardNavigation(e) {
        const cards = document.querySelectorAll('.topic-card');
        const currentIndex = Array.from(cards).findIndex(card => 
            card.contains(document.activeElement)
        );
        
        if (currentIndex === -1) return;
        
        let nextIndex = currentIndex;
        
        switch (e.key) {
            case 'ArrowLeft':
                nextIndex = Math.max(0, currentIndex - 1);
                break;
            case 'ArrowRight':
                nextIndex = Math.min(cards.length - 1, currentIndex + 1);
                break;
            case 'ArrowUp':
                nextIndex = Math.max(0, currentIndex - 3); // Assuming 3 cards per row
                break;
            case 'ArrowDown':
                nextIndex = Math.min(cards.length - 1, currentIndex + 3);
                break;
        }
        
        if (nextIndex !== currentIndex) {
            e.preventDefault();
            cards[nextIndex].querySelector('.topic-card__button').focus();
        }
    }
}

// Performance monitoring for the demos
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.interactions = [];
    }
    
    markInteraction(name) {
        this.interactions.push({
            name,
            time: performance.now() - this.startTime
        });
    }
    
    getReport() {
        return {
            totalTime: performance.now() - this.startTime,
            interactions: this.interactions,
            memoryUsage: performance.memory ? {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize
            } : null
        };
    }
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize keyboard navigation
    new KeyboardNavigation();
    
    // Initialize performance monitoring
    window.performanceMonitor = new PerformanceMonitor();
    
    // Add global error handling for demos
    window.addEventListener('error', (e) => {
        console.error('Demo error:', e.error);
        DemoUtils.showToast('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.', 'error');
    });
    
    // Add connection status monitoring
    window.addEventListener('online', () => {
        DemoUtils.showToast('Internetverbindung wiederhergestellt', 'success');
    });
    
    window.addEventListener('offline', () => {
        DemoUtils.showToast('Keine Internetverbindung - Demos funktionieren weiterhin', 'warning');
    });
});

// Export utilities for use in main application
window.DemoUtils = DemoUtils;
window.PerformanceMonitor = PerformanceMonitor;