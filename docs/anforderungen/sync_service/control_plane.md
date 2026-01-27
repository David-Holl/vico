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
  - Connector-Fehler auswerten und klassifizieren
  - Orchestrierungsentscheidungen ableiten
  - Status und Entscheidungen für Observability erfassen


---

Das Control Plane stellt keine Implementierungen bereit für:

- Datenmodellierung
- Interpretation/semantische Auswertung von API-Daten
- Transformation/Normalisierung
- Persistenz von Metadaten

## Schnittstellen 
- Policy-/Scheduler-Konfiguration aus Config-Store/DB
- Trigger:
  - zeitbasiert (Scheduler)
  - eventbasiert (Policy-Änderung / manuelles Triggern / Admin-Aktion)
- Aufrufe an Source Connector
- Übergabe der Daten an Data Plane
- Status-/Metrik-Schnittstellen (read-only): Health, (Job-Status), Quota-Sicht (aggregiert aus Connector)


