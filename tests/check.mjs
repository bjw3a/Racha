import assert from 'node:assert/strict';
import {topics,generate,options,isCorrect,normalize,number,matchPairs,story,conjugate,agree} from '../js/data.js';
import {start,answer} from '../js/engine.js';
import {fresh,load,save,settle} from '../js/storage.js';
let count=0;
for(const c of [1,2])for(const topic of Object.keys(topics[c])){for(let i=0;i<200;i++){const q=generate(c,topic);assert(q.prompt&&!q.prompt.includes('undefined'));assert(q.answers.length);assert(isCorrect(q.answers[0],q));const opts=options(q);assert(opts.length>=2);assert.equal(opts.filter(v=>isCorrect(v,q)).length,1);count++;}const pairs=matchPairs(c,topic);assert.equal(pairs.length,6);assert.equal(new Set(pairs.map(p=>p.es)).size,6);assert.equal(new Set(pairs.map(p=>p.en)).size,6);}
assert.equal(normalize('¡Sí, MAÑANA!'),'si mañana');assert.notEqual(normalize('año'),normalize('ano'));assert.equal(number(100),'cien');assert.equal(number(42),'cuarenta y dos');assert.equal(conjugate('vivir',3),'vivimos');assert.equal(agree('trabajador',true,true),'trabajadoras');
for(const c of [1,2])for(let i=0;i<100;i++){const s=story(c);assert.equal(s.questions.length,5);assert(!s.text.includes('undefined'));for(const q of s.questions)assert.equal(options(q).filter(v=>isCorrect(v,q)).length,1);}
let g=start(1,'mixed','quick');for(let i=0;i<10;i++)assert.equal(Boolean(answer(g,i<7)),i===9);assert.equal(g.score,70);assert.equal(g.streak,0);assert.equal(g.bestStreak,7);
g=start(1,'mixed','lives');answer(g,false);assert.equal(g.lives,2);answer(g,false);assert(answer(g,false));
g=start(1,'mixed','streak');answer(g,true);assert(answer(g,false));
g=start(1,'mixed','speed');for(let i=0;i<10;i++)answer(g,true,8);assert.equal(g.score,100);
g=start(1,'mixed','story');for(let i=0;i<5;i++)answer(g,i<4);assert.equal(g.score,80);
let value='bad JSON';globalThis.localStorage={getItem:()=>value,setItem:(_,v)=>value=v};assert.deepEqual(load(),fresh());value='{"xp":-2,"bests":{"a":"bad"},"achievements":null}';assert.deepEqual(load(),fresh());const p=fresh();g=start(1,'mixed','quick');for(let i=0;i<10;i++)answer(g,true);g.completed=true;let r=settle(p,g);assert(r.record&&r.unlocked.includes('perfect'));assert.equal(load().xp,p.xp);assert.equal(load().bests['1:mixed:quick'],100);assert.equal(settle(p,g).record,false);globalThis.localStorage={getItem(){throw Error();},setItem(){throw Error();}};assert.deepEqual(load(),fresh());assert.equal(save(p),false);
console.log(`PASS: ${count} generated questions; all topic match banks; 200 stories; normalization; scoring, lives, streaks; persistence and malformed/blocked storage.`);
