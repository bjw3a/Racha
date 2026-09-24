# Phase 3 validation

Tested September 24, 2026 against the top-level Phase 2 app supplied in the upload.

## Automated checks

`cd tests && npm ci && npm test`

- 4,400 generated-question checks, unique matching banks, answer normalization, 200 generated course-review stories, arcade scoring, preferences and storage failure behavior.
- 3,200 additional curriculum question checks across 12 units and their topics/reviews; scoped readings and correct answer options.
- Seeded Phase 2 expansion coverage, including added family/school/weather vocabulary, verb/pronoun content and course separation.
- New topics expose only Match-Up. Locked later games are rejected by the progression guard.
- Below 80% fails; exactly 80% and above pass. Checks include 8/10, 4/5, 5/6 and just-below-80 display precision.
- A 1/1 minute round displays 100% but fails the minimum; zero answers fail; early loss of three lives fails; long feedback does not consume the minute clock.
- Match-Up counts each Spanish pair only once for mastery even when it takes multiple attempts to finish the board.
- Real UI game sequence completes all seven modes: Match-Up, Quick Play, Speed Round, Three Lives, minute, Streak and Story. Includes a Speed Round with arcade score below 80 but mastery exactly 80.
- Failed replays preserve completed levels and best mastery. Direct NEXT LEVEL works without curriculum reselection.
- Save/load and app reload retain mastery. Different topics/courses remain independent.
- Legacy XP, records, achievements and settings survive compatible loading; old arcade scores do not grant mastery.
- Identical replay rounds cannot repeatedly add XP. Settling one round twice cannot double-credit rewards.
- Every one of 32 topic/unit-review paths plus both course reviews remains selectable. All matching banks load; all original topic/story content passes regression checks.

## Rendered browser checks

`npx playwright install chromium --only-shell && npm run test:browser`

Headless Chromium, viewport sizes **320×568, 390×844, 768×1024, 1366×768**:

- No horizontal overflow in the guided path or question UI.
- PLAY visible without scrolling after selection. Also checks all topic/unit-review names and both course reviews at the narrowest viewport.
- NEXT LEVEL visible without scrolling after completing Match-Up.
- Actual matching tile interaction, results, direct next-game entry, question feedback and leave controls.
- Browser reload preserves the unlock. Switching to another course starts its independent path.
- Dark and light themes. Screenshots inspected for phone and laptop layouts and mastery results.
- Static serving from `/racha/` with relative asset URLs, no browser exceptions or failed asset requests.

## Scope and limitations

These are automated DOM tests and Chromium viewport simulations, not tests on a physical Dell laptop, iPhone or Android device. Safari, Firefox, school-network filters and the live GitHub Pages deployment were not tested. A local static subpath test verifies compatibility; this ZIP has not been published to the user's repository.

Topic-specific readings retain the existing finite five-question banks. Retries shuffle question order and answer locations; they do not introduce new passages. Short vocabulary banks can repeat questions.

Mastery and rewards persist in the same browser profile and origin. Active unfinished rounds are not saved. Blocked/full localStorage produces a warning; clearing site data erases progress. Existing scores/XP are preserved, but new mastery begins at level 1 because old arcade results do not establish accuracy.
