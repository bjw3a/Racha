import assert from 'node:assert/strict';
import {start,answer} from '../js/engine.js';
import {fresh,load,settle,KEY} from '../js/storage.js';
import {sequence,assess,canPlay,levelState,percentText} from '../js/progression.js';
let stored;globalThis.localStorage={getItem:()=>stored,setItem:(key,value)=>{assert.equal(key,KEY);stored=value;}};
const round=(mode,correct,total=10)=>{const g=start(1,'days',mode);for(let i=0;i<total;i++)answer(g,i<correct);g.completed=true;g.elapsed=12;if(mode==='match'){g.assessedPairs=6;g.firstPairCorrect=correct;}return g;};
for(const [right,total,pass] of [[7,10,false],[8,10,true],[9,10,true],[4,5,true],[3,5,false]]){
 const g=round(total===5?'story':'quick',right,total);assert.equal(assess(g).passed,pass);
}
assert.equal(assess(round('minute',1,1)).percent,100);assert.equal(assess(round('minute',1,1)).passed,false);
assert.equal(assess(round('minute',0,0)).percent,0);
assert.equal(assess(round('lives',0,3)).passed,false);
assert.equal(assess(round('match',4,6)).passed,false);assert.equal(assess(round('match',5,6)).passed,true);
assert.equal(percentText(79.99),'79.9%');
let p=fresh();assert.deepEqual(sequence.filter(m=>canPlay(p,1,'days',m)),['match']);
settle(p,round('quick',10));assert.equal(levelState(p,1,'days').count,0); // cannot skip level
settle(p,round('match',4,6));assert.equal(canPlay(p,1,'days','quick'),false);
settle(p,round('match',5,6));assert(canPlay(p,1,'days','quick'));
settle(p,round('quick',7));assert.equal(canPlay(p,1,'days','speed'),false);
settle(p,round('quick',8));assert(canPlay(p,1,'days','speed'));
p=load();assert.equal(levelState(p,1,'days').count,2);
assert.equal(levelState(p,1,'months').count,0);assert.equal(levelState(p,2,'days').count,0);
const oldBest=p.mastery['1:days'].quick.best,oldXP=p.xp;
settle(p,round('quick',0));assert.equal(p.mastery['1:days'].quick.best,oldBest);assert(canPlay(p,1,'days','speed'));assert.equal(p.xp,oldXP);
for(const mode of ['speed','lives','minute','streak'])settle(p,round(mode,8));
settle(p,round('story',4,5));assert(levelState(p,1,'days').complete);assert.equal(load().mastery['1:days'].story.best,80);
// Legacy totals, achievements, preferences and records survive compatible extension.
stored=JSON.stringify({xp:1234,bestStreak:20,correct:120,games:16,bests:{'1:days:quick':90,'2:mixed:story':100},achievements:['first','ten'],light:true,sound:true});
p=load();assert.equal(p.xp,1234);assert.equal(p.bests['2:mixed:story'],100);assert(p.light&&p.sound);assert.deepEqual(p.achievements,['first','ten']);assert.equal(levelState(p,1,'days').count,0);
const first=settle(p,round('match',6,6));assert(first.xp>0);const xp=p.xp;
for(let i=0;i<20;i++)assert.equal(settle(p,round('match',6,6)).xp,0);
assert.equal(p.xp,xp);assert.equal(p.bests['1:days:quick'],90);assert.equal(load().xp,xp);
// Bad progression data must not accidentally unlock later games.
stored=JSON.stringify({mastery:{'1:days':{match:{best:100,completed:false},story:{best:100,completed:true}}}});
assert.equal(levelState(load(),1,'days').count,0);
console.log('PASS: exact mastery boundaries, minimum samples, unlock guards, course/topic isolation, persistence, replay protection, legacy migration and bounded replay XP.');
