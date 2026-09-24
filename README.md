# Racha 2.0 — Phase 3

A guided Spanish-learning arcade, built on the uploaded **top-level Phase 2** app. All seven games, both courses, the Phase 2 vocabulary, readings, achievements and arcade records are retained.

## Upload to your existing GitHub Pages repository

1. Extract `Racha-2.0-Phase-3.zip`.
2. Upload the **contents** to the same repository folder that currently contains your working `index.html`. Replace matching files and include the new `js/progression.js` file. Keep the `js` folder together.
3. Commit the changes. Keep your existing GitHub Pages branch/folder settings.
4. Wait for GitHub Pages to finish deploying, then refresh the site. If an old screen remains, use **Ctrl+Shift+R** on the Dell laptop. Do not clear site data; that deletes saved browser progress.

No build step, accounts, API keys, databases or production dependencies. All asset paths are relative, including for a repository subpath. `tests/` and Markdown documentation are optional on the deployed site. The nested Phase 1 archive from the input is deliberately excluded to prevent uploading the wrong app.

## Student flow

Choose any course → unit → topic. The next activity appears immediately with one large PLAY button. The optional level map shows checkmarks, best mastery and locks, and lets students replay completed levels.

**Match-Up → Quick Play → Speed Round → Three Lives → 60-Second Challenge → Streak Mode → Story Challenge.**

Mastery is correct assessed answers divided by assessed questions, independent of points or XP. Passing requires **at least 80%** and the game's minimum sample. Passing opens NEXT LEVEL without returning to the curriculum menu. Failed rounds can be retried without limits. Every topic, unit review and course review has its own path; all curriculum remains freely available.

See **CHANGELOG.md** for exact game rules and **TESTING.md** for verified behavior and limitations.

## Saved progress and XP

The existing `racha-progress-v1` browser storage key is retained. Old XP, achievements, records, totals and preferences load unchanged. Mastery and XP reward tracking are additional fields; old scores do not automatically grant new mastery because they are not reliable accuracy measurements.

Completed levels and their best percentages never decrease on a failed replay. The first uncompleted level and topic completion are derived from those saved records. Returning to a topic in the same browser restores its path. Rounds in progress are not checkpointed.

Round XP still comes from correct answers, streak bonuses, finishing and new records. To prevent repeat farming, only an increase over that topic/game's highest previously rewarded round XP is added to the total. A repeat can earn zero XP while still improving arcade records and counting toward achievements. Existing XP is never removed.

Progress belongs to the browser profile and website origin, not an account. Changing browsers/devices, clearing site data, or using private browsing can lose progress. Different students using one browser profile share its progress. If browser storage is blocked, the result screen warns that progress could not be saved.

## Local testing

Serve this folder with a static HTTP server; opening `index.html` via `file://` does not support its ES module imports consistently.

With Node.js 24 or later:

```sh
cd tests
npm ci
npm test
npx playwright install chromium --only-shell
npm run test:browser
```

Development dependencies are used only by tests. Students do not download or run them.
