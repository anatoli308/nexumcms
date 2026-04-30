# NEXUM CMS Layout and Theme Specification

This document is the source of truth for dashboard layout, theming, and brand usage in the React plus MUI frontend.

## 1. Scope

Applies to:

- dashboard shell (topbar, sidebar, main workspace)
- design tokens in MUI createTheme
- light and dark mode behavior
- color presets (brand-accent variants)
- icon strategy and brand asset usage

## 2. Layout Structure

Dashboard shell is split into three zones:

1. Topbar
- global search
- quick actions
- theme controls (mode and preset)

2. Sidebar
- domain navigation: Dashboard, Content, Media, Workflow, Delivery, IAM, Settings
- section views for active domain

3. Main Workspace
- section header and contextual meta
- stats cards
- quick actions
- recent activity
- next backend slice

## 3. Responsive Rules

MUI breakpoints:

- xs to sm: temporary Drawer (mobile menu)
- md and up: permanent Drawer
- content cards collapse from two-column to single-column on smaller widths

Design intent:

- no horizontal overflow
- all primary actions reachable on mobile
- sidebar behavior stays predictable across breakpoints

## 4. Theme System

Theme is created via MUI createTheme and supports runtime switching:

- mode: light or dark
- presets: blue, teal, aubergine, peach

Implementation reference:

- src/main/react/theme/createAppTheme.js
- src/main/react/theme/palette.js
- src/main/react/theme/AppThemeProvider.js
- src/main/react/theme/ThemeSettingsContext.js

State persistence:

- mode and preset are stored in localStorage

## 5. Token Strategy

Use tokenized values from theme, not ad hoc hardcoded UI colors in page components.

Primary token groups:

- palette.primary and palette.secondary
- background.default and background.paper
- text.primary and text.secondary
- custom shell tokens:
  - shellTopbar
  - shellTopbarText
  - shellSidebar
  - shellSidebarText
  - shellSidebarActive
  - shellSidebarHover
  - shellSidebarSubtle
  - panelMuted
  - searchBackground
  - searchBorder

## 6. Color Presets

Preset accents (primary and secondary):

- blue: #007BFF and #00D1FF
- teal: #0E8A8A and #FFD700
- aubergine: #6E4A86 and #A8B828
- peach: #C7742E and #40826D

Mode behavior:

- light mode uses light surfaces and dark text
- dark mode uses dark surfaces and light text

## 7. Branding Assets

Current available brand files are under src/main/resources/static/brand.

Recommended dashboard usage:

- light mode logo: /brand/nexum-logo-dark.png
- dark mode logo: /brand/nexum-logo-light.png
- light mode mark: /brand/nexum-monogram-dark.png
- dark mode mark: /brand/nexum-monogram-light.png

Guideline:

- use logos based on contrast, not only by filename
- avoid stretching; keep object-fit contain for logo images

## 8. Icon Strategy (Iconify)

Iconify is acceptable in enterprise projects if handled with governance.

Pros:

- wide icon set coverage
- consistent API across icon sets
- easy to map config-driven navigation icons

Enterprise guardrails:

- pin dependency versions
- avoid uncontrolled external runtime dependencies
- keep a curated icon list (do not mix random styles)
- prefer consistent style family for product UI

Implementation reference:

- src/main/react/components/utils/Iconify.js

## 9. Accessibility Requirements

Minimum requirements:

- icon-only controls need aria-label
- topbar and navigation must be keyboard reachable
- contrast must remain readable in all mode and preset combinations
- focus states must remain visible

## 10. Do and Do Not

Do:

- use MUI components first
- style through theme tokens
- keep layout behavior deterministic
- separate config from rendering logic

Do not:

- duplicate color constants across multiple components
- mix multiple icon systems without reason
- put heavy domain logic into visual components

## 11. Next Enhancements

Planned improvements:

- URL-based section and view state
- dedicated theme settings panel
- icon fallback strategy if a remote icon source is unavailable
- optional per-user persisted dashboard layout preferences
