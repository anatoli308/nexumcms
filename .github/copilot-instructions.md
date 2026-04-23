# NexumCMS Copilot Instructions

Apply these instructions to all changes in this repository.

## Project Context

- Backend: Spring Boot 4, Java 26, Spring MVC, Spring Security, Spring Data JPA, Thymeleaf.
- Frontend: React with webpack under `src/main/react`.
- Frontend UI library: Material UI (MUI).
- Goal: prefer small, maintainable changes that keep backend, frontend, and infrastructure concerns separated.

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

## Dependency And Version Policy

- Prefer current stable package versions that are compatible with the existing stack.
- When adding or upgrading dependencies, verify peer dependency and build compatibility first.
- Prefer well-maintained libraries over custom utility code when the dependency is justified.
- Do not add duplicate libraries for capabilities already covered by Spring Boot, React, or MUI.
- Avoid legacy or deprecated APIs when a current stable alternative exists.

## Change Scope

- Make the smallest change that fully solves the task.
- Preserve existing public APIs, file structure, and conventions unless the task requires a change.
- Do not introduce new libraries unless they are clearly justified.
- Do not rewrite working code just to match personal preference.
- Update configuration and documentation when behavior changes.

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