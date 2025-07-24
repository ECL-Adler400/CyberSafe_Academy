# Datenschutz & Cybersicherheit - Interaktive Lernplattform

Eine moderne, lehrreiche und interaktive Website zum Thema Datenschutz und Cybersicherheit. Die Plattform bietet sechs verschiedene interaktive Demos, um Nutzer spielerisch über wichtige Sicherheitsmaßnahmen im digitalen Raum aufzuklären.

## 🎯 Ziele

- **Bildung**: Vermittlung wichtiger Cybersicherheits-Konzepte auf verständliche Weise
- **Interaktivität**: Praktische Erfahrungen durch realistische Simulationen
- **Zugänglichkeit**: Responsive Design für alle Geräte und Barrierefreiheit
- **Motivation**: Positive Lernerfahrung ohne Angstmacherei

## 🚀 Features

### Interaktive Demos

1. **🔒 Phishing erkennen**
   - Simulierter E-Mail-Posteingang
   - Verschiedene E-Mail-Typen zum Testen
   - Sofortiges Feedback bei der Bewertung
   - Lernhilfen zur Erkennung von Phishing-Merkmalen

2. **📶 WLAN-Sicherheit**
   - Smartphone-Interface-Simulation
   - Verschiedene WLAN-Netzwerk-Optionen
   - Risikobewertung verschiedener Verbindungstypen
   - Empfehlungen für sicheres Surfen in öffentlichen Netzwerken

3. **🔑 Sichere Passwörter**
   - Interaktiver Passwort-Generator
   - Echtzeit-Stärkeanzeige
   - Anpassbare Parameter (Länge, Zeichentypen)
   - Tipps für sichere Passwörter und Passwort-Manager

4. **🛡️ Zwei-Faktor-Authentifizierung**
   - Schritt-für-Schritt 2FA-Demo
   - Simulierter Login-Prozess
   - Eingabe von Verifikationscodes
   - Erklärung der Sicherheitsvorteile

5. **🔄 Software-Updates**
   - Update-Zentrale-Simulation
   - Priorisierung verschiedener Update-Typen
   - Sicherheits- vs. Feature-Updates
   - Best Practices für Update-Management

6. **💾 Datensicherung**
   - Backup-Assistent mit Schritt-für-Schritt-Anleitung
   - Verschiedene Backup-Optionen
   - Fortschrittsanzeige und Simulation
   - 3-2-1-Backup-Regel und Best Practices

### Design-Features

- **Minimalistisch**: Klares Design mit viel Weißraum
- **Responsive**: Optimiert für Desktop, Tablet und Mobile
- **Zugänglich**: WCAG-konforme Barrierefreiheit
- **Animationen**: Unterstützende CSS/SVG-Animationen
- **Performance**: Optimiert für schnelle Ladezeiten

## 🛠️ Technische Implementierung

### Frontend-Technologien

- **HTML5**: Semantisches Markup für bessere Zugänglichkeit
- **CSS3**: 
  - Grid und Flexbox für responsive Layouts
  - CSS-Transitions und Animationen
  - CSS Custom Properties (Variablen)
- **Vanilla JavaScript**: 
  - Modulare Architektur
  - Event-basierte Interaktionen
  - Accessibility-Features

### Projektstruktur

```
cybersecurity/
├── index.html              # Hauptseite
├── css/
│   ├── main.css            # Haupt-Stylesheet
│   └── demos.css           # Demo-spezifische Styles
├── js/
│   ├── main.js             # Hauptfunktionalität
│   └── demos.js            # Demo-Utilities
├── assets/
│   ├── icons/              # Icon-Dateien
│   ├── images/             # Bilder und Grafiken
│   └── svg/                # SVG-Animationen
└── README.md               # Dokumentation
```

### Architektur-Prinzipien

- **Modularer Aufbau**: Jede Demo ist eine eigenständige Komponente
- **Event-driven**: Lose gekoppelte Komponenten über Events
- **Progressive Enhancement**: Basisfunktionalität ohne JavaScript
- **Mobile-first**: Responsive Design von kleinen zu großen Bildschirmen

## 🎨 Design-System

### Farbpalette

- **Primär**: `#667eea` (Blau-Gradient)
- **Sekundär**: `#764ba2` (Lila-Gradient)
- **Text**: `#2c3e50` (Dunkelgrau)
- **Hintergrund**: `#f8f9fa` (Hellgrau)
- **Erfolg**: `#28a745` (Grün)
- **Warnung**: `#ffc107` (Gelb)
- **Fehler**: `#dc3545` (Rot)

### Typografie

- **Primär-Font**: System-Fonts (San Francisco, Segoe UI, Roboto)
- **Code-Font**: Courier New (für Passwort-Anzeige)
- **Größen**: Responsive Typografie mit rem-Einheiten

### Komponenten

- **Cards**: Einheitliche Topic-Cards mit Hover-Effekten
- **Modal**: Zentrales Modal-System für alle Demos
- **Buttons**: Konsistente Button-Styles mit Fokus-Indikatoren
- **Form Elements**: Zugängliche Formular-Komponenten

## 🚀 Installation & Entwicklung

### Voraussetzungen

- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Webserver (für lokale Entwicklung empfohlen)

### Lokale Entwicklung

1. Repository klonen:
```bash
git clone https://github.com/ECL-Adler400/cybersecurity.git
cd cybersecurity
```

2. Lokalen Webserver starten (z.B. mit Python):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (mit npx)
npx serve .

# PHP
php -S localhost:8000
```

3. Browser öffnen: `http://localhost:8000`

### Deployment

Die Website ist statisch und kann auf jedem Webserver gehostet werden:
- GitHub Pages
- Netlify
- Vercel
- Apache/Nginx
- AWS S3 + CloudFront

## 🔧 Konfiguration

### Anpassung der Demos

Demos können in `js/main.js` angepasst werden:

```javascript
// Neue Demo hinzufügen
getDemoContent(topic) {
    const content = {
        'new-demo': this.getNewDemoContent(),
        // ...
    };
    return content[topic];
}
```

### Styling anpassen

CSS-Variablen in `css/main.css` ermöglichen einfache Anpassungen:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #2c3e50;
    /* ... */
}
```

## ♿ Barrierefreiheit

Die Website implementiert WCAG 2.1 AA Standards:

- **Tastaturnavigation**: Vollständig ohne Maus bedienbar
- **Screen Reader**: ARIA-Labels und semantisches HTML
- **Kontraste**: Mindestens 4.5:1 Kontrastverhältnis
- **Focus Management**: Klare Fokus-Indikatoren
- **Alternative Texte**: Für alle grafischen Elemente

### Tastatur-Shortcuts

- `Tab` / `Shift+Tab`: Navigation zwischen interaktiven Elementen
- `Enter` / `Space`: Aktivierung von Buttons und Links
- `Escape`: Schließen von Modals
- `Pfeiltasten`: Navigation zwischen Topic-Cards

## 🔒 Sicherheit

- **Content Security Policy**: Schutz vor XSS-Angriffen
- **Keine externen Abhängigkeiten**: Reduziert Angriffsfläche
- **Client-side only**: Keine Server-Kommunikation erforderlich
- **Privacy-first**: Keine Tracking oder Analytics

## 📱 Browser-Unterstützung

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Safari**: iOS 12+
- **Chrome Mobile**: Android 60+

## 🤝 Beitrag leisten

Beiträge sind willkommen! Bitte beachten Sie:

1. Fork des Repositories
2. Feature-Branch erstellen
3. Änderungen commiten
4. Pull Request erstellen

### Development Guidelines

- **Code-Stil**: ESLint-Konfiguration beachten
- **Commits**: Aussagekräftige Commit-Messages
- **Testing**: Manuelle Tests in verschiedenen Browsern
- **Accessibility**: Barrierefreiheit bei neuen Features prüfen

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🙏 Danksagungen

- Icons von Unicode Emoji
- Inspiration von modernen Cybersecurity-Trainingsplattformen
- Community-Feedback für UX-Verbesserungen

## 📞 Support

Bei Fragen oder Problemen:
- GitHub Issues für Bug-Reports
- Discussions für Feature-Requests
- Wiki für ausführliche Dokumentation

---

**Viel Spaß beim Lernen über Cybersicherheit! 🔐**