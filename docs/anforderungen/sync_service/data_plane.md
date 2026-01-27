# Data Plane Anforderungen

Das Data Plane ist für die verarbeitende Datenpipeline verantwortlich.
Es nimmt vom Control Plane geroutete Connector-Responses entgegen und führt diese in validierte, normalisierte und persistierte Daten über.

Dabei:
- normalisiert es plattformspezifische API-Responses in ein internes Datenformat
- validiert Daten vor der Persistenz
- transformiert JSON-Payloads in persistierbare Modelle
- führt Persistenzoperationen aus
- meldet Verarbeitungsstatus und Fehler an das Control Plane zurück



## Funktionale Anforderungen

Das Data Plane stellt Funktionen bereit, die:

- Payloads vom Control Plane annehmen

- Normalisierung durchführen
  - unterschiedliche Response-Strukturen in ein internes, konsistentes Schema überführen
  - Feldmapping und Defaulting definieren
  - plattform-/endpoint-spezifische Unterschiede kapseln, sodass das Modell stabil bleibt

- Validierung durchführen
  - syntaktische Validierung (zb. Pflichtfelder)
  - semantische Validierung (Domäneninvarianten)
  - Ergebnis so klassifizieren, dass das Control Plane entscheiden kann:
    - retryable
    - non-retryable (dauerhaft ungültige Daten)

- Transformation und Persistenz ausführen
  - Normalform -> persistierbare Modelle (ORM)
  - Schreibvorgaenge transaktional durchführen
  - Konflikte/Constraints sauber behandeln und in Fehlerklassifikation übersetzen

- Datenaktualität und Bereinigung umsetzen
  - Löschregeln anwenden
  - Cleanup-Resultate strukturiert zurückmelden

- Resultate an das Control Plane zurückgeben
  - Status pro Verarbeitungseinheit (success/failed)
  - strukturierte Fehler (Kategorie, retryable, technische Details, betroffene Entitäten/IDs)


## Das Data Plane stellt keine Implementierungen bereit für:

- Policy-Management, Scheduling oder Job-Planung
- API-Aufrufe, Pagination oder Quota-/Kosten-Tracking
- fachliche Produktfeatures wie Suche oder Benachrichtigungen


## Schnittstellen

- Input:
  - Requests vom Control Plane (Einzelpayload oder Batch)
  - Kontextdaten: trace_id, ...

- Output:
  - Verarbeitungsresultat an das Control Plane (status + Fehlerklassifikation)
  - Persistenzoperationen in den Storage-Layer
  - Cleanup-Resultate an das Control Plane


## Fehlerverhalten

- Validierungsfehler:
  - keine Persistenz
  - Rückmeldung an Control Plane inkl. retryable/non-retryable

- Persistenzfehler:
  - Transaktion rollback
  - Rückmeldung an Control Plane inkl. retryable/non-retryable
