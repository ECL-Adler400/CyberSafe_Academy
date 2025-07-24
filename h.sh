#!/bin/bash

### 🧠 Konfiguration ###
INTERVAL=60  # Sekunden zwischen Heartbeats
ENTITY="${1:-$HOME/code/main.py}"  # Pfad zur Datei, per Argument oder Standard
LOGFILE="$HOME/.fake_wakatime_heartbeats.csv"

### 🔍 Metadaten ableiten ###
BASENAME=$(basename "$ENTITY")
EXT="${BASENAME##*.}"
PROJECT=$(basename "$(dirname "$ENTITY")")
LANG=${EXT,,}  # lowercase

# Git-Projektname ermitteln, falls vorhanden
if git -C "$(dirname "$ENTITY")" rev-parse &>/dev/null; then
  PROJECT=$(basename "$(git -C "$(dirname "$ENTITY")" rev-parse --show-toplevel)")
fi

### 📋 CSV-Header setzen, wenn Datei neu ist ###
if [ ! -f "$LOGFILE" ]; then
  echo "timestamp,datetime,entity,project,language" >> "$LOGFILE"
fi

### 🕒 Zeit starten ###
START=$(date +%s)

### 🚀 Heartbeat-Loop ###
echo "🔧 Starte Fake-WakaTime für: $ENTITY"
echo "📁 Projekt: $PROJECT | 📝 Sprache: $LANG"
echo "📄 Logfile: $LOGFILE"
echo "⏱️  Intervall: $INTERVAL Sekunden"
echo "Drücke [STRG+C] zum Beenden und Statistik."

trap finish EXIT

function finish() {
  END=$(date +%s)
  DURATION=$((END - START))
  echo ""
  echo "✅ Session beendet."
  echo "⏰ Gesamtdauer: $(printf "%02dh:%02dm:%02ds\n" $((DURATION/3600)) $((DURATION%3600/60)) $((DURATION%60)))"
  echo "🔍 Log gespeichert unter: $LOGFILE"
}

while true; do
  NOW=$(date +%s)
  HUMAN=$(date "+%Y-%m-%d %H:%M:%S")

  echo "$NOW,$HUMAN,$ENTITY,$PROJECT,$LANG" >> "$LOGFILE"
  touch "$ENTITY"  # Datei-Zugriff simulieren
  echo "[$HUMAN] ➤ Heartbeat für $ENTITY"

  sleep "$INTERVAL"
done
