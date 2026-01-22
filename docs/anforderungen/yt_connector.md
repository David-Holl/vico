# Youtube Connector Anforderungen

Der YouTube Connector kapselt den Zugriff auf die Youtube Data API vollständig.  
Er stellt klar definierte Methoden bereit, über die externe Komponenten (z. B. der Ingestor) Daten abrufen können, ohne API-spezifische Details wie Endpunkte, Query-Parameter oder Paginierung selbst implementieren zu müssen.

Der Connector stellt Methoden bereit, die:

- API-Requests vollständig parametriert ausführen
- API-Responses unverändert zurückgeben  
  - Ausnahme: Endpunkte mit limitierten Ergebnissen liefern aggregierte Resultate in Listenform
- Fehlerzustände (HTTP-Fehler, API-spezifische Errors) unverändert weiterreichen
- durch den Connector verursachte API-Kosten und Request-Zählungen protokollieren und verfügbar machen
- den aktuellen Status der verbleibenden API-Quota-Einheiten abfragen und an aufrufende Komponenten weitergeben

Der Connector stellt keine Implementierungen bereit für:

- Datenmodellierung
- Interpretation oder semantische Auswertung von API-Daten
- Transformation oder Normalisierung von Daten
- Persistenz von Daten aus der API

Der Connector ist bewusst als schlanke, robuste API-Abstraktionsschicht konzipiert.  
Bei einer separaten Bereitstellung der Implementierung sowie bei horizontaler Skalierung ist er lose gekoppelt ausgelegt und offen für unabhängige Weiterentwicklung.


## Funktionale Anforderungen

Zur zukünftigen Erweiterbarkeit (z. B. Vimeo) muss der Connector ein gemeinsames Interface implementieren, das plattformübergreifend konsistent ist.

### API-Call-Abstraktion

- Jeder API-Endpunkt wird durch eine dedizierte Methode im Connector abgebildet
- Die Methoden kapseln:
  - die jeweilige Endpoint-URL
  - erforderliche und optionale Request-Parameter
  - den Pagination-Mechanismus der YouTube Data API
- Rückgaben erfolgen als:
  - rohe JSON-Responses
  - aggregierte JSON-Listen bei Endpunkten mit limitierter Ergebnisanzahl pro Request

---

### Endpunkt: Video-Kategorien

Abruf der verfügbaren Video-Kategorien über den Endpoint  
[`videoCategories.list`](https://developers.google.com/youtube/v3/docs/videoCategories/list)

**Standard Parameter:**
- `part=snippet`
- `regionCode=US` (nicht konfigurierbar)

Die feste Region `US` dient der Konsistenz innerhalb der eigenen Datenbank und verhindert regionalspezifische Abweichungen.


### Endpunkt: Video-Informationen

Abruf detaillierter Metadaten zu einem oder mehreren Videos über  
[`videos.list`](https://developers.google.com/youtube/v3/docs/videos/list)

**Identifikation:**
- `videoId` Attribut
- Comma seperated list von `videoId`

**Standard Parameter:**
- `part=snippet, contentDetails, statistics, status`

**Optional (Comma seperated list von `videoId`)**
- `maxResults=50`
- `pageToken`

**Pagination:**
- Falls weitere Seiten vorhanden sind, muss der Connector:
  - mit `pageToken` weitere Requests ausführen
  - alle Seiten als als eigenes JSON-Objekt (Liste) zurückgeben

---

### Endpunkt: Channel-Informationen

Abruf von Channel-Metadaten über  
[`channels.list`](https://developers.google.com/youtube/v3/docs/channels/list)

**Identifikation:**
- per `channelId`
- per YouTube-Username (zb. `@ThePrimeTimeagen` und *nicht* der Kanalname `The PrimeTime`)

**Standard Parameter:**
- `part=snippet, contentDetails, topicDetails`

---

### Endpunkt: Hochgeladene Videos eines Channels (Playlist)

Abruf aller hochgeladenen Videos eines Channels über  
[`playlistItems.list`](https://developers.google.com/youtube/v3/docs/playlistItems/list)

**Standard Parameter:**
- `part=contentDetails, snippet, id, status`
- `maxResults=50` (API-Limit)

**Pagination:**
- Falls weitere Seiten vorhanden sind, muss der Connector:
  - mit `pageToken` weitere Requests ausführen
  - alle Seiten als als eigenes JSON-Objekt (Liste) zurückgeben

---


### Implementierung und Umsetzung

Der Connector läuft in-process in derselben Runtime wie der Ingestor.
Er kapselt die YouTube Data API vollständig und führt Requests ausschließlich mit gültigen API-Credentials aus.

Alle API-Call-Methoden des Connectors sind asynchron implementiert, da es sich um I/O-gebundene Operationen handelt.

**Konfiguration und Secrets**
- API-Credentials, Timeouts, Retry-Policy und weitere Connector-Settings werden zentral verwaltet und zur Laufzeit geladen.
- Die Ablage erfolgt in einem abgesicherten Config-Store.
- Secrets werden **nicht im Code oder in Konfigurationsdateien im Repo** gespeichert.


**Quota- und Kostenverantwortung**
- Der Connector ist die einzige Komponente, die API-Credentials kennt und damit Quota-/Kostenaspekte bei API-Aufrufen berücksichtigen kann.
- Der Connector stellt zusätzlich eine Methode bereit, um den aktuellen Quota-Status (verbleibendes Kontingent und ggf. Reset-/Zeitraum-Informationen) für das Projekt bereitzustellen und an aufrufende Komponenten weiterzugeben.
- Der Connector führt zur Laufzeit ein Kostenprotokoll über alle ausgeführten Requests (Endpoint, relevante Parameter, Kontigentkosten, Timestamp, Ergebnisstatus) und kann diese Daten in strukturierter Form an externe Komponenten zur Metrik- und Analyse weitergeben.
- Um Auswertungen auch bei Abstürzen oder Restarts zu ermöglichen, muss das Usageprotocol persistent in einem robusten Log-Store abgelegt werden. Nach erfolgreichem Export/Verarbeitung durch eine externe Komponente kann der Connector das Log über eine dedizierte Methode bestätigen und bereinigen, sodass keine Doppelzählung entsteht.

### Testing

Google stellt für die YouTube Data API keine dedizierte Sandbox- oder Test-API bereit, die ohne Quota-Verbrauch genutzt werden kann. Für Tests ist daher ein separates Google-Cloud-Projekt zu verwenden, um die Quota der Live-Umgebung nicht zu belasten.

Die Standard-Quota beträgt auch im Test-Projekt 10.000 Units pro 24 Stunden und ist projektgebunden.

Für die folgenden GET-Methoden fällt jeweils 1 Unit pro Request an:
- `playlistItems.list`
- `channels.list`
- `videos.list`
- `videoCategories.list`

Pagination: Jede weitere Seite wird über einen zusätzlichen API-Request (z. B. via `pageToken`) abgefragt und verbraucht entsprechend erneut 1 Unit pro Seite.

Bei der Veröffentlichung von Testprotokollen, die Metadaten aus der YouTube Data API enthalten, müssen diese gemäß den YouTube-Compliance-Anforderungen eindeutig als "historisch" gekennzeichnet werden. Damit wird sicherheitshalber klargestellt, dass es sich um einen zeitpunktbezogenen Datenstand handelt und nicht um aktuelle, dynamisch aktualisierte Inhalte.

Für Tests ist ein dedizierter Test-Account erforderlich, auf dem speziell vorbereitete Inhalte (hochgeladene, nicht urheberrechtlich geschuetzte Testvideos) liegen. Dadurch können API-Aufrufe reproduzierbar durchgeführt werden, ohne produktive Kanäle oder echte Nutzerdaten zu beeinflussen.

