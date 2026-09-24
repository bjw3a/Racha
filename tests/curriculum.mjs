import assert from 'node:assert/strict';
import {units,reviewId,contentTopics} from '../js/curriculum.js';
import {topics,vocab,generate,matchPairs,story,options,isCorrect} from '../js/data.js';
import {readings} from '../js/readings.js';
assert.equal(units[1].length,7);assert.equal(units[2].length,5);
assert.equal(new Set(Object.values(units).flat().map(u=>u.id)).size,12);
const realRandom=Math.random;
let questions=0;
for(const c of [1,2]){
 assert.deepEqual(new Set(contentTopics(c,'mixed')),new Set(Object.keys(topics[c]).filter(t=>t!=='mixed')));
 for(const unit of units[c]){
  assert(unit.topics.length);assert.deepEqual(contentTopics(c,reviewId(unit)),unit.topics);
  for(const [i,t] of unit.topics.entries()){
   assert(topics[c][t]);
   // Fixed entropy proves a review routes through each of its topics' generators.
   try{Math.random=()=> (i+.1)/unit.topics.length;assert.deepEqual(generate(c,reviewId(unit)),generate(c,t));}finally{Math.random=realRandom;}
  }
  for(const selection of [reviewId(unit),...unit.topics]){
   const allowed=contentTopics(c,selection).flatMap(t=>t==='verbs'?['ar','er','ir']:[t]);
   for(let i=0;i<100;i++){
    const q=generate(c,selection);assert(q.prompt&&!q.prompt.includes('undefined'));assert.equal(options(q).filter(a=>isCorrect(a,q)).length,1);questions++;
    const pairs=matchPairs(c,selection);assert.equal(pairs.length,6);assert.equal(new Set(pairs.map(p=>p.es)).size,6);assert.equal(new Set(pairs.map(p=>p.en)).size,6);
    const reading=story(c,selection);assert.equal(reading.questions.length,5);
    const used=allowed.filter(t=>reading.text.includes(readings[t].text));assert.equal(used.length,Math.min(2,allowed.length));
    assert.equal(reading.text,reading.text.split('\n\n').filter(text=>used.some(t=>readings[t].text===text)).join('\n\n'));
    for(const question of reading.questions){assert(used.some(t=>readings[t].questions.some(([p,a])=>question.prompt===p&&question.answers[0]===a)));assert.equal(options(question).filter(a=>isCorrect(a,question)).length,1);}
   }
  }
 }
}
assert.throws(()=>contentTopics(2,'family'));assert.throws(()=>contentTopics(1,'unit:s2-u1'));
assert.equal(vocab.family.length,30);
for(const [es,en] of vocab.family)assert(es&&en);
assert.equal(new Set(vocab.family.map(r=>r[0])).size,30);
assert.equal(new Set(vocab.family.map(r=>r[1])).size,30);
assert(vocab.family.some(([es,en])=>es==='los padres'&&en==='parents'));
assert(vocab.family.some(([es,en])=>es==='la prima'&&en==='female cousin'));
const seen=new Set();
for(let i=0;i<2000;i++){
 const q=generate(1,'family');seen.add(q.explanation);
 if(q.lang==='es'){assert(isCorrect(q.answers[0].replace(/^(el|la|los|las) /,''),q));}
 for(const p of matchPairs(1,'unit:s1-u4'))assert(vocab.family.some(([es,en])=>es===p.es&&en===p.en));
}
assert.equal(seen.size,30);
console.log(`PASS: ${questions} curriculum questions; all 12 units and topics; scoped readings; unique matching; 30 family terms and article-free answers; invalid course selections.`);
