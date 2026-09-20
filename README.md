# Racha — Spanish Arcade

Seven short, replayable Spanish games for high-school Spanish 1 and Spanish 2.
No accounts, backend, API keys, external fonts, CDNs, or build step.

## Update your existing GitHub Pages app

This is Racha 2.0 Phase 1, an update to the existing app. No build step is needed.

1. Extract the updated ZIP.
2. Open the **existing Racha repository and the same publishing branch/folder**.
3. Replace the matching files with the extracted contents. Include both new modules:
   `js/curriculum.js` and `js/readings.js`. Keep `index.html` in its existing location.
4. Commit the updated files. Keep the existing repository name, Pages settings,
   custom domain (if any), and student URL. Do not create a new repository.
5. After the existing deployment finishes, reload that same URL and check a family
   round and a Spanish 2 unit. If old content appears, refresh the browser cache.
   **Do not clear site data/localStorage**: that would erase saved student progress.

Upload the extracted files, not the ZIP or an extra enclosing folder. Tests and
Markdown documentation are optional for hosting; the app needs `index.html`,
`styles.css`, `favicon.svg`, and all files in `js/`. Do not upload `node_modules`.

No live repository or deployment was changed while preparing this archive.

### If you see 404

- Confirm that you are visiting the Pages address shown in Settings → Pages.
- Confirm `index.html` is lowercase and is at the top level on the selected branch.
- Confirm Pages is set to your upload branch and **/(root)**.
- If everything is inside one extra folder, upload the contents of that folder at the top level.
- Wait until GitHub reports a successful Pages deployment, then refresh.
- There is no `dist` folder, redirect, install command, or build command to configure.

## Files

```
index.html          Actual app entry point
styles.css          Responsive dark/light interface
favicon.svg         Original Racha wordmark icon
js/
  app.js            Screens, input, timers, matching, replay, sound
  data.js           Vocabulary, grammar, numbers, time, stories, normalization
  curriculum.js     Course/unit definitions and selection validation
  readings.js       Topic-specific passages and comprehension questions
  engine.js         Game rules and score calculations
  storage.js        Validated local progress and achievements
README.md           This guide
TESTING.md          Verification results and limitations
tests/              Optional developer tests (not used by the app)
```

## How students play

Choose Spanish 1 or Spanish 2 → choose a unit → choose a topic or Mixed review → click a game card. An all-course review is also available from the unit list.
Quick Play is the main entry point. Multiple-choice questions support number keys 1–4;
typing supports Enter and optional Spanish character buttons. Every answer gives
immediate feedback; wrong answers show the correct answer and a brief explanation.
Readings stay available while answering. Story Challenge follows the selected topic.
Unit reviews combine two short passages when multiple topics are available;
single-topic units use that topic’s passage. All-course review retains the original
randomized course story. All seven modes are available for every selection.

The first questions offer choices. As students build streaks, typing becomes more
common. After a miss, the next question offers choices again. Timed modes always
use multiple choice. Match-Up has six independently shuffled pairs.

## Scores, XP, and records

| Mode | End condition | Score / record |
| --- | --- | --- |
| Quick Play | 10 answers | 10 points per correct answer, out of 100 |
| Streak Mode | First mistake or 30 answers | Longest consecutive correct streak |
| 60-Second Challenge | 60 real seconds | 100 arcade points per correct answer + 0–50 speed bonus |
| Three Lives | 3 mistakes or 30 answers | 100 arcade points per correct answer |
| Match-Up | All 6 pairs matched | Accuracy = 6 ÷ total pair attempts × 100; record = fastest completion time |
| Speed Round | 10 answers, up to 8 seconds each | 7 + 3 × remaining seconds ÷ 8 per correct answer; rounded final score out of 100 |
| Story Challenge | 5 comprehension answers | 20 points per correct answer, out of 100 |

Speed bonuses stop growing after the maximum. Wrong answers earn zero score.
For Speed Round, a timeout counts as a wrong answer. Its question timer pauses
while feedback is visible. The 60-second clock continues through feedback and
ends immediately at expiry; leaving the tab does not pause its deadline. Browser
throttling can delay display updates in a background tab, but late answers are
rejected using the actual deadline.

**XP:** 10 per correct answer; another 10 at every fifth consecutive correct answer;
20 for finishing; 25 for a new personal best (including setting your first record).
XP is banked when a round finishes. Leaving an unfinished round does not save it.
**Levels:** Level 1 begins at 0 XP; each additional 250 XP adds a level.
**Records:** Separate records for each course + selection + mode. Existing topic IDs
and the `racha-progress-v1` storage key are unchanged. New unit reviews use
`unit:s1-u1`-style IDs. Topic and unit stories have their own records; the original
`mixed:story` records remain available through all-course review. Best streak
and cumulative XP also appear on the home screen. Home best score covers Quick
Play, Speed Round, and Story Challenge only, so it is always out of 100.
**Achievements:** First finish, streak of 5, perfect Quick Play/story, 10 correct in
a 60-second challenge, 10 completed games, and 100 total correct answers.

## Progress and privacy

Progress is saved only in this browser's localStorage under `racha-progress-v1`.
Different devices, browser profiles, or site origins do not share progress. Clearing
site data clears progress. Students sharing a browser profile also share its progress.
There is no teacher tracking, gradebook, login, student name collection, or remote
analytics. Blocked localStorage does not prevent playing; a result-screen message
explains when saving fails. Malformed saved values are discarded safely.

Sound starts off; sound and theme preferences persist. Sound uses the browser's
built-in audio synthesizer and has no external audio files. Visual feedback never
requires sound. Reduced-motion settings are respected.

## Content and accepted answers

Spanish 1 covers greetings, introductions, 0–100, days, months, colors, weather,
digital time, subjects, family, pronouns, ser, adjective agreement, and me gusta + infinitives.
Family includes 24 immediate, extended, and stepfamily terms. Spanish typed family
answers accept the noun with or without its article; gender distinctions are explicit. Spanish 2 covers
ser, agreement, and regular -AR/-ER/-IR present tense with context and readings.
There are no vosotros questions. Times use hours 1–12 and five-minute increments;
“menos” is never required. Numeric minute phrases and cuarto/media are accepted.
Capitalization, ordinary punctuation, whitespace, and missing vowel accents are
normalized. **ñ is not n**. Common vocabulary variants are included, but answers
are deliberately short and bounded; this is not a free-form translation grader.

To add vocabulary, edit the `vocab` lists in `js/data.js`. Each row contains Spanish,
English, and optional additional English answers separated by `~`; rows use `|`.
To add a regular verb, also add its natural sentence ending in `contexts`.
Generators and readings are separated from screen code for easier expansion.
Unit definitions live in `js/curriculum.js`; topic passages live in `js/readings.js`.
When adding a topic, supply question generation, at least six unambiguous matching
pairs, and a passage with five questions before adding it to a playable unit.

## Local preview (optional)

Opening index.html by double-clicking can block JavaScript modules. Hosting on
GitHub Pages needs no installation. For developer preview only, run
`python3 -m http.server 8000` in this folder and visit `http://localhost:8000/`.
The live page makes no gameplay requests after its own files have loaded. An
initial page load or refresh still needs access to the host; this version does not
include a service worker or promise offline reloads.

## Curriculum

| Course | Unit | Topics |
| --- | --- | --- |
| Spanish 1 | 1. Greetings and Introductions | Greetings; introductions |
| Spanish 1 | 2. Numbers, Dates, and Time | Numbers 0–100; days; months; digital time |
| Spanish 1 | 3. Colors, Weather, and School | Colors; weather; school subjects |
| Spanish 1 | 4. Family | Family vocabulary |
| Spanish 1 | 5. Subject Pronouns and SER | Subject pronouns; ser |
| Spanish 1 | 6. Adjectives and Descriptions | Adjective agreement |
| Spanish 1 | 7. Me gusta and Personal Preferences | Me gusta + infinitives |
| Spanish 2 | 1. SER and Adjective Review | Ser; adjective agreement |
| Spanish 2 | 2. Regular -AR Verbs | -AR vocabulary and conjugations |
| Spanish 2 | 3. Regular -ER Verbs | -ER vocabulary and conjugations |
| Spanish 2 | 4. Regular -IR Verbs | -IR vocabulary and conjugations |
| Spanish 2 | 5. Mixed Present-Tense Review | Mixed -AR / -ER / -IR |

Every listed unit is playable and includes Mixed review. In single-topic units,
Mixed review practices that same topic. Phase 1 reuses the existing grammar scope;
this is curriculum organization, not an exhaustive full-year textbook.
