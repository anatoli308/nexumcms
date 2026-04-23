# NexumCMS Copilot Instructions

Apply these instructions to all changes in this repository.

## Project Context

- Backend: Spring Boot 4, Java 26, Spring MVC, Spring Security, Spring Data JPA, Thymeleaf.
- Frontend: React with webpack under `src/main/react`.
- Frontend UI library: Material UI (MUI).
- Goal: prefer small, maintainable changes that keep backend, frontend, and infrastructure concerns separated.
- Follow the existing project structure and conventions for code style, architecture, and dependencies.
- Do not introduce new architectural patterns, libraries, or frameworks unless the task explicitly requires it.
- For UI changes, prefer using MUI components and theming to maintain a consistent look and feel.
- For backend changes, keep controllers thin and put business logic in service classes, following the existing patterns.
- For any change, preserve existing public APIs and file structure unless the task explicitly requires a change.
- Do not add tests unless the user explicitly asks for them, but mention when a change would.

## Core Engineering Principles

- Follow clean code over clever code.
- Prefer KISS, DRY, and YAGNI.
- Keep code readable, explicit, and easy to change.
- Use descriptive names for classes, methods, variables, and fields.
- Keep methods short and focused on one responsibility.
- Avoid deep nesting; prefer guard clauses and early returns.
- Avoid magic numbers and hardcoded values when a named constant or configuration is clearer.
- Minimize side effects and mutable shared state.
- Refactor only when it directly supports the requested change. Do not do broad cleanup unless asked.

## Architecture And Separation Of Concerns

- Keep controllers thin. Controllers should handle HTTP concerns, delegate work, and return views or responses.
- Put business rules in service classes, not in controllers, repositories, templates, or React render code.
- Keep repositories focused on persistence and query concerns only.
- Keep configuration in dedicated configuration classes or config files.
- Do not mix frontend rendering concerns with backend business logic.
- Do not place database logic in controllers.
- Do not place security decisions inline across random classes; keep them centralized and explicit.

## Dependency Injection

- Prefer constructor injection everywhere.
- Do not use field injection.
- Depend on abstractions or clear service boundaries where it improves maintainability.
- Keep dependencies explicit and minimal.
- If a class needs too many dependencies, treat it as a design smell and simplify the class.
- spring beans should be injected via constructor injection, and avoid using `@Autowired` on fields or setters. Instead, use constructor parameters to declare dependencies clearly and allow for easier testing and maintenance.

## Java And Spring Boot Guidelines

- Prefer immutable fields and `final` where practical.
- Use records for simple DTO-style data carriers when they fit the existing code style.
- Keep transaction boundaries explicit and usually inside the service layer.
- Preserve ACID-related behavior when changing persistence code; do not scatter write logic across layers.
- Validate inputs at the application boundary.
- Handle exceptions deliberately. Do not swallow errors silently.
- Avoid broad `catch (Exception)` unless there is a clear boundary-level reason.
- Keep entities, DTOs, services, repositories, and controllers in clearly separated roles.
- Favor Spring Boot conventions over custom framework-like abstractions.
- For new features, follow the existing patterns for API design, service structure, and data handling unless the task explicitly requires a new approach.
- when modifying existing backend code, maintain the existing style and structure unless the task explicitly requires a change, and ensure that any new code integrates smoothly with the existing architecture.
- when handling data persistence, follow the existing patterns for repositories and service layer interactions, and ensure that transaction management is consistent with the existing codebase.
- when implementing new features or modifying existing ones, consider the impact on security and ensure that any necessary authentication and authorization checks are in place, following the existing security patterns in the codebase.

## Frontend Guidelines

- Keep React components focused and composable.
- Separate presentation, routing, and data-fetching concerns.
- Do not put large business logic blocks inside JSX.
- Reuse components when repetition is real, not speculative.
- Use MUI components, theming, and layout primitives as the default frontend foundation.
- Prefer a shared MUI theme and design tokens over ad hoc inline styling.
- Do not mix multiple UI component libraries unless the task explicitly requires it.
- Keep styling consistent with MUI best practices and the existing theme structure.
- Follow the existing project structure and avoid introducing a second UI architecture.
- https://mui.com/material-ui/all-components/ mui components documentation for reference.
- always prefer MUI components and theming over custom CSS or inline styles when the task involves UI changes.
- always use compact, focused React components that follow the existing project structure and conventions.
- prefer functional components and hooks over class components, unless the existing code style strongly favors classes in that area.
- for state management, prefer local component state and React Context for shared state, rather than introducing a new state management library unless the task explicitly requires it.
- keep side effects and data fetching logic in custom hooks or dedicated service modules, rather than directly in component render code.
- follow the existing patterns for API calls and data handling in the frontend, and do not introduce new patterns unless the task explicitly requires it.
- ensure that any new UI elements are responsive and accessible, following MUI best practices and the existing design system.
- when modifying existing UI components, maintain the existing look and feel unless the task explicitly requires a redesign.
- for long tasks use webworkers or backend processing to keep the UI responsive, rather than blocking the main thread with heavy computations.
- when in doubt about a UI change, prefer a simpler, more maintainable solution that fits the existing design over a complex solution that may be more visually appealing but harder to maintain.
- when making changes to the frontend, consider the impact on the user experience and try to maintain a consistent and intuitive interface throughout the application.

## Dependency And Version Policy

- Prefer current stable package versions that are compatible with the existing stack.
- When adding or upgrading dependencies, verify peer dependency and build compatibility first.
- Prefer well-maintained libraries over custom utility code when the dependency is justified.
- Do not add duplicate libraries for capabilities already covered by Spring Boot, React, or MUI.
- Avoid legacy or deprecated APIs when a current stable alternative exists.
- For Java, prefer using the latest LTS version (see build.gradle or pom.xml) unless the task explicitly requires a different version.
- For Spring Boot, prefer using the latest stable release (see build.gradle or pom.xml) unless the task explicitly requires a different version.
- For React, prefer using the latest stable release (see package.json) unless the task explicitly requires a different version.
- For MUI, prefer using the latest stable release (see package.json) unless the task explicitly requires a different version.

## Change Scope

- Make the smallest change that fully solves the task.
- Preserve existing public APIs, file structure, and conventions unless the task requires a change.
- Do not introduce new libraries unless they are clearly justified.
- Do not rewrite working code just to match personal preference.
- Update configuration and documentation when behavior changes.
- For UI changes, maintain the existing look and feel unless the task explicitly requires a redesign.
- For backend changes, keep controllers thin and put business logic in service classes, following the existing patterns.
- For any change, preserve existing public APIs and file structure unless the task explicitly requires a change.
- Do not add tests unless the user explicitly asks for them, but mention when a change would.

## Code Review Expectations

- Look for root-cause fixes, not superficial patches.
- Prefer explicitness over hidden behavior.
- During review, call out duplication when removing it would materially improve maintainability.
- Call out risky assumptions, missing configuration, hidden coupling, and unclear ownership.

## Testing Policy For This Repository

- Do not write unit tests, integration tests, or end-to-end tests unless the user explicitly asks for them.
- Do not proactively add or modify test files.
- If a change would normally justify tests, mention that briefly in the final response, but do not create them.

## Preferred Working Style

- Read the nearby code before editing.
- Match the repository's existing coding style.
- Keep diffs focused and reviewable.
- Favor maintainable solutions over premature optimization.