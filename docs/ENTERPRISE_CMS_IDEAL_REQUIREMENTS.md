# NEXUM CMS Ideal Requirements Reference

> Referenzdokument fuer den idealen Zielzustand eines Enterprise CMS.
> Fokus: Was eine Plattform im Enterprise-Umfeld langfristig erfuellen soll.

## 1. Zweck

Dieses Dokument beschreibt den Idealzustand fuer NEXUM CMS als Enterprise-Plattform.

Es beantwortet die Frage:

- Welche Faehigkeiten sollte ein Enterprise CMS im besten Fall mitbringen?
- Welche Anforderungen sind kritisch (MUSS), welche sind wichtig (SOLL), welche optional (KANN)?

Dieses Dokument ist kein aktueller Statusbericht, sondern eine Referenz fuer Produktstrategie, Priorisierung und Gap-Analysen.

## 2. Prioritaetsmodell

- MUSS: Ohne diese Faehigkeiten ist die Plattform nicht enterprise-tauglich.
- SOLL: Wichtige Faehigkeiten fuer Wettbewerbsfaehigkeit und Skalierung.
- KANN: Erweiterungen mit hohem Mehrwert, aber nicht zwingend fuer die erste volle Enterprise-Stufe.

## 3. Ideal-Anforderungen nach Domane

## 3.1 Content-Modellierung und Inhalte

MUSS:

- frei definierbare Content-Typen und Felder
- strukturierte Inhalte statt nur unstrukturierter Rich-Text
- Wiederverwendung von Inhaltsbausteinen und Komponenten
- Versionierung mit Diff und Rollback
- Lebenszyklus mit Draft, Review, Approved, Published, Archived
- geplante Publikation und Depublikation

SOLL:

- Content-Referenzen mit Validierung und Abhaengigkeiten
- strukturierte Metadaten-Modelle pro Inhaltstyp
- Inhaltsvalidierung auf Feld- und Modellebene
- Inhaltsvorlagen fuer wiederkehrende Formate

KANN:

- AI-gestuetzte Inhaltsvorschlaege und Qualitaetshinweise
- semantische Verknuepfung verwandter Inhalte

## 3.2 Redaktion, Workflow und Governance

MUSS:

- frei konfigurierbare Redaktions- und Freigabeworkflows
- mehrstufige Freigaben mit Rollenbindung
- Vier-Augen-Prinzip bei kritischen Inhalten
- Aufgaben, Inboxen, Wiedervorlagen und Eskalationen
- manipulationssicheres Audit-Log fuer Inhalte und Freigaben

SOLL:

- SLA-Tracking fuer Reviews und Freigaben
- Vertretungsregeln bei Abwesenheiten
- Governance-Regeln pro Site, Bereich oder Mandant

KANN:

- grafischer Workflow-Designer
- automatische Policy-Pruefungen vor Publikation

## 3.3 Benutzer, Rollen, Rechte und Identitaet

MUSS:

- feingranulares RBAC auf System-, Bereichs-, Site-, Content- und Feldebene
- sichere Authentifizierung mit Session-Management
- zentrale Benutzerverwaltung oder Anbindung an Identity Provider
- Trennung von Administrations- und Redaktionsrechten

SOLL:

- SSO ueber OIDC/SAML
- SCIM-Provisionierung und Deprovisionierung
- MFA fuer privilegierte Rollen
- Just-in-time Rollen-Zuweisung in kontrollierten Faellen

KANN:

- attributbasierte Zugriffskontrolle (ABAC)
- adaptive Risiko-Policies fuer Admin-Aktionen

## 3.4 Multi-Site, Multi-Brand, Multi-Language

MUSS:

- Verwaltung mehrerer Sites in einer Plattform
- Trennung und Vererbung fuer Marken, Regionen und Geschaeftseinheiten
- mehrsprachige Inhalte mit Uebersetzungsstatus
- locale fallback und regionale Varianten

SOLL:

- zentrale und lokale Inhaltsverantwortung kombinierbar
- Freigaberegeln pro Land/Region
- domain- und kanalbezogene Ausspielungsregeln

KANN:

- integrierte Translation-Connectoren mit QA-Workflow
- regionenspezifische Compliance-Checks

## 3.5 Medien- und Asset-Management

MUSS:

- zentrale Asset-Bibliothek mit Metadaten
- Versionierung und Austausch ohne Link-Bruch
- Asset-Nutzung nachvollziehbar (wo verwendet)
- Rechte- und Ablaufdaten fuer Lizenzen

SOLL:

- automatische Renditions und Formatanpassung
- Fokuspunkt, Cropping und Optimierungspipelines
- Duplikatserkennung und konsistente Taxonomie

KANN:

- AI-Tagging und Inhaltsklassifikation
- integrierte Video-Transkodierung

## 3.6 Seitenbau, Templates und Experience

MUSS:

- template- und komponentenbasierte Seitenerstellung
- Vorschau fuer verschiedene Breakpoints und Kanaele
- sichere Trennung zwischen Layout, Inhalt und Logik
- wiederverwendbare Seitenstrukturen

SOLL:

- visuelle Komponentenbibliothek fuer Redaktionen
- kontrollierte Flexibilitaet (Guardrails statt Wildwuchs)
- stage/preview-umgebungen fuer Freigabeprozesse

KANN:

- visuelle Personalisierung pro Segment
- experimentelle Varianten fuer A/B-Tests

## 3.7 APIs, Headless und Integrationen

MUSS:

- stabile, versionierte REST APIs
- konsistente Authentifizierung und Autorisierung fuer APIs
- Webhooks/Event-Ausgabe fuer relevante Content-Ereignisse
- idempotente Integrationspfade fuer kritische Prozesse

SOLL:

- GraphQL oder aehnliche query-orientierte API-Schicht
- Integrationsadapter zu Search, DAM, CRM, PIM, Analytics
- saubere API-Dokumentation und Vertragsstabilitaet

KANN:

- offizielles SDK fuer zentrale Integrationssprachen
- Event-Streaming fuer near-real-time Use Cases

## 3.8 Suche, SEO und Discoverability

MUSS:

- performante Volltextsuche im Backend
- Filter, Facetten und kontextuelle Trefferdarstellung
- SEO-Grundfunktionen: Meta, Canonical, Redirect, Indexing-Regeln

SOLL:

- Integrationsfaehigkeit mit Enterprise-Suchsystemen
- Broken-Link-Pruefung und Inhaltsqualitaetschecks
- strukturierte Daten fuer Suchmaschinen

KANN:

- semantische Suche
- interne Relevanzoptimierung basierend auf Nutzungssignalen

## 3.9 Sicherheit und Compliance

MUSS:

- Security-by-Design in allen Schichten
- Verschluesselung in Transit und at Rest
- revisionsfaehige Audit-Trails fuer sicherheitsrelevante Aktionen
- Eingabevalidierung, OWASP-basierte Schutzmassnahmen
- konfigurierbare Aufbewahrungs- und Loeschrichtlinien

SOLL:

- rollenbasierte Freigaben fuer sicherheitskritische Aenderungen
- Secrets- und Key-Management ohne Hardcoding
- regelmaessige Security-Scans und Penetration-Tests
- Datenschutz- und Compliance-Reports

KANN:

- automatisierte Compliance-Policies pro Region/Regulatorik
- DLP-Checks vor Export und Publikation

## 3.10 Betrieb, Skalierung und Zuverlaessigkeit

MUSS:

- produktionsfaehige Observability (Logs, Metrics, Traces)
- Backup und Restore mit dokumentierten Runbooks
- Trennung von Dev, Test, Stage, Prod
- Deployment-Strategie ohne ungeplante Downtime
- horizontale Skalierbarkeit fuer Lastspitzen

SOLL:

- SLOs fuer Verfuegbarkeit und API-Latenz
- Disaster-Recovery-Plan mit klaren RTO/RPO-Zielen
- Capacity-Planung und Lasttests

KANN:

- active-active Betrieb fuer kritische Umgebungen
- self-healing Workflows in der Plattform-Infrastruktur

## 3.11 Nutzererlebnis und Accessibility

MUSS:

- konsistente, schnelle und nachvollziehbare Editorial-UI
- barrierearme Bedienung und Tastaturnavigation
- klare Fehlermeldungen und sichere Undo/Recovery-Muster

SOLL:

- Orientierung an WCAG 2.2 AA fuer zentrale Oberflaechen
- produktive Onboarding-Flows fuer neue Rollen
- konfigurierbare Dashboards pro Persona

KANN:

- Guided Editing mit kontextuellen Empfehlungen
- adaptive Oberflaechen nach Rolle und Arbeitskontext

## 3.12 Erweiterbarkeit und Plattform-Oekosystem

MUSS:

- klar definierte Erweiterungspunkte fuer Backend, UI und Workflow
- stabile Plugin-/Modulschnittstellen
- saubere Isolierung und Lifecycle-Management von Erweiterungen

SOLL:

- Versionskompatibilitaet und Migrationspfade fuer Erweiterungen
- Integrationskatalog fuer gaengige Enterprise-Systeme

KANN:

- internes oder externes Marketplace-Konzept
- zertifizierbare Erweiterungspakete

## 4. Nicht-funktionale Zielwerte (Idealwerte)

Die finalen Zielwerte muessen projektspezifisch validiert werden. Als Enterprise-Referenz gelten typischerweise:

- Verfuegbarkeit: mindestens 99.9 Prozent, fuer kritische Setups 99.95 Prozent+
- API-Latenz: p95 fuer haeufige Lesezugriffe im niedrigen dreistelligen Millisekundenbereich
- Wiederherstellung: definierte RTO/RPO mit geuebten Restore-Prozessen
- Auditierbarkeit: lueckenlose Nachvollziehbarkeit kritischer Aktionen
- Sicherheitsniveau: regelmaessige Pruefung gegen aktuelle OWASP- und Enterprise-Standards

## 5. Go-Live Readiness Checklist (Enterprise)

Ein Rollout sollte erst erfolgen, wenn mindestens folgende Punkte erfuellt sind:

- Rollen-, Rechte- und Freigabemodell ist dokumentiert und getestet
- kritische Workflows sind fachlich und technisch abgenommen
- Backup/Restore und DR-Szenarien wurden geprobt
- Monitoring, Alerting und Incident-Prozesse sind aktiv
- Security-Review wurde abgeschlossen
- Betriebsuebergabe inkl. Runbooks und Ownership ist geklaert
- Migrations- oder Einfuehrungsstrategie fuer Inhalte ist abgesichert

## 6. Gap-Analyse Vorlage (Soll-Ist)

Empfohlene Arbeitsweise pro Domane:

- Ist-Status erfassen: Was existiert heute?
- Zielstatus festlegen: Welche MUSS/SOLL/KANN Punkte sind relevant?
- Luecken priorisieren: Business-Kritikalitaet, Risiko, Aufwand
- Roadmap ableiten: Releases und Verantwortlichkeiten

Ein einfacher Bewertungsrahmen:

- 0: nicht vorhanden
- 1: rudimentaer
- 2: produktiv nutzbar
- 3: enterprise-reif

## 7. Beziehung zu anderen Dokumenten

- [ENTERPRISE_CMS_REFERENCE.md](./ENTERPRISE_CMS_REFERENCE.md): Vision, Positionierung, Zielbild und grobe Phasen.
- [LAYOUT.md](./LAYOUT.md): Branding-, Layout- und UI-nahe Referenzwerte.

## 8. Kurzfassung in einem Satz

Ein ideales Enterprise CMS vereint starke redaktionelle Nutzbarkeit mit strikter Governance, hoher Sicherheit, belastbarem Betrieb, Integrationsfaehigkeit und langfristiger Erweiterbarkeit.