# Verification — Racha 2.0, Phase 1

## Automated checks completed

The original core and DOM suites passed on the supplied ZIP before implementation.
The updated suite passes on Node 24:

- 4,400 generated questions across all course topics, including family,
  introductions, and weather; valid prompts, accepted answers, and exactly one
  correct multiple-choice option.
- Existing scoring, lives, streaks, speed, normalization, achievements, records,
  malformed data, and blocked browser storage checks.
- 3,200 curriculum questions and scoped readings across all 12 units and every
  topic; review routing verified for each member topic; five grounded reading
  questions per story; no cross-course selections accepted.
- Matching banks return six distinct Spanish tiles and English meanings for all
  topics and reviews. Duplicate meanings are filtered before sampling.
- 2,000 family question samples cover all 24 vocabulary terms. Article-free
  Spanish answers are accepted. Family review matching stays in the family bank.
- DOM integration completes every original game mode, including timer expiry,
  typing, answer locks, replay, 70/100 and 100/100 scores, 86% matching accuracy,
  sound/theme toggles, XP, and achievements.
- New DOM integration traverses all 32 topic/unit-review selections across both
  courses, launches Quick Play and matching, and completes every scoped story.
  It verifies all seven game cards, course reset, retained selection on return,
  all-course review, family Quick Play completion, and retained legacy records.
- All local HTML assets and JavaScript imports resolve. Application assets use
  relative paths, including under a GitHub Pages-style subdirectory.
- `js/storage.js` is byte-for-byte unchanged. The `racha-progress-v1` key, existing
  topic IDs, scoring logic, seven mode IDs, and entry-point paths are retained.
- No production packages, external requests, databases, accounts, or build tools
  were added. npm packages are used only by developer tests.

## Re-run

From the project directory:

```sh
node tests/check.mjs
node tests/curriculum.mjs
npm ci --prefix tests
npm test --prefix tests
```

The test dependency lockfile is included. Do not upload `tests/node_modules` to
GitHub. Tests do not load in the student application.

## Verification limits

DOM tests use jsdom; they do not render CSS. A real Chromium check was attempted,
but Chromium was unavailable and its download timed out. Responsive CSS was
reviewed, but desktop/mobile screenshots, physical Dell/phone tests, real audio
playback, and live GitHub Pages testing were not completed.

No GitHub repository or live deployment was modified. Upload the extracted files
to the existing publishing location to keep the same URL.

## First live smoke test

1. On a Dell laptop and phone, check that course, unit, topic, and game buttons fit.
2. Choose Spanish 1 → Family → Family vocabulary. Complete Quick Play, matching,
   and Story Challenge. Confirm that all three use family content.
3. Try Numbers, Dates, and Time → Mixed review; then Spanish 2 → Regular -IR Verbs.
4. Reload the same URL. Confirm old XP, achievements, and personal records remain.
5. Check keyboard Tab/Enter, light/dark mode, sound, and leaving an unfinished round.
6. Inspect the console for errors. Do not clear site data while checking progress.
