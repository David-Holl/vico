# Anforderungen an Vico und dessen Systeme (WIP)

Basierend auf der technischen [[machbarkeitsanalyse]] und den gelisteten Features bei der Projekt-[[initialisierung]] sind Anforderungen der Systeme aufgelistet. Um die Anwendung moeglichst modular zu gestalten um damit experimentieren zu koennen, ist Vico in verschiedene Systeme aufgeteilt, die austauschbar entwickelt werden. 

## Ingestion / Sync Service

Aufgabe: Holt Daten über APIs, normalisiert, schreibt in Storage

Anforderungen:
- [[sync_service/yt_connector]]
- [[sync_service/control_plane]]

## Data Storage

Aufgabe: Persistieren von Metadaten, Nutzerinformationen, Collections und Ingestion Policies
Anforderungen:


## Backend API

Aufgabe: Business-Logik, Authentifizierung
Anforderungen:

## Web App 

Aufgabe: Backend API anfragen, Webseiten ausliefern, darstellung der Webseite
Anforderungen:

## DevOps

Aufgabe: CI/CD, Plattform, Logging, Metrics, as usual ..., benachrichtigung bei API compliance changes, auswerten von gemeldeten collections/website feedback(!)
Anforderungen: