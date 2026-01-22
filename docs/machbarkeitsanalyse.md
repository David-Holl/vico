# Machbarkeitsanalyse

## Technische Machbarkeit

### Youtube Data Fetching

Für die Umsetzung von Vico ist die zuverlässige Erfassung, Verarbeitung und Filterung von YouTube-Metadaten eine zentrale Voraussetzung. Entsprechend ist zunächst zu klären, über welche Schnittstellen die benötigten Informationen bezogen werden können und welche funktionalen Einschränkungen dabei bestehen.

Die primäre Datenquelle stellt die YouTube Data API v3 (REST) dar. Über diese API lassen sich sowohl Videos als auch Kanäle und Playlists suchen und abrufen. Insbesondere die `search`-Schnittstelle erlaubt die Abfrage anhand von Suchbegriffen sowie verschiedenen Filterkriterien. Relevante Parameter sind unter anderem:

- `type`, zur Einschränkung der Ergebnismenge auf Videos, Kanäle oder Playlists  
- `channelId`, um Suchanfragen gezielt auf einen einzelnen Kanal zu begrenzen  

Damit ist sowohl eine allgemeine Suche (z. B. nach Kanälen oder Videos) als auch eine kanalspezifische Abfrage technisch möglich. Diese Funktionalität bildet eine wesentliche Grundlage für die geplante Suche nach YouTube-Kanälen, Videos sowie öffentlich verfügbaren Vico-Collections und Kuratoren innerhalb einer gemeinsamen Suchoberfläche.

Neben der Data API existieren URL-basierte Atom- bzw. RSS-Feeds, über die sich neu veröffentlichte Videos eines Kanals abrufen lassen. Diese Schnittstellen gelten jedoch als *Legacy*-Lösungen, werden nicht mehr aktiv weiterentwickelt und sind nur eingeschränkt dokumentiert. Aufgrund dieser Rahmenbedingungen eignen sie sich höchstens als optionale Ergänzung, nicht jedoch als primäre oder zukunftssichere Datenquelle. 

Scraping von Daten ist generell verboten.

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

Für Vico bedeutet dies, dass bis zur einer API-Compliance-Prüfung (die beantragt werden muss) von einem festen Tageskontingent von 10.000 Einheiten auszugehen ist. Um dieses effizient zu nutzen, ist es erforderlich, API-Anfragen gezielt zu minimieren, Ergebnisse zwischenzuspeichern und auf wiederholte Suchanfragen gegen die YouTube API weitgehend zu verzichten.

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

#### Umgang mit YouTube-Daten und -Inhalten

Audiovisuelle Inhalte dürfen nicht für eine Offline-Wiedergabe verfügbar gemacht werden. Vico darf daher keine Videos herunterladen, importieren, sichern oder anderweitig speichern.

Ein weiterer zentraler Punkt ist, die Nutzung der YouTube API nicht in einer Weise einzusetzen, die Urheberrechtsverletzungen ermöglicht oder deren Verbreitung fördert. Da Vico Inhalte lediglich filtert und kuratiert, ist keine automatische Inhaltsprüfung vorgesehen. Dennoch sollte ein Mechanismus existieren, um potenziell problematische Collections zu melden und nachvollziehbar zu moderieren. Eine naheliegende Lösung ist eine Melde-Funktion, über die Collections markiert und für eine manuelle Prüfung in ein internes Review-/Ticketing-Verfahren überführt werden. Eine automatisierte Filterung von urheberrechtlich geschützten Inhalten (z. B. komplette Filme) ist dagegen nur eingeschränkt zuverlässig umsetzbar und birgt das Risiko, legitime Inhalte wie Parodien oder Memes fälschlich zu blockieren.

Da Vico aufgrund des begrenzten Tageskontingents YouTube-Metadaten (z. B. Titel, Beschreibung, Kanal- und Video-Details) in einer eigenen Datenbank zwischenspeichert, muss sichergestellt werden, dass nicht autorisierte API-Daten spätestens nach 30 Kalendertagen entweder aktualisiert oder gelöscht werden. Diese Einschränkung wirkt sich unmittelbar auf die Refresh-Strategie aus, da regelmäßige Aktualisierungen zusätzliche API-Anfragen verursachen und somit Kontingent verbrauchen.

Darüber hinaus dürfen API-Daten nicht zusammengefasst werden. Für Vico bedeutet dies, dass keine Funktionen vorgesehen sind, die über mehrere Kanäle hinweg aggregierte YouTube-Kennzahlen ausgeben, z. B. „Collection hat insgesamt 12.345.678 Views“ oder „Gesamtreichweite / Total Likes / Total Subscriber Reach“. Solange keine collectionweite Summierung oder vergleichbare Aggregation von Metriken oder Insights erfolgt, besteht kein Verstoss gegen die Richtlinie.

Die Richtlinien zur Nutzung autorisierter Daten (z. B. OAuth-basierte Zugriffe und schreibende Aktionen) sind für den aktuellen Projektstand nicht relevant, da Vico keine Funktionen implementiert, die im Auftrag eines Nutzers Aktionen auf YouTube ausführen oder autorisierte Nutzerdaten abrufen.

Beim Einbetten von Videos mit dem Status *Made for Kids (MFK)* müssen die Vorgaben aus dem entsprechenden Leitfaden berücksichtigt werden. Insbesondere ist sicherzustellen, dass Tracking deaktiviert ist und jegliche Datenerhebung im Zusammenhang mit dem eingebetteten Player den jeweils anwendbaren Gesetzen entspricht. Auch wenn Vico selbst kein Tracking implementiert, kann der eingebettete Player dennoch Daten an YouTube übertragen. Unter „anwendbare Gesetze“ fallen in diesem Kontext insbesondere die DSGVO sowie Cookie- und Tracking-Regelungen (TTDSG/ePrivacy) und – je nach Ausrichtung – ergänzende Vorgaben zum Jugend- und Kinderschutz.

---

#### Monitoring und Audits

YouTube behält sich das Recht vor, den Zugriff auf die YouTube API-Dienste sowie die Nutzung durch API-Clients zu untersuchen, zu überwachen und zu prüfen. Dazu kann YouTube unter anderem Nutzer von API-Clients befragen oder im Rahmen eines Audits Zugriff auf die produktive Version des API-Clients verlangen. Entsprechende Hinweise oder Compliance-Anfragen müssen berücksichtigt und innerhalb der vorgegebenen Fristen beantwortet werden. Bei ausbleibender Reaktion kann YouTube den Zugriff auf die API-Dienste einschränken oder deaktivieren.

---

#### Zusätzliche Verbote

YouTube untersagt die Nutzung der API-Dienste, um YouTube-Anwendungen nachzubauen, zu replizieren oder als Ersatz für die Plattform bereitzustellen. Für Vico ist daher sicherzustellen, dass die Anwendung nicht als alternative YouTube-Oberfläche ohne eigenständigen Mehrwert implementiert wird.

Vico ist im aktuellen Projektumfang als ergänzendes Kurations- und Filtersystem konzipiert. Der Fokus liegt auf der strukturierten Bündelung und thematischen Filterung von Inhalten über Collections. Funktionen, die YouTube als Plattform ersetzen oder zentrale Nutzerfunktionen nachbilden würden, sind nicht vorgesehen. Insbesondere werden keine Aktionen im Namen des Nutzers ausgeführt.




### Implementierung von YouTube-Funktionen

Vico ist verpflichtet, die Anforderungen an die Mindestfunktionalität für YouTube API-Dienste (Required Minimum Functionality, RMF) einzuhalten:
https://developers.google.com/youtube/terms/required-minimum-functionality

Diese Anforderungen definieren, in welcher Form YouTube-Inhalte dargestellt oder eingebettet werden dürfen und welche Einschränkungen unzulässig sind. Änderungen an diesen Anforderungen werden ebenfalls im Änderungsverlauf der Nutzungsbedingungen dokumentiert.


### Anforderungen an die Mindestfunktionalität

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


## Fazit zur technischen Umsetzbarkeit

Die Umsetzung von Vico ist technisch **grundsätzlich machbar**. Die Kernidee, YouTube-Inhalte über kanalbasierte Metadaten zu erfassen, lokal zu persistieren und anschließend regelbasiert zu filtern/kuratieren, lässt sich sauber mit der YouTube Data API v3 abbilden.

Die Machbarkeit hängt dabei weniger an „ob es geht“, sondern an klaren technischen Vorgaben:
- API-Kontingente effizient nutzen
- keine verbotenen Datenbeschaffungswege (Scraping)
- YouTube-Compliance einhalten
- Shorts-Erkennung aktuell nur mit Link-Parsing möglich
- Eine eigene Kategorie für "Shorts" ist im Endpunkt `videoCategories` vorhanden, diese ist jedoch aktuell nicht zuweisbar (`assignable=false`) und kann daher aktuell nicht zur Kategorisierung von Videos verwendet werden.



### Was sicher umsetzbar ist
Folgende Kernfunktionen sind ohne besondere Risiken realisierbar:

- Collections anlegen und verwalten (privat/öffentlich)
- Kanäle zu Collections hinzufügen
- Regelbasierte Filterung anhand Titel/Beschreibung und anderen Attributen
- Lokale, zeitlich limitierte, Speicherung von Kanal- und Video-Metadaten
- Suche in Vico primär über eigene Datenbank (nicht dauerhaft über die YouTube-Suche)
- Regelmäßige Aktualisierung bereits bekannter Kanäle über günstige API-Endpunkte

Damit entsteht ein eigenständiger Mehrwert (Kuration/Filter), ohne YouTube als Plattform „nachzubauen“.

### Einschränkungen

#### 1) Kontingent-Engpass bei der YouTube-Suche
Die API-Suche (`search.list`) ist sehr teuer und skaliert schlecht für "ständiges Stöbern". Die Konsequenz daraus ist, keine Suchfunktion ueber die Youtube Data API bereitstellen zu können, bis das taegliche Kontigentvolumen erhöht werden kann. 

#### 2) Compliance- und Datenhaltungsregeln erzwingen Refresh-Strategie
Wenn Metadaten zwischengespeichert werden, muss Vico daraus eine Refresh-/Expiry-Strategie ableiten.
Konsequenzen:
- Geplante Jobs (Scheduler) + definierte time-to-live von Metadaten
- Dokumentierte Datennutzung + saubere Trennung zwischen YouTube-Daten und Vico-eigenen Daten

#### 3) Ergebnis- und Paging-Limitierungen beim Abruf von Kanal-Videos
YouTube-API-Endpunkte liefern Videos nur **paginiert** und mit einer festen Obergrenze pro Request (max. 50 Einträge).  
Ein vollständiger Abruf aller Videos eines Kanals erfordert daher:
- Nutzung der kanalgebundenen *Uploads-Playlist* statt freier Suche
- Iteratives Paging über `nextPageToken`
- Abbruchkriterien (z. B. bekanntes ältestes Video erreicht), um unnötige Requests zu vermeiden


### Hauptrisiken
- Quota-Limits bei unkontrollierter Suchnutzung oder zu aggressiven Refresh-Zyklen
- Policy-Änderungen seitens YouTube -> erfordert Monitoring
- Bei öffentlichen Collections: Moderation/Meldewege nötig (inhaltlich/urheberrechtlich problematische Kuratierung)
- Der Abruf aller Kanal-Videos ist technisch möglich, aber nicht one-shot. Ingestion-Logik muss zustandsbehaftet sein (letzter Stand, letztes bekanntes Video) und inkrementell arbeiten, um Quota-Verbrauch und Laufzeit zu kontrollieren.
