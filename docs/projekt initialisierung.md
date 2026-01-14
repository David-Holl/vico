# Vico

## Ausgangspunkt

YouTube ist eine Videoplattform, auf der nutzergenerierte Inhalte veröffentlicht werden. Sogenannte *Creators* laden Videos hoch, die von anderen Nutzern angesehen, bewertet und kommentiert werden können. Neben einer Suchfunktion – etwa für Tutorials oder Anleitungen – bietet die Plattform die Möglichkeit, Kanäle zu abonnieren. Abonnenten werden über neue Veröffentlichungen eines Kanals informiert.

Darüber hinaus empfiehlt YouTube Inhalte algorithmisch auf Basis des individuellen Nutzerverhaltens, beispielsweise anhand der Suchhistorie oder zuvor angesehener und kommentierter Videos. Ziel von Youtube ist es, die Verweildauer zu erhöhen und relevante Inhalte vorzuschlagen.

## Problemstellung

Beim Abonnieren eines Kanals erhalten Nutzer grundsätzlich Benachrichtigungen über *alle* neu veröffentlichten Inhalte dieses Kanals. Eine inhaltliche Filterung ist dabei nicht vorgesehen. Dies führt insbesondere bei thematisch breit aufgestellten Kanälen dazu, dass Nutzer regelmäßig Benachrichtigungen zu Inhalten erhalten, die für sie nicht relevant sind.

Ein typisches Szenario ist ein IT-orientierter Kanal, der sowohl Tutorials, Produktneuheiten, Branchennachrichten als auch Sicherheitswarnungen veröffentlicht. Ein Nutzer kann den Kanal aufgrund der Qualität einzelner Inhalte schätzen, hat jedoch kein Interesse an allen Formaten oder Kategorien. Dennoch erhält er für jede Veröffentlichung eine Benachrichtigung.

Zusätzlich existieren auf YouTube sogenannte *Shorts* – kurze Videos, häufig unter 30 Sekunden –, die als eigene Kategorie behandelt werden. Diese lassen sich derzeit nicht separat von regulären Abonnement-Benachrichtigungen ausschließen. Auch wenn dies bei wenigen abonnierten Kanälen noch überschaubar ist, entsteht bei einer größeren Anzahl von Abos schnell eine unübersichtliche Informationsflut.

Da das Geschäftsmodell von Google bzw. Alphabet Inc. maßgeblich auf Werbeeinnahmen und hohen Abrufzahlen basiert, ist davon auszugehen, dass eine fein granular konfigurierbare Filter- oder Kurationsfunktion seitens der Plattform selbst kurzfristig nicht priorisiert wird.

## Lösung

Vico (*Video Collections*) adressiert diese Problematik als eigenständige Webanwendung zur strukturierten Filterung und Kuratierung von Videoinhalten. Nutzer können themenspezifische Collections erstellen, definieren und verwalten. Jede Collection bündelt Inhalte aus einem oder mehreren YouTube-Kanälen und wird anhand frei definierbarer Kriterien gefiltert.

Collections basieren auf Schlüsselbegriffen, Metadaten sowie optionalen Ausschlussregeln. Dabei kann festgelegt werden, ob bestimmte Videoformate (z. B. Shorts), Themen oder Inhaltstypen berücksichtigt werden sollen. Collections können privat genutzt oder öffentlich kuratiert werden.

Beim Konsum von Inhalten greifen Nutzer nicht mehr auf einzelne Kanal-Abonnements zurück, sondern auf ihre thematisch fokussierten Collections. Diese werden automatisch aktualisiert und können optional Benachrichtigungen auslösen.

## Ziel

Ziel ist die Entwicklung einer eigenständigen Webanwendung mit folgenden Kernfunktionen:

- Erstellen und Verwalten von Collections zum Bündeln mehrerer YouTube-Kanäle  
- Hinzufügen eines oder mehrerer Kanäle zu einer Collection  
- Filterung von Videos anhand von Titel und Beschreibung auf Kanal- oder Collection-Ebene  
- Konfiguration der Sichtbarkeit von Collections (privat oder öffentlich)  
- Abonnieren öffentlicher Collections anderer Kuratoren, optional mit Benachrichtigungen  
- Nutzer-Authentifizierung und Benutzerverwaltung  
- Persistenz von Nutzerinformationen sowie erstellten und abonnierten Collections  
- Interaktionsfunktionen wie Feedback, Likes und Dislikes für Collections  
- Feedback-Bereich für veröffentlichte Collections  
- Suchfunktion für Collections und Kuratoren  

Nicht Ziel dieses Projekts ist:

- Die Entwicklung eines Empfehlungsalgorithmus zur automatischen Content-Vorschlagserstellung  
- Der Aufbau einer neuen sozialen Medienplattform  

## Zielgruppe

Vico richtet sich an Nutzer mit einer großen Anzahl von Kanal-Abonnements, die Inhalte bewusster, zielgerichteter und zeiteffizient konsumieren möchten. Der Fokus liegt auf thematischer Relevanz, Transparenz und individueller Kontrolle über den eigenen Videokonsum.
