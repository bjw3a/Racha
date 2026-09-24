import {JSDOM} from 'jsdom';import FakeTimers from '@sinonjs/fake-timers';import fs from 'node:fs';import assert from 'node:assert/strict';
import {generate,isCorrect} from '../js/data.js';import {readings} from '../js/readings.js';import {units,reviewId} from '../js/curriculum.js';import {sequence} from '../js/progression.js';
const dom=new JSDOM(fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'),{url:'http://example.test/racha/'}),w=dom.window;
for(const k of ['document','localStorage','window'])globalThis[k]=k==='window'?w:w[k];globalThis.confirm=()=>true;w.scrollTo=()=>{};
const clock=FakeTimers.install({now:1000000}),$=s=>document.querySelector(s),click=s=>{assert($(s),'Missing '+s);$(s).click();};
const saved=()=>JSON.parse(localStorage.getItem('racha-progress-v1'));
localStorage.setItem('racha-progress-v1',JSON.stringify({xp:500,bestStreak:9,correct:25,games:3,bests:{'1:days:quick':90,'2:mixed:story':100},achievements:['first']}));
await import('../js/app.js');
function choose(t,c=1){if($('#change-topic'))click('#change-topic');click(`[data-course="${c}"]`);click(`[data-unit="${units[c].find(u=>u.topics.includes(t)).id}"]`);click(`[data-topic="${t}"]`);}
function solve(ok=true,t='days',c=1){const prompt=$('#prompt').textContent;let q;for(let i=0;i<20000;i++){q=generate(c,t);if(q.prompt===prompt)break;}assert.equal(q.prompt,prompt);respond(q,ok);}
function respond(q,ok=true){if($('#typed')){$('#typed').value=ok?q.answers[0]:'wrong';$('#answer-form').dispatchEvent(new w.Event('submit',{cancelable:true}));}else{const b=[...document.querySelectorAll('.choice')].find(b=>isCorrect(b.lastElementChild.textContent,q)===ok);assert(b);b.click();}assert($('#next'));}
function match(wrong=0){const es=[...document.querySelectorAll('[data-side="es"]')];for(let i=0;i<wrong;i++){es[i].click();[...document.querySelectorAll('[data-side="en"]')].find(b=>b.dataset.pair!==es[i].dataset.pair).click();}for(const b of es){b.click();click(`[data-side="en"][data-pair="${b.dataset.pair}"]`);}assert($('.result'));}
choose('days');assert.equal($('#play-level').dataset.mode,'match');assert.equal(document.querySelectorAll('.level-map button:disabled').length,6);
click('#play-level');match(2);assert($('.mastery-result').textContent.includes('66.6%'));assert(!$('#next-level'));assert(!saved().mastery['1:days'].match.completed);
click('#again');match(1);assert($('.mastery-result').textContent.includes('83.3%'));assert($('#next-level'));assert(saved().mastery['1:days'].match.completed);
click('#next-level');for(let i=0;i<10;i++){solve(i<7);click('#next');}assert($('.mastery-result').textContent.includes('70%'));assert(!$('#next-level'));
click('#again');for(let i=0;i<10;i++){solve(i<8);click('#next');}assert($('.mastery-result').textContent.includes('80%'));assert($('#next-level'));assert.equal(saved().bests['1:days:quick'],90);
click('#next-level');for(let i=0;i<10;i++){if(i<8){clock.tick(7100);solve();}else{clock.tick(8100);assert($('#feedback').textContent.includes('Time’s up'));}click('#next');}
assert($('.mastery-result').textContent.includes('80%'));assert(Number($('.result-score').textContent.split(' /')[0])<80);assert($('#next-level')); // speed score isn't mastery
click('#next-level');for(let i=0;i<3;i++){solve(false);click('#next');}assert(!$('#next-level'));assert($('.mastery-result').textContent.includes('at least 10'));
click('#again');for(let i=0;i<15;i++){solve(i<12);click('#next');}assert($('.mastery-result').textContent.includes('80%'));click('#next-level');
solve();clock.tick(70000);assert($('#next'));assert(!$('.result')); // feedback doesn't consume the clock
click('#next');clock.tick(60001);assert($('.mastery-result').textContent.includes('100%'));assert($('.mastery-result').textContent.includes('at least 10'));assert(!$('#next-level'));
click('#again');for(let i=0;i<10;i++){solve(i<8);click('#next');}clock.tick(60001);assert($('.mastery-result').textContent.includes('80%'));click('#next-level');
for(let i=0;i<10;i++){solve(i!==1&&i!==9);if(i===1)assert.equal($('#next').textContent,'Continue →');click('#next');}assert($('.mastery-result').textContent.includes('80%'));click('#next-level');
for(let i=0;i<5;i++){const prompt=$('#prompt').textContent;const row=readings.days.questions.find(r=>r[0]===prompt);assert(row);respond({answers:[row[1]]},i<4);click('#next');}assert($('.mastery-result').textContent.includes('80%'));assert($('#games').textContent.includes('TOPIC COMPLETE'));click('#games');assert($('.path-shell').textContent.includes('7 / 7'));
click('.level-map summary');click('[data-mode="quick"]');for(let i=0;i<10;i++){solve(false);click('#next');}assert($('.mastery-result').textContent.includes('Previously earned mastery'));click('#games');assert($('.path-shell').textContent.includes('7 / 7'));
const xp=saved().xp;assert(xp>=500);assert(saved().achievements.includes('first'));assert.equal(saved().bests['2:mixed:story'],100);
choose('months');assert.equal($('#play-level').dataset.mode,'match');choose('ser',2);assert.equal($('#play-level').dataset.mode,'match');choose('ser',1);assert.equal($('#play-level').dataset.mode,'match');
// All units, reviews, and topics remain freely selectable; every fresh path begins with Match-Up.
let selections=0;
for(const c of [1,2]){if($('#change-topic'))click('#change-topic');click(`[data-course="${c}"]`);for(const u of units[c]){click(`[data-unit="${u.id}"]`);for(const t of [reviewId(u),...u.topics]){click(`[data-topic="${t}"]`);assert($('#play-level'));assert(!mainText().includes('undefined'));click('[data-mode="match"]');assert.equal(document.querySelectorAll('.tile').length,12);click('#leave');click('#change-topic');selections++;}click('#change-unit');}click('#course-review');assert.equal($('#play-level').dataset.mode,'match');click('#change-topic');}
function mainText(){return $('#main').textContent;}
// Simulate a reload by importing a fresh app module against the same browser storage.
await import('../js/app.js?reload');choose('days');assert($('.path-shell').textContent.includes('7 / 7'));assert.equal(saved().xp,xp);
click('#change-topic');click('#theme');assert(document.body.classList.contains('light'));click('#sound');assert.equal($('#sound').textContent,'Sound on');
clock.uninstall();console.log(`PASS: all seven real game flows, below/exact/above 80%, speed score separation, timer pause and minimum, streak recovery, lives, match first attempts, replay, reload, legacy totals, settings, and ${selections} freely selectable paths.`);
