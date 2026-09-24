# Phase 3 — Guided Learning & Mastery Progression

## What changed

- `js/app.js`: replaces the seven-choice menu with a dedicated next-activity screen, optional level map, completed-level replay, prominent mastery results and direct NEXT LEVEL / TRY AGAIN controls. Shuffles Story Challenge question order. Tracks first attempts for matching and pauses the minute clock during answer feedback. Keeps arcade scores, records, review feedback, themes and sound.
- `js/progression.js` (new): ordered seven-level path, independent course/topic keys, minimum assessment sizes, exact 80% pass comparison, best mastery and permanent completion flags.
- `js/engine.js`: Streak Mode now assesses at least 10 questions before a mistake can end it. Updates instructions to explain each game's mastery rules. Arcade scoring formulas remain intact.
- `js/storage.js`: compatible extension of the existing localStorage format; saves mastery and per-level XP reward high-water marks. Makes settling the same round idempotent.
- `styles.css`: arcade-themed path, compact map, mastery results, large actions and responsive phone layouts.
- `README.md`, `CHANGELOG.md`, `MODIFIED_FILES.md`, `TESTING.md`: updated deployment and testing documentation.
- `tests/check.mjs`, `tests/dom.mjs`, `tests/package.json`, `tests/package-lock.json`: updated regression tests and browser-test dependencies. `tests/progression.mjs` and `tests/browser.mjs` are new.

`index.html`, `favicon.svg`, `js/data.js`, `js/curriculum.js`, and `js/readings.js` are unchanged from top-level Phase 2. The original curriculum and all readings are preserved. The obsolete nested `Racha-2.0-Phase-1/` snapshot is omitted from the deliverable; it is not part of the deployed app.

## Mastery rules

The pass decision uses **correct × 5 ≥ total × 4**, never rounded arcade scores. Percentages display to at most one decimal, truncated so a score below 80% cannot visually round up to 80%. A 0-answer round shows 0% and cannot pass.

| Level | Game | Assessed content and passing rule |
| --- | --- | --- |
| 1 | Match-Up | Six unique pairs. Each Spanish pair's first attempted match is one scored item. At least 5/6 first tries must be correct (83.3%). Later corrections finish the board but cannot change its mastery numerator. Arcade time and attempt accuracy remain separate. |
| 2 | Quick Play | 10 questions, at least 8 correct. |
| 3 | Speed Round | 10 questions, at least 8 correct. Each question still allows 8 seconds; a timeout is incorrect. Speed-based arcade points do not affect mastery. |
| 4 | Three Lives | Retains three hearts and a maximum of 30 questions. Must answer at least 10 questions and get at least 80% of all submitted answers correct. Losing all hearts before 10 answers fails the minimum. 12/15 passes; 8/11 does not. |
| 5 | 60-Second Challenge | 60 seconds of active answering; pauses during feedback so students can read explanations. At least 10 submitted answers and 80% correct required. A 1/1 round shows 100% but does not pass. Expiry does not score an unanswered open question. |
| 6 | Streak Mode | First 10 questions continue through mistakes; mistakes still reset the streak. From question 10 onward, a mistake ends the round. Maximum 30 questions. At least 80% correct across the whole round. 8/10 passes if question 10 ends the round. |
| 7 | Story Challenge | Existing topic-scoped passage(s), 5 comprehension questions in shuffled order, at least 4 correct. |

The requested order is retained: matching prepares vocabulary, quick/speed rounds practice recall, lives/timed/streak modes extend practice, and the reading provides final application. All topics and reviews remain unlocked; only games within a path are sequential.

## Retrying and XP

Questions, answer options and matching tiles use the existing randomizers. Story question order is also shuffled. Small topic banks may repeat content; no unrelated vocabulary was added. Topic-specific stories have a finite five-question bank, so retry variation comes from question/answer order rather than new passages.

All previously mastered levels remain replayable. Failed replays preserve mastery and later unlocks. Best mastery tracks rounds meeting the minimum sample; a short 1/1 timed round cannot overwrite a meaningful best with 100%.

Existing XP totals are preserved. Per-answer XP (10), each fifth-in-a-row bonus (10), completion bonus (20) and new-record bonus (25) still determine round reward potential. Each topic/game pays only the increase over its highest previously rewarded potential; replaying identical rounds cannot generate unlimited XP. Results show XP actually added. Arcade records and achievements continue to update independently.

## Saving

Uses the existing `racha-progress-v1` localStorage key. Adds `mastery[course:topic][mode] = {completed,best}` and `xpBests[course:topic:mode]`. All old fields are retained. Unit IDs and topic IDs stay stable. Unlocked level and topic completion are derived from completion flags, avoiding inconsistent duplicate counters. New mastery starts at level 1 even for an experienced player; old arcade records cannot establish 80% accuracy.

See TESTING.md for exact checks and remaining device/deployment limitations.
