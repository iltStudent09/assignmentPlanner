# Assignment Planner Rationale

This app is structured around clear separation of concerns so it can grow from a lightweight planner into a richer academic workflow tool. The component hierarchy starts at `App` with the global `AssignmentProvider`, then routes are defined in `routes.tsx`, each route is wrapped in `Layout`, and each page (`AssignmentsListPage`, `AssignmentDetailPage`, `AddAssignmentPage`) composes smaller reusable components. Assignment-specific UI (`AssignmentCard`, `AssignmentFilters`) is isolated from generic UI (`LoadingState`, `ErrorMessage`) to keep responsibilities clear.

Logic was extracted into dedicated layers to reduce coupling. Data contracts live in `types/`, mock seed data in `data/`, async data access in `services/assignmentService.ts`, and reusable behavior in `hooks/`. This prevents pages from becoming “god components” and makes later API replacement straightforward. Validation was extracted to `utils/assignmentValidation.ts` so form rules are centralized and testable.

State is intentionally split by ownership. Remote-like assignment retrieval is handled in custom hooks (`useAssignments`, `useAssignmentDetail`) with `useEffect` and loading/success/error states. Cross-cutting UI and interaction state (favorites, completion overrides, selected assignment, filters, theme, and newly added assignments) lives in Context. Context was chosen over prop drilling because these values are consumed by multiple distant components (layout, list cards, detail page, filters, form flow). Passing this state through route and page boundaries as props would add noise and fragility.

Routing is organized around assignment workflows: listing, viewing details, and creating items. Fetching is encapsulated in hooks so routing components stay focused on rendering. Together, this structure is a strong foundation for expansion: editing, archival, dashboards, calendar visualization, pagination, richer filtering, persistence, and analytics can be added without restructuring core modules.

## Previous README Template Notes (Incorporated)

Before this project-specific README, the repository used the default React + TypeScript + Vite template guidance. That content included:

- A baseline explanation that the template provides React with Vite HMR and Oxlint rules.
- References to the two official React plugins:
	- `@vitejs/plugin-react` (Oxc-based)
	- `@vitejs/plugin-react-swc` (SWC-based)
- A note that React Compiler is not enabled by default due to development/build performance impact, with guidance to add it via React docs if needed.
- Oxlint expansion guidance for production apps, including enabling type-aware linting (`typeAware: true`) and rules such as:
	- `react/rules-of-hooks`
	- `react/only-export-components`
- A link to Oxlint rule documentation for full lint categories and configuration options.

This historical template context is retained here for reference, while the main README now focuses on this Assignment Planner’s actual setup, scripts, and run instructions.
