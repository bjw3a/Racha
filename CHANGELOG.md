# Racha 2.0 — Phase 1

## Changed

- Added course → unit → topic or unit mixed review → game navigation.
- Added all seven requested Spanish 1 units and all five Spanish 2 units.
- Kept the existing seven game cards after content selection.
- Added large unit/topic buttons, selected states, keyboard focus handling,
  responsive layouts, and a concise practice summary.
- Retained all-course review as an extra option.
- Made question generation, matching, and Story Challenge follow the chosen scope.
- Added 24 family vocabulary entries, eight introduction phrases, and ten weather
  phrases. All requested units are playable; there are no empty placeholders.
- Added 17 topical passages with five comprehension questions each. Multi-topic
  unit stories combine two passages; single-topic units use their topic passage.
- Kept original randomized course stories available in all-course review.
- Prevented duplicate Spanish or English matching tiles in combined banks.
- Added curriculum and family tests, updated existing DOM tests for navigation,
  and included a test dependency lockfile.
- Updated README and verification notes with same-repository update instructions.

## Preserved

Vanilla JavaScript modules, seven game modes, scoring, XP, achievements, existing
personal records, browser-only progress storage, theme/sound settings, relative
asset URLs, build-free static hosting, and separate Spanish 1 / Spanish 2 courses.
The storage module is unchanged. New unit records use separate selection IDs.

## Files

- New: `js/curriculum.js`, `js/readings.js`, `tests/curriculum.mjs`,
  `tests/package-lock.json`, `CHANGELOG.md`.
- Updated: `js/app.js`, `js/data.js`, `styles.css`, `tests/dom.mjs`,
  `tests/package.json`, `README.md`, `TESTING.md`.
- `js/engine.js`: Story Challenge instruction text only; scoring is unchanged.
- Unchanged: `index.html`, `favicon.svg`, `js/storage.js`, `tests/check.mjs`.

## Limits

The automated suites pass. Physical-device rendering and live deployment still
need a smoke test; browser installation timed out in the test environment.
No live application was published or replaced during this task.
