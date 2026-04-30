# NexumCMS Copilot Instructions

Apply these instructions to all changes in this repository.

## 1. Project Architecture Snapshot

- Backend stack: Spring Boot 4, Java 26, Spring MVC, Spring Security, Spring Data JPA, Thymeleaf.
- Frontend stack: React with webpack under src/main/react.
- UI stack: Material UI (MUI).
- Build pipeline: Gradle builds backend and frontend bundle together.
- Product direction: enterprise CMS with API-first, workflow-driven architecture.

Keep this boundary explicit:

- backend domain/application logic in Java/Spring layers
- frontend UI logic in React/MUI
- no mixing of business rules into controllers, templates, or JSX render code

## 2. Non-Negotiable Engineering Principles

- Clean code over clever code.
- KISS first, DRY where repetition is real, YAGNI always.
- Separation of concerns where it improves clarity and maintainability.
- Avoid cross-concern leakage between layers (business, security, transactions, validation, mapping, logging).
- Preserve ACID and data integrity for persistence changes.
- Smallest change that fully solves the user request.
- Preserve existing public APIs and structure unless change is explicitly required.

## 3. Clean Code Standards

- Use descriptive, domain-meaningful names.
- Keep methods focused on one responsibility.
- Prefer high cohesion and low coupling.
- Prefer guard clauses and early returns over deep nesting.
- Avoid magic numbers and unclear hardcoded values.
- Minimize mutable shared state and hidden side effects.
- Handle errors explicitly; never swallow exceptions.
- Refactor only when it supports the requested change.

### 3.1 SOLID (Where It Adds Value)

- SRP: one reason to change per class/module.
- OCP: extend behavior with clear boundaries, avoid risky rewrites.
- LSP: derived implementations must preserve contract behavior.
- ISP: prefer smaller focused contracts over large catch-all interfaces.
- DIP: depend on abstractions at clear architectural seams.

## 4. Spring Boot Architecture Rules

### 4.1 Layer Responsibilities

- Controllers: HTTP mapping, request parsing, validation trigger, response mapping only.
- Services: business rules, orchestration, transaction ownership.
- Repositories: persistence and query concerns only.
- Entities: persistence model only, not transport contracts.
- DTOs/records: API and boundary contracts.

### 4.1a Package Layout (MANDATORY)

Use a FLAT, technical-layer package layout under `de.anatoli.nexumcms`. Do NOT introduce per-feature subpackages (no `de.anatoli.nexumcms.contenttype.*`, no `de.anatoli.nexumcms.user.*`, etc.). All features share the same top-level technical packages:

- `de.anatoli.nexumcms.controllers` — `@RestController` / `@Controller` classes
- `de.anatoli.nexumcms.services` — `@Service` classes (business logic, transactions)
- `de.anatoli.nexumcms.repositories` — Spring Data repositories
- `de.anatoli.nexumcms.models` — JPA entities and persistence-related enums
- `de.anatoli.nexumcms.api` — request/response DTO records and shared API response types (e.g. `ApiErrorResponse`)
- `de.anatoli.nexumcms.exceptions` — domain exception classes and global `@RestControllerAdvice` handlers
- `de.anatoli.nexumcms.config` — `@Configuration` classes (security, beans, etc.)

Rules:
- One class per feature lives in the layer it belongs to. Example: `ContentTypeController` in `controllers/`, `ContentTypeService` in `services/`, `ContentType` in `models/`.
- Do not create `feature/api`, `feature/domain`, `feature/contract`, `feature/dto` subpackages.
- DTOs are Java `record`s and live in `api/`. Entities live in `models/`.

### 4.1b Naming Rules (MANDATORY)

- Entities must NOT carry an `Entity` suffix. Use `ContentType`, not `ContentTypeEntity`. Use `User`, not `UserEntity`.
- Repositories: `<Entity>Repository` (e.g. `ContentTypeRepository`).
- Services: `<Feature>Service` (e.g. `ContentTypeService`).
- Controllers: `<Feature>Controller` (e.g. `ContentTypeController`).
- Request DTOs: `<Feature><Action>Request` (e.g. `ContentTypeCreateRequest`).
- Response DTOs: `<Feature>Response` / `<Feature>SummaryResponse`.
- Exceptions: `<Feature><Reason>Exception` (e.g. `ContentTypeNotFoundException`).
- Do not prefix private methods with `_`. Use plain camelCase (`normalizeKey`, not `_normalizeKey`).

### 4.1c Lombok (MANDATORY)

Lombok is on the classpath (`compileOnly` + `annotationProcessor` in `build.gradle`). Use it everywhere instead of writing boilerplate by hand.

- Entities (`@Entity` classes):
  - `@Getter @Setter @NoArgsConstructor` always (JPA needs no-args).
  - `@AllArgsConstructor @Builder` when constructor/builder usage is reasonable.
  - Do NOT use `@Data`, `@EqualsAndHashCode`, or `@ToString` on JPA entities (breaks equality and triggers lazy-loading bugs).
- DTOs are `record`s — Lombok not needed.
- Services / Controllers / `@Component` classes:
  - `@RequiredArgsConstructor` for constructor injection of `final` fields. Do NOT write the constructor by hand.
  - `@Slf4j` for logging instead of manual `LoggerFactory.getLogger(...)`.
- Never write manual getters, setters, or trivial constructors when a Lombok annotation can generate them.

### 4.2 Dependency Injection

- Use constructor injection for Spring-managed classes.
- Do not use field injection.
- Keep dependencies explicit and minimal.
- Avoid manual new for Spring collaborators.
- If a class needs many collaborators, treat it as a design smell and simplify.

### 4.3 Transactions, ACID, and Consistency

- Keep transaction boundaries in the service layer.
- Use @Transactional(readOnly = true) for read-only flows where appropriate.
- Model each write use case as a clear atomic business operation.
- Do not scatter related writes across unrelated transaction scopes.
- Avoid long-running remote calls inside write transactions.
- If eventual consistency is used, document it explicitly.

### 4.4 Validation, Error Handling, and Security

- Validate input at system boundaries (DTOs/commands).
- Prefer centralized exception handling (for example @ControllerAdvice).
- Avoid broad catch (Exception) unless at a clear boundary.
- Keep authorization checks explicit and aligned with existing SecurityFilterChain patterns.
- Never hardcode secrets; use environment/config.

### 4.5 Cross-Cutting Concerns (No Cross-Concern Coupling)

- Keep business logic in services, not in filters, security config, mappers, or exception handlers.
- Keep transaction annotations and transactional ownership in service layer methods.
- Keep validation at boundaries and domain invariants in domain/application logic.
- Keep logging structured and contextual at boundaries; avoid noisy log spam.
- Keep object mapping centralized (mapper/helpers), not duplicated across controllers and services.
- Keep security rules centralized and consistent; do not copy ad hoc checks across endpoints.

## 5. React + MUI Rules

### 5.1 MUI-First UI Development

- Use MUI components, theme, and layout primitives by default.
- Prefer theme tokens over ad hoc inline color/spacing values in new code.
- Do not introduce a second UI component library unless explicitly requested.
- Keep look and feel consistent with existing MUI patterns.

### 5.2 Component and State Practices

- Prefer functional components and hooks.
- Keep components small, focused, and composable.
- Separate presentation from data loading and side effects.
- Keep heavy business logic out of JSX.
- Ensure responsive behavior across breakpoints and accessible interactions.

### 5.3 Frontend/Backend Boundary

- Keep API calls and side effects in dedicated hooks/services.
- Do not place backend business rules in React components.
- Keep server template concerns separate from SPA component logic.

### 5.4 Frontend Cross-Cutting Discipline

- Keep UI components presentation-focused; no hidden data orchestration in presentational components.
- Keep request state handling (loading/error/retry) in hooks/services, not repeated per component.
- Keep design tokens and component variants in theme/config, not scattered inline.
- Keep accessibility concerns explicit (labels, keyboard flows, focus behavior).

Reference: https://mui.com/material-ui/all-components/

## 6. Dependency and Version Policy (Latest Stable)

- Prefer latest stable GA versions compatible with the stack.
- No alpha/beta/RC dependencies unless explicitly requested.
- Validate compatibility before upgrades:
  - Spring Boot BOM alignment
  - Java toolchain compatibility
  - React/MUI peer dependencies
  - webpack/node build compatibility
- Favor maintained libraries over custom utility code when justified.
- Do not add duplicate libraries for existing capabilities.

## 7. Always-Best-Practice Defaults

- Prefer official Spring and MUI documentation patterns over ad hoc patterns.
- Prefer framework-native solutions before introducing custom infrastructure.
- Avoid deprecated APIs in new code.
- Keep observability and operability in mind for backend changes (logs/metrics/error context).
- Prefer explicit contracts and predictable behavior over implicit magic.

## 8. Change Scope and Delivery

- Keep diffs focused and reviewable.
- Do not rewrite working code for preference-only reasons.
- Update documentation/config only when behavior changes.
- Do not add tests unless explicitly requested.
- If tests would normally be required, mention this briefly in the final summary.

## 9. Quick Quality Checklist

Before finalizing, verify:

- controller remains thin and delegates to service
- business rules stay in service layer
- transaction boundary and consistency are explicit
- dependencies are injected via constructor
- no cross-concern leakage across layers
- new UI follows MUI theme and responsive patterns
- dependency changes follow latest stable and compatibility rules




## Important Developer Rules
1. **Export only public APIs**: When creating new classes, only export the main class or function used by other modules. Helper functions should remain internal and private.
2. **Private method naming**: Internal private methods should be prefixed with an underscore `_` to indicate they are not part of the public API.
3. **Code consistency**: Follow existing code style and conventions for consistency across the project.
4. **Event-driven architecture**: Prefer EventEmitter-based communication over direct coupling where appropriate.
5. **Dependency Injection**: Use constructor injection for agent dependencies (see SessionContext pattern).
6. **State Machine readiness**: Agents maintain simple state flags (`idle`, `executing`, `completed`) to prepare for future State Machine implementation where needed.
7. **Single Responsibility**: Each agent should have one clear responsibility (Planner, Scheduler, Executor, Critic, etc). Avoid mixing concerns.
8. **MUI components**: For any new UI components, use Material-UI (MUI) and follow the existing design system for consistency.
9. **@/ alias**: Use the `@/` alias for imports from the `src/` directory to maintain clean and consistent import paths. In `jsconfig.json` you configure this alias. In the backend, use relative imports within the `src/` directory.
10. **setTimeout/setInterval**: Avoid using `setTimeout` or `setInterval` for timing or scheduling. Instead, use event-driven approaches or a proper way to handle asynchronous operations. NEVER USE THAT ideally.
11. **Latest MUI**: Always use the latest version of Material-UI (MUI) for all UI components to ensure consistency and access to the latest features and improvements. Never use deprecated attributes or components from older versions of MUI.
12. **NO .md files for documentation**: Don't create any when not told. All documentation should be maintained in Notion. Do not create or update `.md` files in the repository for documentation purposes.
13. **Don't write test files**: For now, we are not writing test files. Focus on implementing the core functionality and architecture. Testing will be added in a later phase.
14. **Don't create usage examples**: Do not create or update usage example files. Focus on the core implementation. Usage examples will be added in a later phase.
15. **No smileys in code**: Avoid using smileys or emojis in code comments or commit messages to maintain a professional tone.
16. **Don't create unnecessary files**: Only create files that are necessary for the implementation of the required features. Avoid creating placeholder or unnecessary files.
17. **No await imports**: Avoid using dynamic `import()` statements with `await`. All imports should be static at the top of the file to ensure clarity and maintainability.
18. **No virtual modules**: Do not create virtual modules or files that do not have a clear purpose in the project structure. All files should have a defined role and be part of the overall architecture.
19. **Always use index in loop keys**: When rendering lists in React, always use the index as the key if there is no unique identifier available. This helps React optimize rendering and maintain performance.


## Clean Code Standards

Follow these fundamental principles for maintainable, scalable code:

### Follow the SOLID Principles
- **Single Responsibility Principle (SRP)**: Each class/function should have one, and only one, reason to change. One responsibility per module.
- **Open/Closed Principle (OCP)**: Software entities should be open for extension, but closed for modification. Use composition and dependency injection.
- **Liskov Substitution Principle (LSP)**: Subtypes must be substitutable for their base types without altering program correctness.
- **Interface Segregation Principle (ISP)**: No client should be forced to depend on methods it does not use. Create focused, specific interfaces.
- **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions. High-level modules should not depend on low-level modules.

### Core Coding Standards
- **Small Functions**: Keep functions short (ideally < 20 lines). One level of abstraction per function.
- **No Side Effects**: Functions should be pure where possible. If side effects are necessary, make them explicit and documented.
- **DRY (Don't Repeat Yourself)**: Eliminate code duplication through abstraction and reuse.
- **Clear Abstractions**: Use meaningful names. Code should read like prose. Avoid clever tricks.
- **Separation of Concerns**: Different concerns should be in different modules. UI ≠ Business Logic ≠ Data Access.
- **YAGNI (You Aren't Gonna Need It)**: Don't implement features until they are necessary.
- **KISS (Keep It Simple, Stupid)**: Simplicity is key. Avoid over-engineering.
- **Meaningful Comments**: Comment why, not what. Code should be self-explanatory; use comments for rationale and context.
- **Consistent Formatting**: Follow established code style (indentation, spacing, naming conventions) for readability.
- **Error Handling**: Handle errors gracefully. Use try/catch where appropriate and provide meaningful error messages.
- **Service abstraction**: Separate external service calls (e.g., LLM providers) behind interfaces or adapters.
- **Control Flow Clarity**: Avoid deeply nested code if possible. Use early returns to reduce complexity.
- **Event-Driven Communication**: Use events for decoupled communication between modules, especially in agent interactions. Always prefer EventEmitter over direct method calls for inter-agent communication.


### Practical Application in EDIFACTS
```js
// ❌ BAD: Multiple responsibilities, side effects, unclear
class Agent {
  async execute(msg, socket) {
    const result = await llm.call(msg);
    socket.emit('result', result);
    db.save(result);
    return result;
  }
}

// ✅ GOOD: Single responsibility, dependency injection, no side effects
class Planner extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
  }
  
  async invoke({ userMessage, provider }) {
    this.emit('agent_planner:started', { goal: userMessage });
    const plan = await this._decompose(userMessage, provider);
    this.emit('agent_planner:completed', plan);
    return plan;
  }
  
  reset() {
    // Clear state
  }
}
```

**Key Takeaways:**
- ✅ Each agent has ONE job (SRP)
- ✅ Events instead of direct coupling (OCP)
- ✅ Dependency Injection via constructor (DIP)
- ✅ Pure functions where possible (no side effects)
- ✅ SessionContext separates lifecycle from logic (Separation of Concerns)
