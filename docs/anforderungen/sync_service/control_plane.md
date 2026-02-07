# Control Plane Anforderungen

Das Control Plane ist für die steuernde Orchestrierung der Aktualisierung von Videoplattform-Metadaten verantwortlich.
Es liest und überwacht Aktualisierungs-Policies (Refresh-Regeln) und löst auf Basis dieser Policies gezielte Sync-/Refresh-Läufe aus.

Dabei:

- ruft es den passenden Source Connector (z. B. [[yt_connector]]) auf
- übergibt die Ergebnisse an das Data Plane zur weiteren Verarbeitung
- stellt sicher, dass Refresh-Läufe planbar, beobachtbar und quota-bewusst stattfinden.

## Funktionale Anforderungen

Das Control Plane stellt Funktionen bereit, die:

- Policy-Management anwenden
  - Policies und Scheduler-Einstellungen laden und zur Laufzeit anwenden
  - Änderungen an Policies ohne Neustart wirksam machen (Pull-basiert oder Subscribe/Watch)

- Refresh Orchestrierung
  - Refresh-Jobs planen (Zeitplan, TTL/Expiry, Prioritäten)
  - Refresh-Jobs auslösen und deren Status verwalten
  - Cleanup-Jobs planen und anstoßen (zur Einhaltung von Datenaktualität)

- Connector-Aufrufe kapseln
  - die sichtbaren Methoden des jeweiligen Connectors aufrufen

- Ergebnisse routen
  - Connector-Responses unverändert an das Data Plane weiterleiten
  - Tracing-IDs mitgeben (für Observability)

- Fehler- und Quota-Verhalten steuern
  - Connector-Fehler auswerten und klassifizieren (technisch vs. inhaltlich)
  - Orchestrierungsentscheidungen ableiten (Retry-Strategien, Backoff, Pausieren von Plattformen)
  - Status und Entscheidungen für Observability erfassen

---

Das Control Plane stellt keine Implementierungen bereit für:

- Datenmodellierung
- Transformation/Normalisierung
- Persistenz von Metadaten

## Schnittstellen

- Policy-/Scheduler-Konfiguration aus Config-Store/DB
- Trigger:
  - zeitbasiert (Scheduler)
  - eventbasiert (Policy-Änderung / manuelles Triggern / Admin-Aktion)
- Aufrufe an Source Connector
- Übergabe der Daten an Data Plane (inkl. technischer Fehlermeldungen zur inhaltlichen Auswertung)
- Status-/Metrik-Schnittstellen (read-only): Health, (Job-Status), Quota-Sicht (aggregiert aus Connector)

## Unterteilungen des Control Planes

### Policy Watcher

Überwacht die Policy-Konfigurationen in der Datenbank. Bei Änderungen an Intervallen oder Regeln berechnet der Watcher die betroffenen Ausführungszeiten der Jobs dynamisch neu, ohne dass ein Systemneustart erforderlich ist.

### Scheduler

Verantwortlich für die zeitliche Planung und Freigabe von Jobs. Er prüft vor der Aktivierung eines Jobs die verfügbaren Kontingente (Quota) in den API-Constraints. Nur bei ausreichendem Kontingent wird ein Job in den Status "running" versetzt und an den Executor übergeben. Er verwaltet zudem die Priorisierung (z.B. Backfilling kurz vor Quota-Reset).

### Executor

Führt den eigentlichen Aufruf des Connectors aus.

- Bei Erfolg: Weiterleitung der unveränderten JSON-Daten an das Data Plane.
- Bei technischen Fehlern (z.B. Timeout, Quota leer): Einleitung von Retry-Maßnahmen basierend auf der zugehörigen Policy .
- Bei inhaltlichen Fehlern (z.B. 404 Not Found): Weitergabe an das Data Plane zur semantischen Auswertung (z.B. Markierung als inaktiv).
- Quota-Sync: Erzwingt nach einer definierten Anzahl an Operationen (X-te Abfrage) oder bei kritischem Stand kurz vor Reset einen Abgleich mit dem tatsächlichen API-Kontostand über den Connector.
  
### Cache

Dient als gemeinsamer, Zwischenspeicher. Er entlastet die Datenbank, indem er flüchtige Informationen wie den aktuellen Quota-Stand oder kurzfristige Job-Status für das Control Plane und das Data Plane bereitstellt.
