# AirMic website

Statische Seite: https://unbox-digital-printing.github.io/airmic/

Fester Windows-Einstieg für den späteren APK-Link:
https://unbox-digital-printing.github.io/airmic/download/windows/

Android: https://unbox-digital-printing.github.io/airmic/download/android/

Die Einstiegseiten enthalten einen Downloadbutton und Installationshinweise. Windows bietet primär `downloads/AirMic-Setup.exe`, alternativ `downloads/AirMic-Windows.zip`. Android: `downloads/AirMic.apk`. Beim Update Dateinamen beibehalten, release.json und downloads/SHA256SUMS.txt aktualisieren.

## Spenden
In support.json HTTPS-Adressen für paypal und/oder buyMeACoffee hinterlegen. Ohne gültige Adresse bleiben die Buttons deaktiviert. Nur offizielle PayPal- und Buy-Me-a-Coffee-Domains werden akzeptiert. Keine eingebetteten Zahlungswidgets.

## Voraussetzungen
Windows 0.3, Paketrevision 3: .NET 8.0.33 Desktop Runtime x64 und unverändertes Standard-VB-CABLE-Paket (Pack 46) enthalten. Setup installiert AirMic mit Administratorrechten für alle Benutzer unter `C:\Program Files\AirMic` und bietet den Original-VB-Audio-Installer als eigenen Schritt mit Administratorabfrage an, wenn der Treiber fehlt. Vorhandene Treiber werden nicht automatisch neu installiert. Nach neuer Treiberinstallation Windows neu starten. Im Silent-Modus wird der Treiber nicht ausgeführt. Deinstallation von AirMic entfernt keinen gemeinsam verwendeten Treiber. Die AirMic-Setup-EXE ist nicht digital signiert; Herstellerdateien behalten ihre Originalsignatur.

VB-CABLE ist Donationware von VB-Audio (Vincent Burel). Herkunft und Unterstützung: https://vb-audio.com/Cable/ und https://www.vb-cable.com/. Lizenzbedingungen: https://vb-audio.com/Services/licensing.htm. In bestimmten professionellen Verteilungsszenarien verlangt VB-Audio passende Lizenzen. Unterstützung für VB-Audio ist unabhängig von AirMic-Spenden. Keine zusätzlichen Kabel A+B/C+D enthalten.

Android unverändert: Version 0.3, Android 8+, Paket com.unbox_digital_print.airmic.

Keine externen Schriften, Analytics, Mikrofonzugriffe oder Build-Abhängigkeiten. Animation ist eine Demo. Vorhandene Video- und Google-Verifikationsdateien bleiben erhalten.

## Sprachen

Deutsch, Englisch, Französisch und Spanisch sind für Startseite, FAQs, Einrichtung, Download-Einstiege, Datenschutzerklärung und Impressum verfügbar. Texte stehen in `translations.js`, die Sprachwahl in `i18n.js`. Reihenfolge: `?lang=`, manuell gespeicherte Auswahl (`airmic-site-language`), unterstützte Browsersprache, Englisch. Links zu HTML-Unterseiten übernehmen die gewählte Sprache. Downloads bleiben unverändert.

Setup und neuer Deinstaller bieten bei laufendem AirMic direktes Schließen, erneutes Prüfen oder Abbrechen an. Erzwungenes Beenden erfordert eine separate Bestätigung. Alte AppData-Installationen werden nicht automatisch verschoben oder gelöscht.
