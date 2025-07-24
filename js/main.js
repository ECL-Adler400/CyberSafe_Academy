// Main JavaScript for the cybersecurity education website

class CybersecurityApp {
    constructor() {
        this.modal = document.getElementById('demoModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.topicCards = document.querySelectorAll('.topic-card');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.addCardAnimations();
    }

    bindEvents() {
        // Topic card clicks
        this.topicCards.forEach(card => {
            const button = card.querySelector('.topic-card__button');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const topic = card.getAttribute('data-topic');
                this.openDemo(topic);
            });
        });

        // Modal close events
        const closeButton = this.modal.querySelector('.modal__close');
        const backdrop = this.modal.querySelector('.modal__backdrop');
        
        closeButton.addEventListener('click', () => this.closeModal());
        backdrop.addEventListener('click', () => this.closeModal());

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Smooth scrolling for any anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    addCardAnimations() {
        // Intersection Observer for fade-in animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            this.topicCards.forEach(card => {
                observer.observe(card);
            });
        }
    }

    openDemo(topic) {
        const demoContent = this.getDemoContent(topic);
        const demoTitle = this.getDemoTitle(topic);
        
        this.modalTitle.textContent = demoTitle;
        this.modalBody.innerHTML = demoContent;
        
        // Show modal
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        this.modal.querySelector('.modal__close').focus();
        
        // Initialize demo-specific functionality
        this.initDemo(topic);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Clean up any demo-specific timers or events
        this.cleanupDemo();
    }

    getDemoTitle(topic) {
        const titles = {
            'phishing': 'Phishing erkennen - Interaktive Demo',
            'wifi': 'WLAN-Sicherheit - Smartphone Simulation',
            'passwords': 'Sichere Passwörter - Generator & Tipps',
            '2fa': 'Zwei-Faktor-Authentifizierung - Live Demo',
            'updates': 'Software-Updates - Sicherheitszentrale',
            'backup': 'Datensicherung - Backup-Assistent'
        };
        return titles[topic] || 'Demo';
    }

    getDemoContent(topic) {
        const content = {
            'phishing': this.getPhishingDemoContent(),
            'wifi': this.getWifiDemoContent(),
            'passwords': this.getPasswordDemoContent(),
            '2fa': this.get2FADemoContent(),
            'updates': this.getUpdateDemoContent(),
            'backup': this.getBackupDemoContent()
        };
        return content[topic] || '<p>Demo wird geladen...</p>';
    }

    getPhishingDemoContent() {
        return `
            <div class="demo">
                <div class="demo__header">
                    <h3 class="demo__title">E-Mail Posteingang Simulation</h3>
                    <p class="demo__instruction">
                        Klicken Sie auf die E-Mails und prüfen Sie, ob es sich um Phishing handelt. 
                        Achten Sie auf verdächtige Absender, Links und Inhalte.
                    </p>
                </div>
                
                <div class="email-inbox">
                    <div class="email-inbox__header">
                        <span>📧</span>
                        <span class="email-inbox__title">Posteingang (4 neue Nachrichten)</span>
                    </div>
                    <ul class="email-list">
                        <li class="email-item" data-email="bank" data-type="phishing">
                            <div class="email-header">
                                <span class="email-sender">service@bank-sicherheit.com</span>
                                <span class="email-time">Vor 2 Stunden</span>
                            </div>
                            <div class="email-subject">🚨 DRINGEND: Konto gesperrt - Sofortige Verifizierung erforderlich</div>
                            <div class="email-preview">
                                Ihr Konto wurde aus Sicherheitsgründen gesperrt. Klicken Sie hier um...
                            </div>
                            <div class="email-flags">
                                <span class="email-flag urgent">DRINGEND</span>
                                <span class="email-flag external">EXTERN</span>
                            </div>
                        </li>
                        <li class="email-item" data-email="newsletter" data-type="safe">
                            <div class="email-header">
                                <span class="email-sender">newsletter@heise.de</span>
                                <span class="email-time">Vor 4 Stunden</span>
                            </div>
                            <div class="email-subject">Heise Newsletter: Neue Entwicklungen in der IT-Sicherheit</div>
                            <div class="email-preview">
                                Die wichtigsten Nachrichten der Woche aus der IT-Welt...
                            </div>
                        </li>
                        <li class="email-item" data-email="package" data-type="phishing">
                            <div class="email-header">
                                <span class="email-sender">versand@dhl-paket.info</span>
                                <span class="email-time">Vor 6 Stunden</span>
                            </div>
                            <div class="email-subject">Paket konnte nicht zugestellt werden</div>
                            <div class="email-preview">
                                Wir konnten Ihr Paket nicht zustellen. Bitte aktualisieren Sie...
                            </div>
                            <div class="email-flags">
                                <span class="email-flag external">EXTERN</span>
                            </div>
                        </li>
                        <li class="email-item" data-email="colleague" data-type="safe">
                            <div class="email-header">
                                <span class="email-sender">m.mueller@unternehmen.de</span>
                                <span class="email-time">Vor 8 Stunden</span>
                            </div>
                            <div class="email-subject">Meeting Protokoll vom 15.01.2025</div>
                            <div class="email-preview">
                                Anbei das Protokoll unseres gestrigen Meetings...
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div class="demo__feedback" id="phishingFeedback"></div>
            </div>
        `;
    }

    getWifiDemoContent() {
        return `
            <div class="demo">
                <div class="demo__header">
                    <h3 class="demo__title">WLAN-Auswahl Simulation</h3>
                    <p class="demo__instruction">
                        Sie befinden sich in einem Café und möchten sich mit einem WLAN verbinden. 
                        Wählen Sie das sicherste Netzwerk aus.
                    </p>
                </div>
                
                <div class="phone-simulator">
                    <div class="phone-screen">
                        <div class="phone-header">
                            <span>📱 WLAN-Einstellungen</span>
                        </div>
                        <ul class="wifi-list">
                            <li class="wifi-item" data-wifi="cafe-free" data-type="dangerous">
                                <div class="wifi-info">
                                    <span class="wifi-icon unsecure">📶</span>
                                    <div>
                                        <div class="wifi-name">Cafe-Free-WiFi</div>
                                        <div class="wifi-security">Offen</div>
                                    </div>
                                </div>
                                <div class="wifi-signal">📶📶📶</div>
                            </li>
                            <li class="wifi-item" data-wifi="guest-network" data-type="better">
                                <div class="wifi-info">
                                    <span class="wifi-icon secure">🔒</span>
                                    <div>
                                        <div class="wifi-name">Cafe-Guest</div>
                                        <div class="wifi-security">WPA2 (Passwort: cafe123)</div>
                                    </div>
                                </div>
                                <div class="wifi-signal">📶📶📶</div>
                            </li>
                            <li class="wifi-item" data-wifi="hotspot" data-type="best">
                                <div class="wifi-info">
                                    <span class="wifi-icon secure">📱</span>
                                    <div>
                                        <div class="wifi-name">Mein-Handy-Hotspot</div>
                                        <div class="wifi-security">WPA3 (Persönlicher Hotspot)</div>
                                    </div>
                                </div>
                                <div class="wifi-signal">📶📶</div>
                            </li>
                            <li class="wifi-item" data-wifi="suspicious" data-type="dangerous">
                                <div class="wifi-info">
                                    <span class="wifi-icon unsecure">⚠️</span>
                                    <div>
                                        <div class="wifi-name">Free-Internet-Here</div>
                                        <div class="wifi-security">Offen</div>
                                    </div>
                                </div>
                                <div class="wifi-signal">📶📶📶📶</div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="demo__feedback" id="wifiFeedback"></div>
            </div>
        `;
    }

    getPasswordDemoContent() {
        return `
            <div class="demo">
                <div class="demo__header">
                    <h3 class="demo__title">Passwort-Generator</h3>
                    <p class="demo__instruction">
                        Erstellen Sie ein sicheres Passwort und lernen Sie, was ein gutes Passwort ausmacht.
                    </p>
                </div>
                
                <div class="password-generator">
                    <div class="password-controls">
                        <div class="control-group">
                            <label class="control-label" for="passwordLength">Passwort-Länge: <span id="lengthValue">12</span></label>
                            <input type="range" id="passwordLength" class="control-input" min="6" max="32" value="12">
                        </div>
                        
                        <div class="checkbox-group">
                            <input type="checkbox" id="includeUppercase" checked>
                            <label for="includeUppercase" class="control-label">Großbuchstaben (A-Z)</label>
                        </div>
                        
                        <div class="checkbox-group">
                            <input type="checkbox" id="includeLowercase" checked>
                            <label for="includeLowercase" class="control-label">Kleinbuchstaben (a-z)</label>
                        </div>
                        
                        <div class="checkbox-group">
                            <input type="checkbox" id="includeNumbers" checked>
                            <label for="includeNumbers" class="control-label">Zahlen (0-9)</label>
                        </div>
                        
                        <div class="checkbox-group">
                            <input type="checkbox" id="includeSymbols" checked>
                            <label for="includeSymbols" class="control-label">Sonderzeichen (!@#$%^&*)</label>
                        </div>
                        
                        <button type="button" id="generatePassword" class="form-button">Neues Passwort generieren</button>
                    </div>
                    
                    <div class="generated-password" id="generatedPassword">
                        Klicken Sie auf "Generieren" um ein Passwort zu erstellen
                    </div>
                    
                    <div class="password-strength" id="passwordStrength"></div>
                    
                    <div class="password-tips">
                        <h4>💡 Tipps für sichere Passwörter:</h4>
                        <ul>
                            <li>Mindestens 12 Zeichen lang</li>
                            <li>Kombination aus Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen</li>
                            <li>Keine persönlichen Informationen verwenden</li>
                            <li>Für jeden Account ein anderes Passwort</li>
                            <li>Passwort-Manager verwenden</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    get2FADemoContent() {
        return `
            <div class="demo">
                <div class="demo__header">
                    <h3 class="demo__title">Zwei-Faktor-Authentifizierung Demo</h3>
                    <p class="demo__instruction">
                        Durchlaufen Sie den Login-Prozess mit aktivierter 2FA und verstehen Sie die Vorteile.
                    </p>
                </div>
                
                <div class="auth-simulator">
                    <div class="auth-step active" id="step1">
                        <div class="login-form">
                            <h4>Schritt 1: Normale Anmeldung</h4>
                            <div class="form-group">
                                <label class="form-label" for="username">Benutzername:</label>
                                <input type="text" id="username" class="form-input" placeholder="max.mustermann@email.de">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="password">Passwort:</label>
                                <input type="password" id="password" class="form-input" placeholder="••••••••••••">
                            </div>
                            <button type="button" id="loginStep1" class="form-button">Anmelden</button>
                        </div>
                    </div>
                    
                    <div class="auth-step" id="step2">
                        <div class="login-form">
                            <h4>Schritt 2: Zwei-Faktor-Authentifizierung</h4>
                            <p style="margin-bottom: 1rem; color: #6c757d;">
                                Wir haben einen 6-stelligen Code an Ihr Smartphone gesendet.
                            </p>
                            <div class="verification-code">
                                <input type="text" maxlength="1" pattern="[0-9]">
                                <input type="text" maxlength="1" pattern="[0-9]">
                                <input type="text" maxlength="1" pattern="[0-9]">
                                <input type="text" maxlength="1" pattern="[0-9]">
                                <input type="text" maxlength="1" pattern="[0-9]">
                                <input type="text" maxlength="1" pattern="[0-9]">
                            </div>
                            <p style="font-size: 0.875rem; color: #28a745; text-align: center; margin-bottom: 1rem;">
                                💡 Hinweis für die Demo: Verwenden Sie den Code "123456"
                            </p>
                            <button type="button" id="loginStep2" class="form-button">Code bestätigen</button>
                        </div>
                    </div>
                    
                    <div class="auth-step" id="step3">
                        <div class="login-form" style="text-align: center;">
                            <h4 style="color: #28a745;">✅ Anmeldung erfolgreich!</h4>
                            <p style="margin: 1rem 0; color: #6c757d;">
                                Sie haben sich erfolgreich mit 2FA angemeldet. Ihr Account ist optimal geschützt!
                            </p>
                            <div style="background: #e8f5e8; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
                                <h5>Warum ist 2FA so wichtig?</h5>
                                <ul style="text-align: left; margin-top: 0.5rem;">
                                    <li>Schutz auch bei gestohlenen Passwörtern</li>
                                    <li>Zweite Sicherheitsebene durch Ihr Smartphone</li>
                                    <li>Drastische Reduzierung von Account-Übernahmen</li>
                                </ul>
                            </div>
                            <button type="button" id="restartDemo" class="form-button">Demo wiederholen</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getUpdateDemoContent() {
        return `
            <div class="demo">
                <div class="demo__header">
                    <h3 class="demo__title">Software-Update Zentrale</h3>
                    <p class="demo__instruction">
                        Priorisieren Sie die Updates basierend auf ihrer Wichtigkeit für die Sicherheit.
                    </p>
                </div>
                
                <div class="update-center">
                    <div class="update-header">
                        <h4>🔄 Verfügbare Updates (4)</h4>
                    </div>
                    <ul class="update-list">
                        <li class="update-item" data-update="security" data-priority="critical">
                            <div class="update-info">
                                <h4>Windows Sicherheitsupdate</h4>
                                <p>Behebt kritische Sicherheitslücken im Betriebssystem</p>
                                <span class="update-badge security">SICHERHEIT</span>
                            </div>
                            <button class="update-button" data-action="install">Jetzt installieren</button>
                        </li>
                        <li class="update-item" data-update="browser" data-priority="high">
                            <div class="update-info">
                                <h4>Chrome Browser Update</h4>
                                <p>Schließt Sicherheitslücken und verbessert Performance</p>
                                <span class="update-badge security">SICHERHEIT</span>
                            </div>
                            <button class="update-button" data-action="install">Installieren</button>
                        </li>
                        <li class="update-item" data-update="antivirus" data-priority="critical">
                            <div class="update-info">
                                <h4>Antivirus-Definitionen</h4>
                                <p>Neue Virensignaturen zum Schutz vor aktuellen Bedrohungen</p>
                                <span class="update-badge security">SICHERHEIT</span>
                            </div>
                            <button class="update-button" data-action="install">Sofort installieren</button>
                        </li>
                        <li class="update-item" data-update="feature" data-priority="low">
                            <div class="update-info">
                                <h4>Textverarbeitungs-Software</h4>
                                <p>Neue Features und verbesserte Benutzeroberfläche</p>
                                <span class="update-badge feature">FEATURES</span>
                            </div>
                            <button class="update-button" data-action="schedule">Später installieren</button>
                        </li>
                    </ul>
                </div>
                
                <div class="demo__feedback" id="updateFeedback"></div>
            </div>
        `;
    }

    getBackupDemoContent() {
        return `
            <div class="demo">
                <div class="demo__header">
                    <h3 class="demo__title">Backup-Assistent</h3>
                    <p class="demo__instruction">
                        Lernen Sie, wie Sie Ihre wichtigen Daten richtig sichern und im Notfall wiederherstellen.
                    </p>
                </div>
                
                <div class="backup-wizard">
                    <div class="backup-step active" id="backupStep1">
                        <h4>Schritt 1: Was möchten Sie sichern?</h4>
                        <div class="backup-options">
                            <div class="backup-option" data-option="documents">
                                <h4>📄 Dokumente</h4>
                                <p>Wichtige Dateien, Verträge, Rechnungen</p>
                            </div>
                            <div class="backup-option" data-option="photos">
                                <h4>📸 Fotos & Videos</h4>
                                <p>Persönliche Erinnerungen und Medien</p>
                            </div>
                            <div class="backup-option" data-option="system">
                                <h4>💻 System-Backup</h4>
                                <p>Komplettes System mit allen Programmen</p>
                            </div>
                        </div>
                        <button type="button" id="backupNext1" class="form-button" disabled>Weiter</button>
                    </div>
                    
                    <div class="backup-step" id="backupStep2">
                        <h4>Schritt 2: Wo soll das Backup gespeichert werden?</h4>
                        <div class="backup-options">
                            <div class="backup-option" data-storage="external">
                                <h4>💾 Externe Festplatte</h4>
                                <p>Lokale Sicherung, schnell verfügbar</p>
                            </div>
                            <div class="backup-option" data-storage="cloud">
                                <h4>☁️ Cloud-Speicher</h4>
                                <p>Online-Backup, von überall zugänglich</p>
                            </div>
                            <div class="backup-option" data-storage="both">
                                <h4>🔄 Beide Optionen</h4>
                                <p>Doppelte Sicherheit (empfohlen)</p>
                            </div>
                        </div>
                        <button type="button" id="backupNext2" class="form-button" disabled>Backup starten</button>
                    </div>
                    
                    <div class="backup-step" id="backupStep3">
                        <h4>Backup wird durchgeführt...</h4>
                        <div class="backup-progress">
                            <div class="backup-progress-bar" id="backupProgressBar"></div>
                        </div>
                        <p id="backupStatus">Dateien werden gesichert...</p>
                        <div style="background: #e8f5e8; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
                            <h5>💡 Backup-Tipps während des Wartens:</h5>
                            <ul style="margin-top: 0.5rem;">
                                <li>Führen Sie regelmäßige Backups durch (mindestens monatlich)</li>
                                <li>Testen Sie Ihre Backups gelegentlich</li>
                                <li>Verwenden Sie die 3-2-1 Regel: 3 Kopien, 2 verschiedene Medien, 1 extern</li>
                                <li>Verschlüsseln Sie sensible Daten</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="backup-step" id="backupStep4">
                        <h4 style="color: #28a745; text-align: center;">✅ Backup erfolgreich abgeschlossen!</h4>
                        <div style="background: #d4edda; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
                            <p><strong>Backup-Details:</strong></p>
                            <ul id="backupSummary">
                                <!-- Will be populated by JavaScript -->
                            </ul>
                        </div>
                        <p style="text-align: center; color: #6c757d; margin: 1rem 0;">
                            Ihre Daten sind jetzt sicher gesichert. Das nächste automatische Backup ist für nächste Woche geplant.
                        </p>
                        <button type="button" id="restartBackup" class="form-button">Neues Backup erstellen</button>
                    </div>
                </div>
            </div>
        `;
    }

    initDemo(topic) {
        // Initialize demo-specific functionality based on the topic
        switch(topic) {
            case 'phishing':
                this.initPhishingDemo();
                break;
            case 'wifi':
                this.initWifiDemo();
                break;
            case 'passwords':
                this.initPasswordDemo();
                break;
            case '2fa':
                this.init2FADemo();
                break;
            case 'updates':
                this.initUpdateDemo();
                break;
            case 'backup':
                this.initBackupDemo();
                break;
        }
    }

    initPhishingDemo() {
        const emailItems = this.modalBody.querySelectorAll('.email-item');
        const feedback = this.modalBody.querySelector('#phishingFeedback');
        
        emailItems.forEach(item => {
            item.addEventListener('click', () => {
                const emailType = item.getAttribute('data-type');
                const emailId = item.getAttribute('data-email');
                
                // Remove previous selections
                emailItems.forEach(el => el.classList.remove('suspicious', 'safe'));
                
                // Add appropriate class
                if (emailType === 'phishing') {
                    item.classList.add('suspicious');
                    feedback.className = 'demo__feedback success';
                    feedback.textContent = '✅ Richtig erkannt! Diese E-Mail ist verdächtig und könnte ein Phishing-Versuch sein.';
                } else {
                    item.classList.add('safe');
                    feedback.className = 'demo__feedback warning';
                    feedback.textContent = '⚠️ Diese E-Mail scheint harmlos zu sein. Achten Sie auf die Merkmale sicherer E-Mails.';
                }
                
                feedback.style.display = 'block';
                
                setTimeout(() => {
                    feedback.style.display = 'none';
                    emailItems.forEach(el => el.classList.remove('suspicious', 'safe'));
                }, 3000);
            });
        });
    }

    initWifiDemo() {
        const wifiItems = this.modalBody.querySelectorAll('.wifi-item');
        const feedback = this.modalBody.querySelector('#wifiFeedback');
        
        wifiItems.forEach(item => {
            item.addEventListener('click', () => {
                const wifiType = item.getAttribute('data-type');
                
                let message = '';
                let className = '';
                
                switch(wifiType) {
                    case 'dangerous':
                        className = 'demo__feedback error';
                        message = '❌ Unsichere Wahl! Offene WLAN-Netzwerke sind ein Sicherheitsrisiko.';
                        break;
                    case 'better':
                        className = 'demo__feedback warning';
                        message = '⚠️ Besser, aber nicht optimal. Öffentliche Netzwerke können überwacht werden.';
                        break;
                    case 'best':
                        className = 'demo__feedback success';
                        message = '✅ Excellente Wahl! Ihr persönlicher Hotspot ist die sicherste Option.';
                        break;
                }
                
                feedback.className = className;
                feedback.textContent = message;
                feedback.style.display = 'block';
                
                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 4000);
            });
        });
    }

    initPasswordDemo() {
        const lengthSlider = this.modalBody.querySelector('#passwordLength');
        const lengthValue = this.modalBody.querySelector('#lengthValue');
        const generateBtn = this.modalBody.querySelector('#generatePassword');
        const passwordDisplay = this.modalBody.querySelector('#generatedPassword');
        const strengthIndicator = this.modalBody.querySelector('#passwordStrength');
        
        lengthSlider.addEventListener('input', () => {
            lengthValue.textContent = lengthSlider.value;
        });
        
        generateBtn.addEventListener('click', () => {
            const length = parseInt(lengthSlider.value);
            const includeUpper = this.modalBody.querySelector('#includeUppercase').checked;
            const includeLower = this.modalBody.querySelector('#includeLowercase').checked;
            const includeNumbers = this.modalBody.querySelector('#includeNumbers').checked;
            const includeSymbols = this.modalBody.querySelector('#includeSymbols').checked;
            
            const password = this.generatePassword(length, includeUpper, includeLower, includeNumbers, includeSymbols);
            const strength = this.calculatePasswordStrength(password);
            
            passwordDisplay.textContent = password;
            this.displayPasswordStrength(strength, strengthIndicator);
        });
        
        // Generate initial password
        generateBtn.click();
    }

    generatePassword(length, upper, lower, numbers, symbols) {
        let charset = '';
        if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) charset += '0123456789';
        if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (!charset) return 'Bitte wählen Sie mindestens eine Option';
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        return password;
    }

    calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        
        if (score <= 2) return 'weak';
        if (score <= 4) return 'medium';
        return 'strong';
    }

    displayPasswordStrength(strength, element) {
        const strengthTexts = {
            weak: 'Schwach - Passwort sollte verbessert werden',
            medium: 'Mittel - Passwort ist ok, aber kann stärker sein',
            strong: 'Stark - Excellentes Passwort!'
        };
        
        element.className = `password-strength ${strength}`;
        element.textContent = strengthTexts[strength];
        element.style.display = 'block';
    }

    init2FADemo() {
        const step1Btn = this.modalBody.querySelector('#loginStep1');
        const step2Btn = this.modalBody.querySelector('#loginStep2');
        const restartBtn = this.modalBody.querySelector('#restartDemo');
        const codeInputs = this.modalBody.querySelectorAll('.verification-code input');
        
        step1Btn.addEventListener('click', () => {
            this.showAuthStep(2);
        });
        
        step2Btn.addEventListener('click', () => {
            const code = Array.from(codeInputs).map(input => input.value).join('');
            if (code === '123456') {
                this.showAuthStep(3);
            } else {
                alert('Falscher Code! Versuchen Sie "123456"');
            }
        });
        
        restartBtn.addEventListener('click', () => {
            this.showAuthStep(1);
            codeInputs.forEach(input => input.value = '');
        });
        
        // Auto-focus next input
        codeInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value && index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            });
        });
    }

    showAuthStep(stepNumber) {
        const steps = this.modalBody.querySelectorAll('.auth-step');
        steps.forEach(step => step.classList.remove('active'));
        this.modalBody.querySelector(`#step${stepNumber}`).classList.add('active');
    }

    initUpdateDemo() {
        const updateButtons = this.modalBody.querySelectorAll('.update-button');
        const feedback = this.modalBody.querySelector('#updateFeedback');
        
        updateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const updateItem = button.closest('.update-item');
                const priority = updateItem.getAttribute('data-priority');
                const updateType = updateItem.getAttribute('data-update');
                
                button.textContent = 'Wird installiert...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = '✅ Installiert';
                    
                    let message = '';
                    let className = '';
                    
                    if (priority === 'critical') {
                        className = 'demo__feedback success';
                        message = '✅ Exzellent! Sicherheitsupdates sollten immer sofort installiert werden.';
                    } else if (priority === 'high') {
                        className = 'demo__feedback success';
                        message = '✅ Gute Entscheidung! Browser-Updates sind wichtig für die Sicherheit.';
                    } else {
                        className = 'demo__feedback warning';
                        message = '⚠️ Feature-Updates können warten, aber vergessen Sie sie nicht ganz.';
                    }
                    
                    feedback.className = className;
                    feedback.textContent = message;
                    feedback.style.display = 'block';
                    
                    setTimeout(() => {
                        feedback.style.display = 'none';
                    }, 3000);
                }, 1500);
            });
        });
    }

    initBackupDemo() {
        let selectedData = '';
        let selectedStorage = '';
        
        const step1Options = this.modalBody.querySelectorAll('[data-option]');
        const step2Options = this.modalBody.querySelectorAll('[data-storage]');
        const nextBtn1 = this.modalBody.querySelector('#backupNext1');
        const nextBtn2 = this.modalBody.querySelector('#backupNext2');
        const restartBtn = this.modalBody.querySelector('#restartBackup');
        
        step1Options.forEach(option => {
            option.addEventListener('click', () => {
                step1Options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedData = option.getAttribute('data-option');
                nextBtn1.disabled = false;
            });
        });
        
        step2Options.forEach(option => {
            option.addEventListener('click', () => {
                step2Options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedStorage = option.getAttribute('data-storage');
                nextBtn2.disabled = false;
            });
        });
        
        nextBtn1.addEventListener('click', () => {
            this.showBackupStep(2);
        });
        
        nextBtn2.addEventListener('click', () => {
            this.showBackupStep(3);
            this.startBackupProcess(selectedData, selectedStorage);
        });
        
        restartBtn.addEventListener('click', () => {
            this.resetBackupDemo();
        });
    }

    showBackupStep(stepNumber) {
        const steps = this.modalBody.querySelectorAll('.backup-step');
        steps.forEach(step => step.classList.remove('active'));
        this.modalBody.querySelector(`#backupStep${stepNumber}`).classList.add('active');
    }

    startBackupProcess(dataType, storageType) {
        const progressBar = this.modalBody.querySelector('#backupProgressBar');
        const statusText = this.modalBody.querySelector('#backupStatus');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.completeBackup(dataType, storageType);
            }
            
            progressBar.style.width = progress + '%';
            statusText.textContent = `Fortschritt: ${Math.round(progress)}%`;
        }, 300);
    }

    completeBackup(dataType, storageType) {
        setTimeout(() => {
            this.showBackupStep(4);
            
            const summary = this.modalBody.querySelector('#backupSummary');
            const dataTypes = {
                documents: 'Dokumente (1.2 GB)',
                photos: 'Fotos & Videos (5.8 GB)',
                system: 'System-Backup (15.3 GB)'
            };
            
            const storageTypes = {
                external: 'Externe Festplatte',
                cloud: 'Cloud-Speicher',
                both: 'Externe Festplatte + Cloud'
            };
            
            summary.innerHTML = `
                <li>Gesicherte Daten: ${dataTypes[dataType]}</li>
                <li>Speicherort: ${storageTypes[storageType]}</li>
                <li>Backup-Zeit: ${new Date().toLocaleString('de-DE')}</li>
                <li>Status: Erfolgreich abgeschlossen</li>
            `;
        }, 1000);
    }

    resetBackupDemo() {
        this.showBackupStep(1);
        
        // Reset selections
        const options = this.modalBody.querySelectorAll('.backup-option');
        options.forEach(option => option.classList.remove('selected'));
        
        const buttons = this.modalBody.querySelectorAll('#backupNext1, #backupNext2');
        buttons.forEach(btn => btn.disabled = true);
        
        // Reset progress
        const progressBar = this.modalBody.querySelector('#backupProgressBar');
        if (progressBar) progressBar.style.width = '0%';
    }

    cleanupDemo() {
        // Clean up any intervals or event listeners that might be running
        // This prevents memory leaks when switching between demos
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CybersecurityApp();
});

// Add some performance optimizations
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Could register a service worker here for offline functionality
    });
}