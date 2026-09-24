# Phase 3 file manifest

Changed: `js/app.js`, `js/engine.js`, `js/storage.js`, `styles.css`, `README.md`, `CHANGELOG.md`, `MODIFIED_FILES.md`, `TESTING.md`, `tests/check.mjs`, `tests/dom.mjs`, `tests/package.json`, `tests/package-lock.json`.

Added: `js/progression.js`, `tests/progression.mjs`, `tests/browser.mjs`.

Unchanged Phase 2 app files: `index.html`, `favicon.svg`, `js/curriculum.js`, `js/data.js`, `js/readings.js`. Existing `tests/curriculum.mjs` and `tests/expansion.mjs` remain unchanged.

Packaging: include top-level app and test/documentation files only. Exclude the obsolete nested Phase 1 snapshot and development-only `node_modules` folder. There are no external production assets or dependencies.
