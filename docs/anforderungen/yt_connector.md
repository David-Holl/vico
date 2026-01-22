# Youtube Connector Anforderungen

Der YouTube Connector kapselt den Zugriff auf die Youtube Data API vollständig.  
Er stellt klar definierte Methoden bereit, über die externe Komponenten (z. B. der Ingestor) Daten abrufen können, ohne API-spezifische Details wie Endpunkte, Query-Parameter oder Paginierung selbst implementieren zu müssen.

Der Connector stellt Methoden bereit, die:

- API-Requests vollständig parametriert ausführen
- Responses unverändert zurückgeben
- ausschließlich Fehlerzustände (HTTP / API Errors) validieren und normalisieren

Der Connector übernimmt Interpretation, oder Transformation der Daten.

Zur zukünftigen Erweiterbarkeit (z. B. Vimeo) muss der Connector ein gemeinsames Interface implementieren, das plattformübergreifend konsistent ist.


## Funktionale Anforderungen

### API-Call-Abstraktion

- Jeder API-Endpunkt wird durch eine dedizierte Methode im Connector abgebildet
- Methoden kapseln:
  - Endpoint-URL
  - erforderliche und optionale Parameter
  - Pagination-Mechanismen
- Rückgaben erfolgen als:
  - rohe JSON-Responses (pro Request, und mit einer Pagination als Liste)
  - strukturierte Fehlerobjekte bei Fehlerfällen
- Der Connector führt keine Datenpersistenz durch


### Endpunkt: Video-Kategorien

Abruf der verfügbaren Video-Kategorien über den Endpoint  
[`videoCategories.list`](https://developers.google.com/youtube/v3/docs/videoCategories/list)

**Vorgaben:**
- `part=snippet`
- `regionCode=US` (nicht konfigurierbar)

Die feste Region `US` dient der Konsistenz innerhalb der eigenen Datenbank und verhindert regionalspezifische Abweichungen.

**Rückgabe:**
- vollständige API-Response als JSON
- keine Filterung oder Umstrukturierung

### Endpunkt: Video-Informationen

Abruf detaillierter Metadaten zu einem oder mehreren Videos über  
[`videos.list`](https://developers.google.com/youtube/v3/docs/videos/list)

**Identifikation:**
- per `videoId`

**Parameter:**
- `snippet`
- `contentDetails`
- `statistics`
- `status`

---

### Endpunkt: Channel-Informationen

Abruf von Channel-Metadaten über  
[`channels.list`](https://developers.google.com/youtube/v3/docs/channels/list)

**Identifikation:**
- per `channelId`
- per YouTube-Username

**Parameter:**
- `snippet`
- `contentDetails`
- `topicDetails`

Der Connector stellt sicher, dass genau **eine** Identifikationsform pro Request verwendet wird.

---

### Endpunkt: Hochgeladene Videos eines Channels (Playlist)

Abruf aller hochgeladenen Videos eines Channels über  
[`playlistItems.list`](https://developers.google.com/youtube/v3/docs/playlistItems/list)

**Parameter:**
- `contentDetails`
- `snippet`
- `id`
- `status`
- `maxResults=50` (50=cap)

**Pagination:**
- Falls weitere Seiten vorhanden sind, muss der Connector:
  - mit `pageToken` weitere Requests ausführen
  - alle Seiten als als eigenes JSON-Objekt (Liste) zurückgeben

---

### Nicht-Ziele des Connectors

- keine Datenmodellierung
- keine Normalisierung
- keine Persistenz

Der Connector ist bewusst als schlanke, robuste API-Abstraktionsschicht konzipiert.


### Implementierung und Umsetzung

Der Connector läuft in-process in derselben Runtime wie der Ingestor.
Er kapselt die YouTube Data API vollständig und führt Requests ausschließlich mit gültigen API-Credentials aus.

Alle API-Call-Methoden des Connectors sind asynchron implementiert, da es sich um I/O-gebundene Operationen handelt.

**Konfiguration und Secrets**
- API-Credentials, Timeouts, Retry-Policy und weitere Connector-Settings werden zentral verwaltet und zur Laufzeit geladen.
- Secrets werden **nicht im Code oder in Konfigurationsdateien im Repo** gespeichert.
- Die Ablage erfolgt in einem abgesicherten Config-Store.

**Quota- und Kostenverantwortung**
- Der Connector ist die einzige Komponente, die API-Credentials kennt und damit Quota-/Kostenaspekte bei API-Aufrufen berücksichtigen kann.
- Der Connector stellt zusätzlich eine Methode bereit, um den aktuellen Quota-Status (verbleibendes Kontingent und ggf. Reset-/Zeitraum-Informationen) für das Projekt bereitzustellen und an aufrufende Komponenten weiterzugeben.
- Der Connector führt zur Laufzeit ein API-Usage-/Kostenprotokoll über alle ausgeführten Requests (Endpoint, relevante Parameter/Parts, Kontigentkosten, Timestamp, Ergebnisstatus) und kann diese Daten in strukturierter Form an externe Komponenten zur Metrik- und Kostenanalyse weitergeben.
- Um Auswertungen auch bei Abstürzen oder Restarts zu ermöglichen, muss das Usageprotocol optional persistent in einem robusten Log-Store abgelegt werden. Nach erfolgreichem Export/Verarbeitung durch eine externe Komponente kann der Connector das Log über eine dedizierte Methode bestätigen und bereinigen, sodass keine Doppelzählung entsteht.

