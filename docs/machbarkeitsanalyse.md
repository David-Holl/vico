# Machbarkeitsanalyse

## Technische Machbarkeit

### Youtube Data Fetching

Für die Umsetzung von Vico ist die zuverlässige Erfassung, Verarbeitung und Filterung von YouTube-Metadaten eine zentrale Voraussetzung. Entsprechend ist zunächst zu klären, über welche Schnittstellen die benötigten Informationen bezogen werden können und welche funktionalen Einschränkungen dabei bestehen.

Die primäre Datenquelle stellt die YouTube Data API v3 (REST) dar. Über diese API lassen sich sowohl Videos als auch Kanäle und Playlists suchen und abrufen. Insbesondere die `search`-Schnittstelle erlaubt die Abfrage anhand von Suchbegriffen sowie verschiedenen Filterkriterien. Relevante Parameter sind unter anderem:

- `type`, zur Einschränkung der Ergebnismenge auf Videos, Kanäle oder Playlists  
- `channelId`, um Suchanfragen gezielt auf einen einzelnen Kanal zu begrenzen  

Damit ist sowohl eine allgemeine Suche (z. B. nach Kanälen oder Videos) als auch eine kanalspezifische Abfrage technisch möglich. Diese Funktionalität bildet eine wesentliche Grundlage für die geplante Suche nach YouTube-Kanälen, Videos sowie öffentlich verfügbaren Vico-Collections und Kuratoren innerhalb einer gemeinsamen Suchoberfläche.

Neben der Data API existieren URL-basierte Atom- bzw. RSS-Feeds, über die sich neu veröffentlichte Videos eines Kanals abrufen lassen. Diese Schnittstellen gelten jedoch als *Legacy*-Lösungen, werden nicht mehr aktiv weiterentwickelt und sind nur eingeschränkt dokumentiert. Aufgrund dieser Rahmenbedingungen eignen sie sich höchstens als optionale Ergänzung, nicht jedoch als primäre oder zukunftssichere Datenquelle.

Eine funktionale Einschränkung der YouTube Data API besteht darin, dass keine explizite Filtermöglichkeit für YouTube Shorts angeboten wird. Über den Parameter `type` kann lediglich zwischen Videos, Kanälen und Playlists unterschieden werden. Eine differenzierte Trennung zwischen regulären Videos und Shorts ist nicht vorhanden.

Um dennoch eine Filterung von Shorts zu ermöglichen, ist eine zusätzliche, anwendungsspezifische Klassifikationslogik erforderlich. Ein praktikabler Ansatz besteht darin, die URL-Struktur der Videos auszuwerten. YouTube Shorts verwenden typischerweise folgendes Format:


`https://www.youtube.com/shorts/<video_id>`

Reguläre Videos sind hingegen in der Regel unter folgender Struktur erreichbar:

`https://www.youtube.com/watch?v=<video_id>`


Auf Basis dieser Unterschiede kann eine eigene Kategorisierungslogik implementiert werden, die Shorts identifiziert und entsprechend berücksichtigt oder ausgeschlossen werden kann. Die technische Machbarkeit dieser Lösung ist gegeben, erfordert jedoch eine saubere Kapselung der Logik, um auf mögliche Änderungen seitens der Plattform reagieren zu können.

Zusammenfassend ist festzuhalten, dass die für Vico benötigten Kernfunktionen – Suche, Kanalbindung und regelmäßige Aktualisierung von Inhalten – mit den vorhandenen YouTube-Schnittstellen grundsätzlich umsetzbar sind. Einzelne funktionale Lücken, insbesondere im Bereich der Videoformat differenzierung (z. B. Shorts), müssen durch eigene, klar abgegrenzte Zusatzlogik geschlossen werden.

### Kontingente

Die YouTube Data API verwendet ein kontingentbasiertes Abrechnungsmodell. Für jedes Projekt, in dem die YouTube Data API aktiviert ist, stehen standardmäßig 10.000 Kontingenteinheiten pro Tag zur Verfügung. Das Tageskontingent wird täglich um Mitternacht (Pacific Time, PT) zurückgesetzt.

Jede API-Methode verursacht abhängig von ihrer Funktion unterschiedlich hohe Kontingentkosten. Eine Erhöhung des Kontingents kann beantragt werden, setzt jedoch unter anderem eine erfolgreiche YouTube-API-Compliance-Prüfung innerhalb der letzten 12 Monate sowie die Einreichung eines *Audited Developer Request Form* voraus. Für den aktuellen Projektstand ist daher von dem Standardkontingent auszugehen.

Besonders kostenintensiv ist die Suche nach Kanälen oder Videos über die Methode `search.list`, die mit 100 Einheiten pro Anfrage berechnet wird. Bei paginierten Ergebnissen fallen diese Kosten für jede weitere Seite erneut an. Damit wäre das Tageskontingent bereits bei etwa 100 Suchanfragen ausgeschöpft.

Demgegenüber sind API-Zugriffe zur strukturierten Abfrage bekannter Ressourcen vergleichsweise günstig. Der Abruf von Kanalinformationen über `channels.list` verursacht Kosten von einer Einheit und ermöglicht unter anderem den Zugriff auf die Uploads-Playlist eines Kanals. Der Abruf von Video-Metadaten über `videos.list` ist ebenfalls mit einer Einheit bepreist und erlaubt die Abfrage mehrerer Videos innerhalb eines einzelnen Requests. Auch das Auslesen von Videokategorien über `videoCategories.list` ist mit einer Einheit pro Anfrage kostengünstig umsetzbar.

Schreibende API-Operationen, wie etwa das API-basierte Abonnieren von Kanälen (`subscriptions.insert`), verursachen Kosten von 50 Einheiten pro Aktion und sind zusätzlich mit erhöhtem Compliance- und OAuth-Aufwand verbunden. Solche Funktionen sind für den aktuellen Projektumfang von Vico nicht vorgesehen.

Für Vico bedeutet dies, dass innerhalb der nächsten 12 Monate von einem festen Tageskontingent von 10.000 Einheiten auszugehen ist. Um dieses effizient zu nutzen, ist es erforderlich, API-Anfragen gezielt zu minimieren, Ergebnisse zwischenzuspeichern und auf wiederholte Suchanfragen gegen die YouTube API weitgehend zu verzichten.

Insbesondere sollte die Suchfunktion der YouTube Data API nicht als primärer Mechanismus für wiederholte Abfragen eingesetzt werden. Stattdessen ist vorgesehen, bekannte Kanäle und zugehörige Metadaten lokal zu persistieren und Abfragen – soweit möglich – auf Basis der eigenen Datenbank durchzuführen. Die YouTube API dient dabei primär zur initialen Erfassung neuer Quellen sowie zur regelmäßigen Aktualisierung bereits bekannter Inhalte.

## YouTube API Compliance

Die Nutzung der YouTube Data API unterliegt den YouTube API-Diensten-Richtlinien und Nutzungsbedingungen. Für Vico ist insbesondere relevant, welche Anforderungen für API-Clients gelten, die YouTube-Inhalte lesen, darstellen oder einbetten, ohne aktive Nutzeraktionen im Namen des Nutzers auszuführen.

Grundlage sind die allgemeinen Entwickler-Richtlinien sowie die spezifischen Anforderungen an die Mindestfunktionalität von YouTube API-Clients:
https://developers.google.com/youtube/terms/developer-policies-guide

### Entwicklerbezogene Anforderungen

https://developers.google.com/youtube/terms/developer-policies

#### Nutzungsbedingungen und Datenschutzerklärungen

Die YouTube-Richtlinien sehen vor, dass API-Clients auf die YouTube-Nutzungsbedingungen verweisen und Nutzer über relevante Datenschutzerklärungen informieren.  
Vico agiert jedoch nicht als direkter API-Client auf Nutzerebene, sondern als vermittelnder Layer zwischen der YouTube Data API und der Anwendung.

Da Endnutzer nicht unmittelbar mit der YouTube API interagieren und keine API-Aktionen im Namen des Nutzers ausgeführt werden, ist die konkrete Ausgestaltung dieser Informationspflichten gesondert zu bewerten. Für den aktuellen Projektstand ist davon auszugehen, dass ein transparenter Hinweis auf die Nutzung von YouTube-Inhalten sowie eine Verlinkung der YouTube-Nutzungsbedingungen ausreichend ist.

Eine detaillierte rechtliche Bewertung wird für den Fall erforderlich, dass zukünftig interaktive YouTube-Funktionen integriert werden.

---

#### Wartbarkeit und Änderbarkeit der API

API-Clients müssen mit Änderungen an den YouTube API-Diensten kompatibel bleiben. YouTube behält sich vor, funktionale oder abwärtsinkompatible Änderungen an der Data API vorzunehmen.

Entsprechende Änderungen werden dokumentiert:
- im Änderungsverlauf der Nutzungsbedingungen  
  https://developers.google.com/youtube/terms/revision-history
- sowie über einen offiziellen RSS-Feed  
  https://developers.google.com/static/youtube/terms/feeds/api-services-terms-of-service-revision-history.xml

Für Vico ist daher sicherzustellen, dass:
- Änderungen an der YouTube Data API beobachtet werden,
- API-Integrationen versionierbar und anpassbar bleiben,
- keine harte Kopplung an instabile oder nicht dokumentierte API-Details entsteht.

Dieser Aspekt ist insbesondere für die langfristige Wartbarkeit relevant, stellt jedoch kein grundlegendes Hindernis für die initiale Umsetzung dar.

---

### Implementierung von YouTube-Funktionen

Vico ist verpflichtet, die Anforderungen an die Mindestfunktionalität für YouTube API-Dienste (Required Minimum Functionality, RMF) einzuhalten:
https://developers.google.com/youtube/terms/required-minimum-functionality

Diese Anforderungen definieren, in welcher Form YouTube-Inhalte dargestellt oder eingebettet werden dürfen und welche Einschränkungen unzulässig sind. Änderungen an diesen Anforderungen werden ebenfalls im Änderungsverlauf der Nutzungsbedingungen dokumentiert.


#### Anforderungen an die Mindestfunktionalität

Sofern der YouTube-Player in Vico eingebettet wird, müssen die für die Wiedergabe von Videos definierten Regeln eingehalten werden, insbesondere in Bezug auf:
- korrekte Identifikation des API-Clients (z. B. über HTTP-Referer),
- Einschränkungen bei automatischer Wiedergabe,
- unveränderte Darstellung des YouTube-Players,
- Mindestgröße des eingebetteten Players.

Diese Anforderungen gelten ausschließlich für die Einbettung und Wiedergabe von Videos.

Für den aktuellen Projektstand ist vorgesehen, Vico ausschließlich als lesendes und filterndes System zu betreiben. Es werden keine Aktionen im Namen des Nutzers auf YouTube ausgeführt, wie etwa:
- das Abonnieren von Kanälen über die API,
- das Erstellen, Bearbeiten oder Moderieren von Kommentaren,
- Uploads oder Live-Interaktionen.

Durch diese bewusste funktionale Einschränkung entfällt der Großteil der streng regulierten YouTube-API-Anforderungen. Die verbleibenden Vorgaben sind technisch umsetzbar und stellen zum jetzigen Zeitpunkt kein Risiko für die Machbarkeit des Projekts dar.


