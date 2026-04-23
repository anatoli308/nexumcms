Hier ist eine detaillierte Übersicht der empfohlenen Maße für alle **NEXUM CMS** Assets. Diese Tabelle dient als technischer Leitfaden für deine Entwickler oder für die Einpflege in ein Design-System (wie Figma oder Adobe XD).

### 1. Marken-Layouts & Themes (Präsentation)
Diese Größen beziehen sich auf die Vollbilder/Kacheln, die wir für die verschiedenen Farbschemata erstellt haben.

| Asset | Empfohlene Größe (px) | Format | Verwendung |
| :--- | :--- | :--- | :--- |
| **Theme-Panel (Voll)** | 1920 x 1080 (Full HD) | PNG / JPG | Pitch-Decks, Website-Hintergründe |
| **Theme-Card (Specialized)** | 1200 x 630 | PNG | Social Media Sharing (Open Graph) |
| **Mobile Splash Screen** | 1284 x 2778 | PNG | App-Startbildschirm (iPhone Pro Max Maß) |

### 2. Logos & Branding
Für Logos ist **SVG** das wichtigste Format, da es ohne Qualitätsverlust skalierbar ist. Die Pixelwerte hier sind Mindestgrößen für Raster-Exporte (PNG).

| Asset | Empfohlene Größe (px) | Format | Besonderheit |
| :--- | :--- | :--- | :--- |
| **Master Logo (Horizontal)** | 2000 x 500 | SVG / PNG | Header, Dokumente |
| **Stacked Logo (Zentriert)** | 1500 x 1500 | SVG / PNG | Center-Branding, Cover-Pages |
| **Wordmark (Nur Text)** | 1200 x 300 | SVG / PNG | Footer, dezentes Branding |
| **Monogramm ('N' Mark)** | 1000 x 1000 | SVG / PNG | Profilbilder, Wasserzeichen |

### 3. Icons (App & System)
Icons müssen in verschiedenen Größen vorliegen, um auf allen Displays (Retina/High-DPI) scharf zu wirken.

| Asset | Empfohlene Größe (px) | Format | Verwendung |
| :--- | :--- | :--- | :--- |
| **App Icon (Master)** | 1024 x 1024 | PNG | App Store / Google Play Standard |
| **Backend UI Icons** | **48 x 48** (Basis) | SVG | Content Management Interface |
| **Sidebar Icons** | 24 x 24 / 32 x 32 | SVG | Navigation im CMS |
| **Favicon** | 16x16, 32x32, 48x48 | ICO / PNG | Browser-Tab Icon |

### 4. Marketing & Stationery
Hier rechnen wir in Pixeln für den Druck (300 DPI).

| Asset | Empfohlene Größe (px) | Entspricht (mm) | Verwendung |
| :--- | :--- | :--- | :--- |
| **Visitenkarte** | 1050 x 600 | 85 x 55 mm | Druck (Standardmaß) |
| **E-Mail Signatur** | 600 x 200 | - | Outlook / Gmail |
| **Web Banner (Hero)** | 1920 x 600 | - | Landingpage oben |
| **Leaderboard Ad** | 728 x 90 | - | Werbebanner |

---

### Wichtige technische Hinweise für dein Archiv:

1.  **Dateiformate:**
    * **SVG:** Nutze dies für *alle* Logos und Icons. Es ist klein im Speicherplatz und immer 100% scharf.
    * **PNG (Transparent):** Nutze dies für Präsentationen, wenn SVG nicht unterstützt wird.
    * **WebP:** Wenn du die Bilder auf der CMS-Website einbaust, konvertiere die großen Header-Bilder in WebP für schnellere Ladezeiten.

2.  **Farbraum:**
    * **HEX / RGB:** Für alle digitalen Screens (das sind die Codes, die wir verwendet haben, z.B. das Cyan-Blau).
    * **CMYK:** Falls du die Visitenkarten druckst, muss dein Grafiker die Farben in CMYK umwandeln, damit das Blau auf Papier nicht "stumpf" aussieht.

3.  **Schriftart (Typography):**
    * Wie im UI-Board vermerkt, empfehle ich für die Umsetzung die Font **"Montserrat"** oder **"Inter"**. Diese passen perfekt zum geometrischen Stil des NEXUM 'N' Logos.

Hast du damit alle technischen Daten, die du brauchst, oder soll ich für einen bestimmten Bereich (z.B. nur die Social Media Formate) noch tiefer ins Detail gehen?

Das ist eine hervorragende Idee. Um aus dem Design ein echtes Produkt zu machen, brauchen deine Frontend-Entwickler eine „Source of Truth“ – also exakte technische Werte.

Hier sind die vollständigen Frontend-Spezifikationen für das **NEXUM CMS**, basierend auf den bisherigen Entwürfen, strukturiert in Tabellen.

### 1. Typografie (Schrift-Hierarchie)
Empfohlene Fonts: **Montserrat** (für Branding/Überschriften) und **Inter** (für Lesbarkeit im CMS-Backend).

| Element | Schriftart | Größe (px/rem) | Weight | Line-Height | Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Display)** | Montserrat | 48px / 3rem | 700 (Bold) | 1.2 | Slogans, Hero-Pages |
| **H2 (Header)** | Montserrat | 32px / 2rem | 600 (Semi) | 1.3 | Sektionsüberschriften |
| **H3 (Sub)** | Montserrat | 24px / 1.5rem | 500 (Medium)| 1.4 | Widget-Titel |
| **Body (P)** | Inter | 16px / 1rem | 400 (Reg) | 1.6 | Fließtext, Beschreibungen |
| **Button Text** | Inter | 14px / 0.875rem| 600 (Semi) | 1.0 | Schaltflächen (Uppercase?) |
| **Caption** | Inter | 12px / 0.75rem | 400 (Reg) | 1.4 | Metadaten, Zeitstempel |



---

### 2. Globale Design-Variablen (UI-Komponenten)
Diese Werte gelten themenübergreifend, um die „Nexum-Ästhetik“ beizubehalten.

| Eigenschaft | Wert | CSS-Variable (Beispiel) |
| :--- | :--- | :--- |
| **Border Radius** | 8px (Standard) | `--radius-md: 8px;` |
| **Border Radius (Cards)**| 12px | `--radius-lg: 12px;` |
| **Spacing Grid** | 8px Basis | `--space-unit: 8px;` |
| **Container Width** | 1200px / 1440px | `--max-width: 1440px;` |
| **Stroke Width (Icons)**| 2px - 3px | `--icon-stroke: 3px;` |
| **Shadow (Dark)** | 0 4px 20px rgba(0,0,0,0.5) | `--shadow-dark: ...` |



---

### 3. Farbpaletten nach Themes (Hex-Codes)
Hier sind die exakten Farbcodes für die Frontend-Umsetzung:

| Theme | Background (Main) | Surface (Cards) | Accent / Primary | Text (Main) |
| :--- | :--- | :--- | :--- | :--- |
| **Standard Dark** | `#0D1117` | `#161B22` | `#007BFF` (Blue) | `#F0F6FC` |
| **Standard Light** | `#FFFFFF` | `#F6F8FA` | `#007BFF` (Blue) | `#1F2328` |
| **Teal (Dark Colored)**| `#002D2D` | `#003D3D` | `#FFD700` (Amber) | `#E6F1F1` |
| **Aubergine (Comp.)** | `#2D1B2D` | `#3D253D` | `#A8B828` (Olive) | `#F5F0F5` |
| **Peach (Comp.)** | `#FFF5EB` | `#FFEBD6` | `#40826D` (Mint) | `#332D2D` |
| **Blue-Purple** | `#F0F2FF` | `#E0E4FF` | `#5C6BC0` (Indigo) | `#1A1C2E` |

---

### 4. Icon- & Logo-Spezifikationen
Für die korrekte Skalierung im Frontend:

| Asset | Container-Größe | Padding | Ausrichtung |
| :--- | :--- | :--- | :--- |
| **Logo Horizontal** | 200px x 50px | 10% Safe Zone | Links oben |
| **Stacked Logo** | 300px x 300px | 15% Safe Zone | Zentriert |
| **UI-Backend Icons** | 24px x 24px | 2px Optical | Grid-basiert |
| **Dashboard-Widgets** | 48px x 48px | 8px | Zentriert im Kreis |

---

### 5. Slogan & Content-Details (String-Liste)
Damit die Texte im Frontend immer identisch sind:

* **Brand Name:** `NEXUM CMS`
* **Tagline:** `Next Enterprise Content Unified Management`
* **Main Slogan:** `Content. Unified. Experiences. Elevated.`
* **Feature Labels:**
    1.  `SECURE` (Enterprise-grade security)
    2.  `FLEXIBLE` (Modular architecture)
    3.  `POWERFUL WORKFLOWS` (Advanced engine)
    4.  `HEADLESS & API-FIRST` (Anywhere, anytime)
    5.  `SCALABLE` (Global growth)
    6.  `EXTENDABLE` (Plugin system)

### Zusammenfassung für die Entwicklung:
1.  **Grid:** Nutze ein **8px-Raster** (Abstände wie 8, 16, 24, 32, 48, 64px).
2.  **Transitions:** Buttons sollten eine `transition: all 0.2s ease-in-out;` haben.
3.  **Hover-State:** Bei Hover auf Akzentfarben die Helligkeit um ca. 10% erhöhen oder verringern.

Hast du damit alle Details für deine Frontend-Dokumentation oder brauchst du noch spezifische CSS-Snippets für bestimmte Komponenten?


Das ist eine hervorragende Wahl! **Material UI (MUI)** ist perfekt für ein Enterprise CMS, da es von Grund auf **responsive** ist und ein mächtiges Theming-System besitzt.

Zu deiner Frage: Ja, das Design ist so konzipiert, dass es responsive umgesetzt werden kann. In MUI nutzt du dafür das **Breakpoint-System** (xs, sm, md, lg, xl).

Hier ist der Check, was du für MUI 9 (oder aktuelle Versionen) noch brauchst und was wir eventuell noch ergänzen sollten:

### 1. Responsivität in MUI (Das Grid-Konzept)
Die Layouts, die wir erstellt haben, lassen sich im Frontend so übersetzen:
* **Desktop:** Sidebar (fest oder einklappbar) + Main Content Area.
* **Tablet:** Sidebar wird zum "Hamburger Menu" (Drawer), Karten rücken enger zusammen.
* **Mobile:** Einspaltiges Layout. Die "Feature-Icons" werden von einer 3er- oder 6er-Reihe zu einer vertikalen Liste oder einem 2x3 Grid.

### 2. Dein MUI Theme-Objekt (Code-Struktur)
Damit deine Entwickler das Branding direkt in MUI einbauen können, hier die wichtigste Ergänzung – das **Theme-Objekt**. Hast du das schon? Falls nicht, ist das der nächste Schritt:

| MUI Palette Key | Nexum Farbe (Dark) | Nexum Farbe (Light) |
| :--- | :--- | :--- |
| `primary.main` | `#007BFF` (Cyan-Blau) | `#0056B3` (Dunkleres Blau) |
| `secondary.main` | `#00D1FF` (Accent) | `#007BFF` |
| `background.default` | `#0D1117` | `#FFFFFF` |
| `background.paper` | `#161B22` | `#F6F8FA` |
| `text.primary` | `#F0F6FC` | `#1F2328` |

### 3. Was hast du eventuell vergessen? (Die "Missing Pieces")

Obwohl das Branding steht, fehlen für ein echtes **Enterprise-Produkt** oft noch die "kleinen" Dinge:

1.  **Feedback-Farben (Status):**
    MUI braucht Standard-Farben für Systemmeldungen. Passen diese zu deinem Branding?
    * **Success:** Grün (z.B. `#2EA043` für "Inhalt veröffentlicht")
    * **Error:** Rot (z.B. `#F85149` für "Fehler beim Speichern")
    * **Warning:** Orange (z.B. `#D29922` für "Nicht gespeicherte Änderungen")
    * **Info:** Dein Nexum-Blau.

2.  **Empty States (Leere Zustände):**
    Wie sieht das CMS aus, wenn noch kein Inhalt da ist? (Ein schönes Icon + Text "Noch keine Seiten erstellt").

3.  **Skeleton Screens:**
    Wie sieht die Lade-Animation aus, bevor die Daten geladen sind? (In MUI nutzt man dafür `Skeleton`).

4.  **Dark Mode Toggle:**
    Hast du ein Icon für den Switcher zwischen den Themes? (Meistens Sonne/Mond Icons oben rechts).

### Mein Vorschlag:
Ich kann dir jetzt ein **MUI-Spezifikations-Sheet** erstellen, das zeigt, wie die **Buttons und Komponenten** (Cards, Stepper, Tables) in deinen neuen Farben aussehen.

**Soll ich dir ein Layout für die "MUI Komponenten-Zustände" (Hover, Active, Disabled) in deinen Farben machen?** Dann haben deine Entwickler eine exakte Vorlage für den CSS-Code.

Verstanden, du brauchst die konkreten **Konfigurations-Werte** für dein MUI-Theme (JSON-Struktur), damit du sie direkt in deinen Code kopieren kannst.

Da du **MUI** (Material UI) nutzt, ist die wichtigste Datei dein `theme.js` oder `theme.ts`. Hier ist die vollständige technische Aufstellung für dein **NEXUM CMS** Layout:

### 1. Die Farbkennzahlen (Palette)
Hier sind die Hex-Werte, die wir aus deinen Layouts extrahiert haben, passend für das MUI `palette`-Objekt:

| MUI Key | Dark Mode (Primary) | Light Mode |
| :--- | :--- | :--- |
| `primary.main` | `#007BFF` (Cyan Blue) | `#0056B3` |
| `secondary.main` | `#00D1FF` | `#007BFF` |
| `background.default` | `#0D1117` | `#FFFFFF` |
| `background.paper` | `#161B22` | `#F6F8FA` |
| `text.primary` | `#F0F6FC` | `#1F2328` |
| `divider` | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.12)` |

### 2. Typografie (Typography)
Basierend auf deinem Wunsch nach einem professionellen Enterprise-Look:

* **Font Family:** `'Montserrat', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`
* **H1 (Slogans):** `fontWeight: 700`, `fontSize: '3rem'`
* **H2 (Überschriften):** `fontWeight: 600`, `fontSize: '2.25rem'`
* **Body1:** `fontSize: '1rem'`, `lineHeight: 1.6`
* **Button:** `textTransform: 'none'` (Wichtig für modernen Look, MUI macht standardmäßig alles Caps).

### 3. Shape & Shadows (Das "Gefühl" des Layouts)
* **Border Radius:** `8px` (Standard für Buttons und kleine Felder), `12px` für Cards (Dashboard-Widgets).
* **Shadows:** Nutze für den Dark Mode sehr subtile Schatten (`box-shadow: 0px 4px 20px rgba(0,0,0,0.4)`), da harte Schatten auf dunklem Grund nicht wirken.

### 4. Breakpoints (Responsive Layout)
In MUI sind diese standardmäßig gut gesetzt, aber für dein CMS-Layout solltest du diese Logik im Kopf haben:
* **xs (0px):** Mobile – Sidebar ist ausgeblendet (Drawer).
* **sm (600px):** Tablet – Cards werden 2-spaltig.
* **md (900px):** Kleiner Laptop – Sidebar wird fixiert (mini-variant).
* **lg (1200px):** Desktop – Volles Dashboard-Layout (3-4 Spalten).

---

### Code-Snippet für dein MUI-Theme (Beispiel)

Hier ist die Struktur, wie du deine Slogans und Farben im Theme hinterlegst:

```javascript
import { createTheme } from '@mui/material/styles';

const nexumTheme = createTheme({
  palette: {
    mode: 'dark', // oder 'light'
    primary: {
      main: '#007BFF', // Dein Nexum Blau
    },
    secondary: {
      main: '#00D1FF',
    },
    background: {
      default: '#0D1117',
      paper: '#161B22',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Inter, sans-serif',
    h1: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none', // Modernes Look & Feel
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Konsistent zu deinem Layout
        },
      },
    },
  },
});

export default nexumTheme;
```

### Hast du noch etwas vergessen?
Zwei technische Details fehlen oft beim ersten Entwurf:
1.  **Scrollbar-Styling:** Im Dark-Mode sehen Standard-Browser-Scrollbars oft hässlich aus. Du solltest sie im Theme via `MuiCssBaseline` stylen (schmaler und dunkel).
2.  **Z-Index:** Für die Sidebar und Popovers im CMS.

**Soll ich dir die exakten JSON-Werte für die "Complementary" Themes (Aubergine/Peach) auch noch als Code-Tabelle aufbereiten?**

Hier sind die vollständigen technischen Konfigurationsdaten für dein **NEXUM CMS** in Material UI (MUI 9). Damit hast du alle Varianten (Standard, Colored, Complementary) direkt als Code-Grundlage.

### 1. Palette-Konfiguration (Farb-Varianten)

Diese Werte kannst du direkt in dein `createTheme`-Objekt unter `palette` einfügen.

| Theme-Typ | `primary.main` | `background.default` | `background.paper` | `text.primary` |
| :--- | :--- | :--- | :--- | :--- |
| **Standard Dark** | `#007BFF` | `#0D1117` | `#161B22` | `#F0F6FC` |
| **Standard Light** | `#0056B3` | `#FFFFFF` | `#F6F8FA` | `#1F2328` |
| **Teal (Colored)** | `#FFD700` | `#002D2D` | `#003D3D` | `#E6F1F1` |
| **Aubergine (Comp.)** | `#A8B828` | `#2D1B2D` | `#3D253D` | `#F5F0F5` |
| **Peach (Comp.)** | `#40826D` | `#FFF5EB` | `#FFEBD6` | `#332D2D` |
| **Blue-Purple** | `#5C6BC0` | `#F0F2FF` | `#E0E4FF` | `#1A1C2E` |

---

### 2. Typografie-Objekt (MUI Global)

```javascript
typography: {
  fontFamily: '"Montserrat", "Inter", sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '3rem', // Responsive: @media (max-width:600px) { fontSize: '2rem' }
    letterSpacing: '-0.02em',
  },
  h2: {
    fontWeight: 600,
    fontSize: '2.25rem',
  },
  body1: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  button: {
    fontWeight: 600,
    textTransform: 'none', // Verhindert automatische Großbuchstaben
  },
}
```

---

### 3. Layout-Konstanten (Responsive Breakpoints)

Da du MUI nutzt, sind diese Breakpoints für das CMS-Backend entscheidend:

* **Sidebar-Breite (Desktop):** `240px` (fest)
* **Sidebar-Breite (Mini-Variant):** `64px`
* **Grid-Gutter:** `spacing(3)` (entspricht 24px)
* **Border-Radius:** `8px` für Buttons/Inputs, `12px` für Dashboard-Cards.

---

### 4. Slogan & Messaging (Strings für Frontend)

Damit die Slogans überall identisch sind, lege sie am besten als Konstanten an:

```javascript
export const BRAND_STRINGS = {
  name: "NEXUM CMS",
  tagline: "Next Enterprise Content Unified Management",
  slogan: "Content. Unified. Experiences. Elevated.",
  features: [
    { id: 'secure', label: 'SECURE', sub: 'Enterprise-grade security' },
    { id: 'flexible', label: 'FLEXIBLE', sub: 'Modular architecture' },
    { id: 'workflows', label: 'POWERFUL WORKFLOWS', sub: 'Advanced engine' },
    { id: 'api', label: 'HEADLESS & API-FIRST', sub: 'Anywhere, anytime' },
    { id: 'scalable', label: 'SCALABLE', sub: 'Global growth' },
    { id: 'extendable', label: 'EXTENDABLE', sub: 'Plugin system' }
  ]
};
```

---

### Zusammenfassung: Hast du jetzt wirklich alles?

1.  **Logos/Icons:** Ja (als Raster/Preview vorhanden, müssen als SVG exportiert werden).
2.  **Farben:** Ja (alle 6 Varianten technisch definiert).
3.  **Typografie:** Ja (Montserrat/Inter Mix).
4.  **Backend-Icons:** Ja (Stil für MUI SvgIcons definiert).
5.  **Responsivität:** Ja (Breakpoints für Drawer/Grid definiert).
6.  **Slogans:** Ja (vollständig integriert).

**Ein kleiner Tipp für MUI 9:** Nutze den **`CssVarsProvider`**. Damit kannst du zwischen all diesen Themes (Dark, Light, Peach etc.) nahtlos hin- und herwechseln, ohne dass die Seite neu laden muss.

Gibt es noch eine spezifische MUI-Komponente (z.B. den DataGrid oder den Editor), für den du ein spezielles Styling brauchst?