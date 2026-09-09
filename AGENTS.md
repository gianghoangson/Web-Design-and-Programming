# Repository Guidelines

## Project Structure & Module Organization

The current working site is a small static exercise at the repository root:

- `index.html` is the primary page.
- `week2.html` contains the week-two exercise.
- `index.css` contains page styles.
- `README.md` is the project note.
- `trading-platform-codex-specs/codex-specs/` contains the product and implementation specifications. Read `CODEX.md` before changing platform architecture.

There are no source, test, or asset subdirectories yet. If the trading platform is implemented, follow the spec’s required `frontend/` and `backend/` split and keep shared documentation under `docs/`.

## Build, Test, and Development Commands

No build system or package manifest is configured currently. For the existing static pages, open `index.html` or `week2.html` directly in a browser, or serve the repository with a local static server, for example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`. Before adding new tooling, check the locked stack in `trading-platform-codex-specs/codex-specs/CODEX.md`.

## Coding Style & Naming Conventions

Use two-space indentation for HTML, CSS, and future TypeScript. Use semantic HTML, lowercase kebab-case filenames, and descriptive class names. Keep styles in CSS files rather than inline attributes. For future React/TypeScript code, follow the spec’s React + Vite stack, use `PascalCase` for components, `camelCase` for functions and variables, and run the project formatter/linter once configured.

## Testing Guidelines

No automated tests are present yet. Manually verify each HTML page in a browser at desktop and mobile widths, including links and images. When platform code is added, use Vitest/React Testing Library for unit and component tests and Playwright for critical end-to-end flows; place tests near their module or in the project’s established test directory.

## Commit & Pull Request Guidelines

Existing commits are short, task-focused descriptions such as `Add README` and `update index and add css`. Keep commits small and describe the user-visible change in imperative language. Pull requests should explain what changed, identify relevant spec files, include testing steps, and attach screenshots for visual changes.

## Security & Configuration Tips

Do not commit credentials, generated secrets, or real brokerage configuration. Keep the P0 simulation account isolated from any future NORMAL account, and never represent mock market data or a broker stub as live trading.
