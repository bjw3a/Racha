# Racha — Spanish Arcade

Seven short, replayable Spanish games for high-school Spanish 1 and Spanish 2.
No accounts, backend, API keys, external fonts, CDNs, or build step.

## Publish on GitHub Pages — follow these steps

1. Download **Racha-Spanish-Arcade.zip** and **unzip/extract it** on your computer.
2. Create or open the GitHub repository you want to use. A public repository is the simplest option for free GitHub Pages.
3. Click **Add file → Upload files**. Open the extracted folder on your computer. Select **the contents inside it**: `index.html`, `styles.css`, `favicon.svg`, `js`, and the other included files. Drag those selected contents into GitHub. **Do not upload the ZIP. Do not drag the enclosing Racha-Spanish-Arcade folder.**
4. Click **Commit changes**. On the repository's main Code page, verify that **index.html is visible immediately**, beside `styles.css` and the `js` folder. You should not need to open a folder to find index.html.
5. Open **Settings → Pages**.
6. Under Source, choose **Deploy from a branch**.
7. Choose branch **main** (or the branch you uploaded to).
8. Choose **/(root)** for the folder.
9. Click **Save**. Allow GitHub a few minutes to publish. Check the repository's Actions tab if the deployment is still pending or failed.
10. Return to **Settings → Pages** and use the **Visit site** link shown there. Use that exact published address for Schoology.

A project address commonly looks like `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
Do not use the github.com repository address as the student link.

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
  engine.js         Game rules and score calculations
  storage.js        Validated local progress and achievements
README.md           This guide
TESTING.md          Verification results and limitations
tests/              Optional developer tests (not used by the app)
```

## How students play

Choose Spanish 1 or Spanish 2, choose a topic, then click a game card.
Quick Play is the main entry point. Multiple-choice questions support number keys 1–4;
typing supports Enter and optional Spanish character buttons. Every answer gives
immediate feedback; wrong answers show the correct answer and a brief explanation.
Readings stay available while answering. Story Challenge uses a course-level mix
rather than the topic dropdown; this is stated in the game instructions.

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
**Records:** Separate records for each course + topic + mode. Stories use randomized
course-level readings and share one story record per course. Best streak
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

Spanish 1 covers greetings, 0–100, days, months, colors, digital time, subjects,
pronouns, ser, adjective agreement, and me gusta + infinitives. Spanish 2 covers
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

## Local preview (optional)

Opening index.html by double-clicking can block JavaScript modules. Hosting on
GitHub Pages needs no installation. For developer preview only, run
`python3 -m http.server 8000` in this folder and visit `http://localhost:8000/`.
The live page makes no gameplay requests after its own files have loaded. An
initial page load or refresh still needs access to the host; this version does not
include a service worker or promise offline reloads.
