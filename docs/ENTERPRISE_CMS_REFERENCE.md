# NEXUM CMS Enterprise Reference

> Arbeitsdokument fuer Produktvision, Zielbild und groben Funktionsumfang.
> Dieses Dokument beschreibt den geplanten Zielzustand und nicht den aktuellen Implementierungsstand.

## 1. Zweck dieses Dokuments

Dieses Dokument beschreibt, was NEXUM CMS langfristig sein soll:

- ein Enterprise Content Management System fuer grosse Organisationen
- ein modernes, API-first und workflow-getriebenes CMS
- eine Plattform, die funktional mit etablierten Systemen wie Imperia oder in Teilen auch WordPress mithalten kann
- ein System, das sowohl klassische CMS-Anforderungen als auch Enterprise-Anforderungen wie Governance, Freigaben, Rechte, Multi-Site und Integrationen abdeckt

Das Ziel ist kein 1:1 Nachbau eines bestehenden Produkts, sondern eine eigene Enterprise-CMS-Plattform mit vergleichbarer funktionaler Breite und moderner technischer Basis.

## 2. Produktvision

NEXUM CMS soll Unternehmen dabei helfen, Inhalte zentral zu verwalten, ueber mehrere Marken, Laender, Kanaele und Teams hinweg zu steuern und sicher auszuspielen.

Die Plattform soll zwei Dinge gleichzeitig leisten:

- fuer Redaktionen, Marketing, Kommunikation und Fachbereiche einfach genug sein, um taeglich produktiv damit zu arbeiten
- fuer Enterprise-IT, Entwickler und Betriebsteams robust genug sein, um Sicherheit, Skalierung, Integration und Governance sauber abzubilden

Langfristig soll NEXUM CMS als zentrale Content-Plattform fuer Websites, Microsites, Portale, Landingpages, Kampagnen, Intranets und API-basierte Frontends dienen.

## 3. Positionierung

NEXUM CMS positioniert sich als:

- enterprise-first statt blog-first
- workflow-first statt nur editor-first
- multi-site und multi-brand faehig statt nur single-site orientiert
- API-first und headless-faehig, ohne klassische Seitenverwaltung auszuschliessen
- erweiterbar ueber Module, Plugins, Integrationen und eigene Content-Modelle

Im Zielbild vereint das System:

- klassische CMS-Funktionen, wie man sie aus WordPress kennt
- Enterprise-Redaktions- und Freigabeprozesse, wie man sie aus Imperia oder aehnlichen Enterprise-CMS kennt
- moderne Architekturprinzipien fuer APIs, Headless Delivery, Automatisierung und Integrationen

## 4. Zielgruppen

NEXUM CMS richtet sich langfristig an:

- Unternehmen mit mehreren Websites, Marken oder Landerpraesenzen
- Marketing- und Kommunikationsteams
- Redaktionen und Content-Teams
- Corporate-IT und Plattform-Teams
- Agenturen oder interne Entwicklerteams, die kundenspezifische Erweiterungen bauen
- Organisationen mit hohen Anforderungen an Freigaben, Nachvollziehbarkeit, Rollenmodelle und Compliance

## 5. Kernprinzipien

- Enterprise First: Sicherheits-, Rollen-, Prozess- und Governance-Anforderungen werden von Anfang an mitgedacht.
- API First: Inhalte sollen ueber APIs nutzbar und wiederverwendbar sein.
- Workflow Driven: Inhalte durchlaufen definierte Prozesse statt rein informell publiziert zu werden.
- Modular: Funktionen sollen in klar getrennten Modulen aufgebaut und spaeter erweiterbar sein.
- Multi-Channel: Inhalte sollen fuer Website, Apps, Portale, Kampagnen und weitere Kanaele nutzbar sein.
- Auditierbar: Aenderungen, Freigaben und Publikationen muessen nachvollziehbar sein.
- Skalierbar: Architektur, Deployment und Datenmodell sollen Wachstum in Inhalt, Teams und Mandanten tragen.

## 6. Zielbild des Funktionsumfangs

### 6.1 Content- und Strukturmanagement

NEXUM CMS soll langfristig folgende Basisfunktionen bereitstellen:

- Seiten, Artikel, News, Landingpages und strukturierte Inhalte verwalten
- frei definierbare Content-Typen und Felder
- Komponentenbasierte Inhalte und wiederverwendbare Inhaltsbausteine
- Taxonomien, Kategorien, Tags und Metadaten
- Navigationen, Menues und Seitenbaeume
- globale Inhalte, die an mehreren Stellen genutzt werden koennen
- Content-Vorlagen fuer standardisierte Seitentypen und Formate
- Draft, Vorschau, Publikation und Archivierung
- Versionshistorie, Revisionen, Diff und Rollback

### 6.2 Redaktion, Workflows und Governance

Ein zentraler Enterprise-Unterschied zu einfachen CMS-Installationen ist die Prozessfaehigkeit. NEXUM CMS soll daher bieten:

- frei definierbare Redaktions- und Freigabeworkflows
- Statusmodelle wie Draft, In Review, Approved, Published, Archived
- mehrstufige Freigaben nach Rolle, Bereich oder Mandant
- Aufgaben, Inboxen und Wiedervorlagen fuer Redakteure und Freigeber
- Vier-Augen-Prinzip und optionale Pflichtfreigaben
- Sperrmechanismen, Bearbeitungshinweise und Konflikterkennung
- Audit-Log fuer inhaltliche und administrative Aenderungen
- Nachvollziehbare Publikationshistorie mit Zeit, Nutzer und Kontext

### 6.3 Benutzer, Rollen und Rechte

Das System soll deutlich ueber ein simples Rollenmodell hinausgehen:

- Benutzerverwaltung fuer interne und externe Nutzer
- Rollen und Rechte auf System-, Bereichs-, Site-, Inhalts- und Feldebene
- Gruppen, Teams und Organisationsstrukturen
- Mandanten- und bereichsbezogene Sichtbarkeit
- SSO, LDAP, SAML oder OIDC als Enterprise-Integrationsziel
- Delegation, Vertretungsregeln und eingeschraenkte Freigaberechte
- sichere Session- und Authentifizierungsmechanismen

### 6.4 Multi-Site, Multi-Brand und Multi-Language

Ein Enterprise CMS muss mehrere digitale Praesenzen in einer Plattform bedienen koennen:

- mehrere Websites in einer Installation
- mehrere Marken oder Geschaeftseinheiten
- mehrere Laender, Regionen und Sprachen
- sprachspezifische Varianten, Uebersetzungsstatus und Sprachfallbacks
- Vererbung und Wiederverwendung von Inhalten ueber Sites hinweg
- zentrale und lokale Inhaltsverantwortung
- Brand- und Site-spezifische Themes, Templates und Komponenten

### 6.5 Medien- und Asset-Management

NEXUM CMS soll eine belastbare Medienverwaltung enthalten oder an ein DAM anbindbar sein:

- zentrale Medienbibliothek
- Bilder, Dokumente, Videos und weitere Assets verwalten
- Metadaten, Verschlagwortung und Rechteinformationen pflegen
- verschiedene Formate und Renditions unterstuetzen
- Asset-Versionierung und Austausch ohne Link-Bruch
- Fokuspunkt, Bildausschnitt und einfache Bildtransformationen
- Nutzungs- und Ablaufhinweise fuer Medien

### 6.6 Seitenbau, Templates und Experience Layer

Damit das System nicht nur headless, sondern auch redaktionell nutzbar ist, soll es mittelfristig ermoeglichen:

- Template-basierte Seitenerstellung
- komponentenbasierten Page Builder
- Layout-Bloecke, Sections und frei kombinierbare Inhaltsmodule
- Vorschau fuer Desktop, Tablet und Mobile
- Stage, Preview-Links und Freigabevorschau
- einfache Formular- und Kampagnenseiten
- SEO-relevante Seiteneinstellungen und strukturierte Metadaten

### 6.7 Headless, API und Omnichannel Delivery

NEXUM CMS soll Inhalte nicht nur fuer klassische Websites, sondern auch fuer andere Ausspielwege bereitstellen:

- REST API als stabile Standardschnittstelle
- perspektivisch GraphQL oder vergleichbare Query-Schichten
- Webhooks fuer Ereignisse wie Publish, Update oder Delete
- API-Zugriffe fuer Frontends, Apps, Portale und externe Systeme
- Content Preview ueber API
- Channel-spezifische Auslieferung und Transformationslogik
- Integrationsfaehigkeit mit CDN, Search, Commerce oder Marketing-Systemen

### 6.8 Suche, Personalisierung und Marketing-Faehigkeiten

Diese Faehigkeiten sind fuer das langfristige Zielbild relevant, muessen aber nicht im ersten Release vollstaendig vorhanden sein:

- interne Suche im Backend fuer Inhalte, Assets und Konfigurationen
- frontendseitige Suche ueber angebundene Suchtechnologien
- SEO-Felder, Redirects, Canonicals und strukturierte Daten
- Kampagnen- und Landingpage-Unterstuetzung
- Personalisierung oder Segmentlogik als spaetere Ausbaustufe
- A/B-Test-Anbindung oder experimentelle Inhaltsvarianten
- Formular- und Lead-Erfassungsfunktionen

### 6.9 Betrieb, Sicherheit und Enterprise-Qualitaet

Im Enterprise-Umfeld sind nicht nur Features, sondern auch Betriebsfaehigkeit und Sicherheit entscheidend:

- revisionssichere Nachvollziehbarkeit von Aenderungen
- Backup-, Restore- und Disaster-Recovery-Faehigkeit
- Trennung von Entwicklungs-, Test-, Stage- und Produktionsumgebungen
- Deployment- und Release-Sicherheit
- Observability, Logging, Monitoring und Alerting
- Performance, Caching und Skalierungskonzepte
- Sicherheitskonzepte fuer Authentifizierung, Autorisierung und API-Zugriffe
- Compliance-Unterstuetzung, zum Beispiel fuer Datenschutz, Aufbewahrung und Freigabepflichten

### 6.10 Erweiterbarkeit und Oekosystem

Langfristig sollte NEXUM CMS ueber eine stabile Erweiterungsarchitektur verfuegen:

- Plugin- oder Modulkonzept
- definierte Erweiterungspunkte fuer UI, APIs und Workflows
- Integrationsfaehigkeit mit CRM, ERP, DAM, PIM, Search, Analytics und Marketing Automation
- Import- und Exportfunktionen
- Migration bestehender Inhalte aus Altsystemen
- optionale Marketplace- oder Connector-Strategie fuer wiederverwendbare Erweiterungen

## 7. Vergleichsrahmen: WordPress und Imperia

NEXUM CMS soll langfristig die einfache Nutzbarkeit klassischer CMS-Welten mit den Anforderungen eines Enterprise-Systems verbinden.

Was typischerweise aus der WordPress-Welt relevant ist:

- einfache Inhaltsbearbeitung
- Themes, Templates und Seitenerstellung
- Medienbibliothek
- Plugin-Erweiterbarkeit
- Menues, Seiten, Posts und Taxonomien
- SEO-, Formular- und Marketing-nahe Funktionen

Was typischerweise aus der Enterprise- bzw. Imperia-Welt relevant ist:

- klare Redaktionsprozesse und Freigabeketten
- Rechte- und Rollenkonzepte mit hoher Granularitaet
- Multi-Site, Multi-Brand und Mandantenfaehigkeit
- Governance, Auditierbarkeit und Compliance
- Integrationsfaehigkeit in komplexe Unternehmenslandschaften
- stabile Betriebs- und Deployment-Prozesse

Die Referenz fuer NEXUM CMS ist daher:

- so benutzbar wie ein gutes modernes CMS
- so kontrollierbar und prozessfaehig wie ein Enterprise CMS
- so flexibel, dass sowohl klassische Website-Projekte als auch Headless-Szenarien moeglich sind

## 8. Grobe Entwicklungsphasen

Die Plattform muss nicht von Anfang an alles koennen. Sinnvoll ist ein stufenweiser Ausbau.

### Phase 1 - Fundament und Core CMS

- Benutzer, Rollen und Login
- grundlegende Seiten- und Inhaltsverwaltung
- definierbare Content-Typen
- Medienverwaltung in Basisform
- Versionierung und einfache Vorschau
- Basis-Publikation
- erste REST API

### Phase 2 - Redaktioneller Enterprise-Kern

- Freigabeworkflows
- Aufgaben und Review-Prozesse
- Audit-Log
- feinere Rechteverwaltung
- Multi-Site- und Sprachgrundlagen
- Template- und Komponentenmodell

### Phase 3 - Skalierung und Integrationen

- Multi-Brand und Mandantenfaehigkeit
- SSO und Unternehmensintegration
- Webhooks, Events und Schnittstellen
- Performance-, Cache- und Betriebsoptimierung
- Import- und Migrationswerkzeuge

### Phase 4 - Experience und Erweiterbarkeit

- Page Builder oder Experience Layer
- fortgeschrittene Medien- und Asset-Funktionen
- Suchintegration
- SEO- und Kampagnenfunktionen
- Plugin- und Modulsystem

### Phase 5 - Erweiterte Enterprise-Funktionen

- Personalisierung
- tiefere Analytics- und Marketing-Integration
- verteilte Redaktionsorganisationen
- Governance- und Compliance-Ausbau
- Connector-Oekosystem

## 9. Was NEXUM CMS am Ende koennen soll

Im Zielbild soll NEXUM CMS:

- komplexe Enterprise-Weblandschaften zentral steuern koennen
- mehrere Marken, Laender, Sprachen und Teams in einem System bedienen koennen
- redaktionelle Prozesse sauber abbilden koennen
- Inhalte fuer klassische Websites und Headless-Kanaele bereitstellen koennen
- Entwicklerfreundlich und gleichzeitig redaktionsfreundlich sein
- sicher, nachvollziehbar und skalierbar betrieben werden koennen
- funktional mit etablierten CMS- und Enterprise-CMS-Loesungen konkurrieren koennen

## 10. Was dieses Dokument bewusst nicht ist

Dieses Dokument ist:

- keine finale technische Architektur
- kein verbindlicher Implementierungsplan auf Ticket-Ebene
- keine aktuelle Feature-Liste des bereits fertigen Systems
- kein Lastenheft mit vollstaendiger Spezifikation jeder Einzelkomponente

Dieses Dokument ist stattdessen eine Produktreferenz und ein gemeinsames Zielbild fuer die weitere Entwicklung.

## 11. Beziehung zu anderen Dokumenten

- [LAYOUT.md](./LAYOUT.md) beschreibt vor allem Layout-, Branding- und UI-nahe Referenzwerte.
- [ENTERPRISE_CMS_IDEAL_REQUIREMENTS.md](./ENTERPRISE_CMS_IDEAL_REQUIREMENTS.md) beschreibt den idealen Enterprise-Anforderungskatalog (MUSS/SOLL/KANN) als Soll-Referenz.
- Dieses Dokument beschreibt Produktscope, Zielbild, Enterprise-Faehigkeiten und den groben Ausbaupfad.

## 12. Kurzfassung in einem Satz

NEXUM CMS soll langfristig ein vollwertiges Enterprise CMS werden, das die editorische Nutzbarkeit klassischer CMS-Systeme mit den Workflow-, Governance-, Multi-Site-, Sicherheits- und Integrationsanforderungen grosser Organisationen verbindet.