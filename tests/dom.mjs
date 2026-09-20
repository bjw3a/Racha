import {JSDOM} from 'jsdom';import FakeTimers from '@sinonjs/fake-timers';import fs from 'node:fs';import assert from 'node:assert/strict';import {generate,isCorrect} from '../js/data.js';
import {units,reviewId} from '../js/curriculum.js';
const dom=new JSDOM(fs.readFileSync(new URL('../index.html', import.meta.url),'utf8'),{url:'http://example.test/spanish-game/'});const w=dom.window;for(const k of ['document','localStorage','window'])globalThis[k]=k==='window'?w:w[k];globalThis.confirm=()=>true;w.scrollTo=()=>{};const clock=FakeTimers.install({now:1000000});const $=s=>document.querySelector(s),click=s=>{assert($(s),'Missing '+s);$(s).click();};localStorage.setItem('racha-progress-v1',JSON.stringify({xp:500,bestStreak:9,correct:25,games:3,bests:{'1:days:quick':80,'2:mixed:story':100},achievements:['first'],light:false,sound:false}));await import('../js/app.js');
assert.equal(document.querySelectorAll('[data-unit]').length,7);assert.equal(document.querySelectorAll('[data-mode]').length,0);
assert.equal(JSON.parse(localStorage.getItem('racha-progress-v1')).xp,500);
function choose(topic,course=1){if(!document.querySelector(`[data-topic="${topic}"]`)){if($('#change-unit'))click('#change-unit');click(`[data-unit="${units[course].find(u=>u.topics.includes(topic)).id}"]`);}click(`[data-topic="${topic}"]`);}
function solve(ok=true,topic='days'){const prompt=$('#prompt').textContent;let q;for(let i=0;i<20000;i++){q=generate(1,topic);if(q.prompt===prompt)break;}assert.equal(q.prompt,prompt);if($('#typed')){$('#typed').value=ok?q.answers[0]:'wrong';$('#answer-form').dispatchEvent(new w.Event('submit',{cancelable:true}));}else{const b=[...document.querySelectorAll('.choice')].find(b=>isCorrect(b.lastElementChild.textContent,q)===ok);assert(b);b.click();}assert($('#next'));}
choose('days');click('[data-mode="quick"]');for(let i=0;i<10;i++){solve(i<7);click('#next');}assert($('.result-score').textContent.includes('70'));assert($('.stats').textContent.includes('70%'));const xp=JSON.parse(localStorage.getItem('racha-progress-v1')).xp;assert(xp>0);click('#again');assert($('#prompt'));click('#leave');choose('days');click('[data-mode="quick"]');for(let i=0;i<10;i++){solve(true);click('#next');}assert($('.result-score').textContent.includes('100'));assert(JSON.parse(localStorage.getItem('racha-progress-v1')).achievements.includes('perfect'));click('#games');
choose('days');click('[data-mode="streak"]');solve(true);click('#next');solve(false);click('#next');assert($('.result-score').textContent.includes('1'));click('#games');
choose('days');click('[data-mode="lives"]');for(let i=0;i<3;i++){solve(false);if(i===0)assert($('#progress').textContent.includes('♥♥♡'));click('#next');}assert($('.result'));click('#games');
click('[data-mode="minute"]');clock.tick(60001);assert($('.result'));click('#games');click('[data-mode="speed"]');for(let i=0;i<10;i++){clock.tick(8100);assert($('#feedback').textContent.includes('Time’s up'));click('#next');}assert($('.result-score').textContent.includes('0'));click('#games');
choose('days');click('[data-mode="match"]');let es=[...document.querySelectorAll('[data-side="es"]')];es[0].click();[...document.querySelectorAll('[data-side="en"]')].find(b=>b.dataset.pair!==es[0].dataset.pair).click();assert($('#match-feedback').textContent.includes('Not quite'));for(const b of es){b.click();click(`[data-side="en"][data-pair="${b.dataset.pair}"]`);}assert($('.stats').textContent.includes('86%'));assert($('.stats').textContent.includes('6 / 7'));click('#games');
click('[data-course="2"]');assert.equal(document.querySelectorAll('[data-unit]').length,5);choose('ir',2);click('[data-mode="story"]');assert($('.reading').textContent.includes('recibe el mensaje'));for(let i=0;i<5;i++){click('.choice');click('#next');}assert($('.result'));click('#games');click('#theme');assert(document.body.classList.contains('light'));click('#sound');assert($('#sound').textContent==='Sound on');
// Answer lock prevents double credit; completed rounds cannot settle twice through the UI.
click('[data-course="1"]');choose('days');click('[data-mode="quick"]');solve(true);const before=$('#score').textContent;document.querySelector('.choice')?.click();assert.equal($('#score').textContent,before);click('#leave');

// Every playable unit and topic leads to the same seven games, with no cross-course leakage.
for(const course of [1,2]){
 click(`[data-course="${course}"]`);
 for(const unit of units[course]){
  click(`[data-unit="${unit.id}"]`);
  assert.equal(document.querySelectorAll('[data-mode]').length,0);
  assert.deepEqual([...document.querySelectorAll('[data-topic]')].map(b=>b.dataset.topic),[reviewId(unit),...unit.topics]);
  for(const selection of [reviewId(unit),...unit.topics]){
   click(`[data-topic="${selection}"]`);
   assert.equal(document.querySelectorAll('[data-mode]').length,7);
   assert.equal(document.querySelector('[aria-pressed="true"][data-topic]').dataset.topic,selection);
   click('[data-mode="quick"]');assert($('#prompt'));assert(!$('.game-top').textContent.includes('undefined'));click('#leave');
   click('[data-mode="match"]');assert.equal(document.querySelectorAll('.tile').length,12);click('#leave');
   click('[data-mode="story"]');assert($('.reading p').textContent.length>50);
   for(let i=0;i<5;i++){click('.choice');click('#next');}
   assert($('.result'));click('#games');
  }
  click('#change-unit');
 }
 click('#course-review');assert.equal(document.querySelectorAll('[data-mode]').length,7);
 click('[data-mode="quick"]');assert($('#prompt'));click('#leave');click('#change-unit');
}
click('[data-course="1"]');choose('family');click('[data-mode="quick"]');
for(let i=0;i<10;i++){solve(true,'family');click('#next');}
let saved=JSON.parse(localStorage.getItem('racha-progress-v1'));
assert.equal(saved.bests['1:family:quick'],100);assert(saved.xp>500);assert.equal(saved.bests['2:mixed:story'],100);assert(saved.achievements.includes('first'));
click('#games');assert(document.querySelector('[data-topic="family"]').getAttribute('aria-pressed')==='true');
click('[data-course="2"]');assert.equal(document.querySelectorAll('[data-mode]').length,0);assert.equal(document.querySelectorAll('[data-topic="family"]').length,0);
console.log('PASS: course → unit → topic/review navigation; all 32 selections launch questions, matching and stories; family Quick Play at 100/100; retained legacy records; course reset and selection retention.');
clock.uninstall();console.log('PASS: DOM integration of all 7 modes; 70/100 and 100/100 Quick Play; replay; typing; immediate feedback; streak reset; 3 lost lives; exact timer expiry; 86% matching; course switch; Spanish 2 stories; XP and achievements saved; theme and sound; answer locking.');
